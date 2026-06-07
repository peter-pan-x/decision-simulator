import { useEffect, useState } from 'react';
import { CheckCircle2, CircleAlert, Server } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type RuntimeStatus = {
  configured: boolean;
  provider: string;
  models: {
    pro: string;
    flash: string;
  };
};

export default function ModelStatus() {
  const [status, setStatus] = useState<RuntimeStatus | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/ai/status')
      .then((response) => response.json())
      .then(setStatus)
      .catch(() => setError(true));
  }, []);

  const configured = Boolean(status?.configured);

  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-semibold">
          <Server className="h-4 w-4 text-primary" />
          Model Runtime
        </div>
        <Badge variant={configured ? 'secondary' : 'outline'} className="gap-1">
          {configured ? <CheckCircle2 className="h-3.5 w-3.5" /> : <CircleAlert className="h-3.5 w-3.5" />}
          {configured ? 'Live' : error ? 'Offline' : 'Key pending'}
        </Badge>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-md bg-muted/50 p-2">
          <div className="text-muted-foreground">Primary</div>
          <div className="mt-1 truncate font-mono">{status?.models.pro || 'deepseek-v4pro'}</div>
        </div>
        <div className="rounded-md bg-muted/50 p-2">
          <div className="text-muted-foreground">Light</div>
          <div className="mt-1 truncate font-mono">{status?.models.flash || 'deepseek-v4flash'}</div>
        </div>
      </div>
      {!configured && !error && (
        <p className="mt-3 text-xs text-muted-foreground">
          Add `DEEPSEEK_API_KEY` on the server to enable live analysis.
        </p>
      )}
    </div>
  );
}
