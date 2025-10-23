import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Loader2, Circle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export interface AnalysisStep {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed';
  progress: number;
  detail?: string;
}

interface AnalysisProgressProps {
  steps: AnalysisStep[];
  currentStep: number;
  overallProgress: number;
}

export default function AnalysisProgress({ steps, currentStep, overallProgress }: AnalysisProgressProps) {
  const { t } = useTranslation();
  const [dots, setDots] = useState('');

  // 动画效果
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          {t('progress.analyzing')}
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          {t('progress.description')}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">{t('progress.overall')}</span>
            <span className="text-muted-foreground">{Math.round(overallProgress)}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>

        {/* Individual Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-start gap-3 p-3 rounded-lg transition-all ${
                step.status === 'running'
                  ? 'bg-primary/5 border border-primary/20'
                  : step.status === 'completed'
                  ? 'bg-green-50 dark:bg-green-950/20'
                  : 'bg-muted/30'
              }`}
            >
              {/* Icon */}
              <div className="mt-0.5">
                {step.status === 'completed' ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                ) : step.status === 'running' ? (
                  <Loader2 className="h-5 w-5 text-primary animate-spin" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground/40" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`font-medium ${
                    step.status === 'running' ? 'text-primary' : 
                    step.status === 'completed' ? 'text-green-700 dark:text-green-300' : 
                    'text-muted-foreground'
                  }`}>
                    {step.name}
                  </span>
                  {step.status === 'running' && (
                    <span className="text-xs text-muted-foreground">
                      {Math.round(step.progress)}%
                    </span>
                  )}
                </div>

                {/* Step Progress Bar */}
                {step.status === 'running' && (
                  <Progress value={step.progress} className="h-1.5" />
                )}

                {/* Detail */}
                {step.detail && step.status === 'running' && (
                  <p className="text-xs text-muted-foreground">
                    {step.detail}{dots}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Estimated Time */}
        <div className="text-center text-sm text-muted-foreground pt-4 border-t">
          {t('progress.estimatedTime')}
        </div>
      </CardContent>
    </Card>
  );
}

