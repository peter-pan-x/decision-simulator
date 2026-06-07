import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage || i18n.language || "en";

  const languages = [
    { code: "en", name: "EN" },
    { code: "zh", name: "中文" },
  ];

  return (
    <div
      className="inline-flex items-center gap-1 rounded-md border bg-background p-1"
      aria-label="Language switcher"
    >
      <Languages className="ml-1 h-4 w-4 text-muted-foreground" />
      {languages.map(lang => {
        const isActive = currentLanguage.toLowerCase().startsWith(lang.code);
        return (
          <Button
            key={lang.code}
            type="button"
            size="sm"
            variant="ghost"
            aria-pressed={isActive}
            onClick={() => {
              void i18n.changeLanguage(lang.code);
              document.documentElement.lang =
                lang.code === "zh" ? "zh-CN" : "en";
            }}
            className={cn(
              "h-7 px-2 text-xs font-semibold",
              isActive &&
                "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
            )}
          >
            {lang.name}
          </Button>
        );
      })}
    </div>
  );
}
