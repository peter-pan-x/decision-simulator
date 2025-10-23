import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import DecisionInputForm, { DecisionInput } from '@/components/DecisionInput';
import AnalysisResults, { OptionAnalysis } from '@/components/AnalysisResults';
import AnalysisProgress, { AnalysisStep } from '@/components/AnalysisProgress';
import { Brain, Sparkles, TrendingUp, Eye } from 'lucide-react';

export default function Home() {
  const { t } = useTranslation();
  const [showInput, setShowInput] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<OptionAnalysis[] | null>(null);
  const [analysisSteps, setAnalysisSteps] = useState<AnalysisStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);

  const handleAnalyze = async (data: DecisionInput) => {
    setIsAnalyzing(true);
    
    // 初始化分析步骤
    const steps: AnalysisStep[] = [
      { id: '1', name: 'Decision Deconstructor', status: 'pending', progress: 0 },
      { id: '2', name: 'Probability Calculator', status: 'pending', progress: 0 },
      { id: '3', name: 'Timeline Simulator', status: 'pending', progress: 0 },
      { id: '4', name: 'Multi-dimensional Evaluator', status: 'pending', progress: 0 },
      { id: '5', name: 'Risk Analyst', status: 'pending', progress: 0 },
      { id: '6', name: 'Decision Coordinator', status: 'pending', progress: 0 },
    ];
    setAnalysisSteps(steps);
    setCurrentStep(0);
    setOverallProgress(0);
    
    try {
      const { runCompleteAnalysis, convertToLegacyFormat } = await import('@/lib/aiAgents/orchestrator');
      
      // 运行多AI协作分析
      const completeAnalysis = await runCompleteAnalysis(data, (progress) => {
        // 更新进度
        setOverallProgress(progress.progress);
        
        // 根据阶段更新步骤状态
        const stageToStep: { [key: string]: number } = {
          'deconstruction': 0,
          'probability': 1,
          'timeline': 2,
          'multidimensional': 3,
          'risk': 4,
          'integration': 5,
        };
        
        const stepIndex = stageToStep[progress.stage];
        if (stepIndex !== undefined) {
          setCurrentStep(stepIndex);
          setAnalysisSteps(prev => prev.map((step, idx) => {
            if (idx < stepIndex) {
              return { ...step, status: 'completed', progress: 100 };
            } else if (idx === stepIndex) {
              return { ...step, status: 'running', progress: progress.progress, detail: progress.message };
            }
            return step;
          }));
        }
      });
      
      // 转换为UI兼容格式
      const analysisResults = convertToLegacyFormat(completeAnalysis, data);
      setResults(analysisResults);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleStartNew = () => {
    setResults(null);
    setShowInput(false);
  };

  if (results) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Decision Simulator</span>
            </div>
            <LanguageSwitcher />
          </div>
        </header>
        <main className="container py-8">
          <AnalysisResults results={results} onStartNew={handleStartNew} />
        </main>
      </div>
    );
  }

  if (showInput) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Decision Simulator</span>
            </div>
            <LanguageSwitcher />
          </div>
        </header>
        <main className="container py-8 max-w-3xl">
          {isAnalyzing ? (
            <AnalysisProgress 
              steps={analysisSteps} 
              currentStep={currentStep} 
              overallProgress={overallProgress} 
            />
          ) : (
            <DecisionInputForm onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Decision Simulator</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/about">
              <a className="text-sm font-medium hover:text-primary transition-colors">
                {t('nav.about')}
              </a>
            </Link>
            <LanguageSwitcher />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center bg-gradient-to-b from-background via-primary/5 to-accent/5">
        <div className="container py-24 text-center space-y-8">
          <div className="space-y-4 max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('hero.subtitle')}
            </p>
          </div>
          
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => setShowInput(true)} className="gap-2">
              <Sparkles className="h-5 w-5" />
              {t('hero.cta')}
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#features">{t('hero.learnMore')}</a>
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
            <div className="p-6 rounded-lg border bg-card text-left space-y-2">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Cascade Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Track first, second, and third-order effects of your decisions through advanced AI modeling.
              </p>
            </div>
            
            <div className="p-6 rounded-lg border bg-card text-left space-y-2">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Brain className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg">Multi-dimensional Scoring</h3>
              <p className="text-sm text-muted-foreground">
                Evaluate decisions across financial, career, lifestyle, and relationship dimensions.
              </p>
            </div>
            
            <div className="p-6 rounded-lg border bg-card text-left space-y-2">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Visualize Outcomes</h3>
              <p className="text-sm text-muted-foreground">
                See possible futures through AI-generated scenarios and probability distributions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-muted/30">
        <div className="container text-center space-y-2">
          <p className="text-sm text-muted-foreground">{t('footer.tagline')}</p>
          <p className="text-xs text-muted-foreground">{t('footer.copyright')}</p>
        </div>
      </footer>
    </div>
  );
}

