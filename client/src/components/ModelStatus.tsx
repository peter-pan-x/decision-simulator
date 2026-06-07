import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CheckCircle2, CircleAlert, Server } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type RuntimeStatus = {
  configured: boolean;
  provider: string;
  models: {
    pro: string;
    flash: string;
  };
};

export default function ModelStatus() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<RuntimeStatus | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/ai/status")
      .then(response => response.json())
      .then(setStatus)
      .catch(() => setError(true));
  }, []);

  const configured = Boolean(status?.configured);

  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-semibold">
          <Server className="h-4 w-4 text-primary" />
          {t("modelStatus.title")}
        </div>
        <Badge variant={configured ? "secondary" : "outline"} className="gap-1">
          {configured ? (
            <CheckCircle2 className="h-3.5 w-3.5" />
          ) : (
            <CircleAlert className="h-3.5 w-3.5" />
          )}
          {configured
            ? t("modelStatus.live")
            : error
              ? t("modelStatus.offline")
              : t("modelStatus.keyPending")}
        </Badge>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-md bg-muted/50 p-2">
          <div className="text-muted-foreground">
            {t("modelStatus.primary")}
          </div>
          <div className="mt-1 truncate font-mono">
            {status?.models.pro || "deepseek-v4pro"}
          </div>
        </div>
        <div className="rounded-md bg-muted/50 p-2">
          <div className="text-muted-foreground">{t("modelStatus.light")}</div>
          <div className="mt-1 truncate font-mono">
            {status?.models.flash || "deepseek-v4flash"}
          </div>
        </div>
      </div>
      {!configured && !error && (
        <p className="mt-3 text-xs text-muted-foreground">
          {t("modelStatus.keyHint")}
        </p>
      )}
    </div>
  );
}
