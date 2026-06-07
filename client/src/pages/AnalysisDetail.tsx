import { lazy, Suspense, useMemo } from 'react';
import { Link, useLocation, useRoute } from 'wouter';
import { ArrowLeft, Calendar, FileText, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getAnalysis } from '@/lib/historyStore';

const AnalysisResults = lazy(() => import('@/components/AnalysisResults'));

export default function AnalysisDetail() {
  const [, navigate] = useLocation();
  const [, params] = useRoute('/analysis/:id');
  const item = useMemo(() => (params?.id ? getAnalysis(params.id) : undefined), [params?.id]);

  if (!item) {
    return (
      <div className="container py-16">
        <Card className="mx-auto max-w-xl border-dashed">
          <CardContent className="flex flex-col items-center justify-center p-10 text-center">
            <FileText className="mb-4 h-10 w-10 text-muted-foreground" />
            <h1 className="text-2xl font-bold">Analysis not found</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              This report may have been deleted or created in another browser.
            </p>
            <Button className="mt-6" asChild>
              <Link href="/history">Back to history</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-6 flex flex-col gap-4 rounded-lg border bg-card p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="gap-1">
              <Sparkles className="h-3.5 w-3.5" />
              Saved report
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(item.timestamp).toLocaleString()}
            </Badge>
            <Badge variant="outline">{item.confidence}% confidence</Badge>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">{item.question}</h1>
          <p className="mt-1 text-sm text-muted-foreground">Recommendation: {item.recommendation}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" asChild>
            <Link href="/history" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              History
            </Link>
          </Button>
          <Button onClick={() => navigate('/')}>New analysis</Button>
        </div>
      </div>

      <Suspense fallback={<div className="rounded-lg border bg-card p-8 text-center text-sm text-muted-foreground">Loading saved report...</div>}>
        <AnalysisResults
          results={item.results}
          debateLogs={item.debateLogs}
          advancedAnalysis={item.completeAnalysis}
          onStartNew={() => navigate('/')}
        />
      </Suspense>
    </div>
  );
}
