import { lazy, Suspense, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import DecisionInputForm, { DecisionInput } from "@/components/DecisionInput";
import type { OptionAnalysis } from "@/components/AnalysisResults";
import AnalysisProgress, { AnalysisStep } from "@/components/AnalysisProgress";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowRight,
  Brain,
  Clock3,
  FileText,
  History,
  Layers3,
  Route,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { DebateLog } from "@/lib/aiAgents/types";
import { saveAnalysis } from "@/lib/historyStore";
import { toast } from "sonner";
import ModelStatus from "@/components/ModelStatus";

const AnalysisResults = lazy(() => import("@/components/AnalysisResults"));

export default function Home() {
  const { t } = useTranslation();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<OptionAnalysis[] | null>(null);
  const [analysisSteps, setAnalysisSteps] = useState<AnalysisStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);
  const [debateLogs, setDebateLogs] = useState<DebateLog[]>([]);
  const [completeAnalysis, setCompleteAnalysis] = useState<any>(null);

  const handleAnalyze = async (data: DecisionInput) => {
    setIsAnalyzing(true);
    setDebateLogs([]);
    setCompleteAnalysis(null);
    let latestDebateLogs: DebateLog[] = [];

    const steps: AnalysisStep[] = [
      {
        id: "1",
        name: "Clarify the real choice",
        status: "pending",
        progress: 0,
      },
      {
        id: "2",
        name: "Optimist argues upside",
        status: "pending",
        progress: 0,
      },
      {
        id: "3",
        name: "Skeptic attacks downside",
        status: "pending",
        progress: 0,
      },
      {
        id: "4",
        name: "Pragmatist checks feasibility",
        status: "pending",
        progress: 0,
      },
      {
        id: "5",
        name: "Future Self checks regret",
        status: "pending",
        progress: 0,
      },
      {
        id: "6",
        name: "Judge scores every option",
        status: "pending",
        progress: 0,
      },
      { id: "7", name: "Declare final winner", status: "pending", progress: 0 },
    ];
    setAnalysisSteps(steps);
    setCurrentStep(0);
    setOverallProgress(0);

    try {
      const { runCompleteAnalysis, convertToLegacyFormat } = await import(
        "@/lib/aiAgents/orchestrator"
      );

      // 运行多AI协作分析
      const completeAnalysis = await runCompleteAnalysis(data, progress => {
        // 更新进度
        setOverallProgress(progress.progress);
        if (progress.logs) {
          latestDebateLogs = progress.logs;
          setDebateLogs(progress.logs);
        }

        const stageToStep: { [key: string]: number } = {
          clarify: 0,
          optimist: 1,
          skeptic: 2,
          pragmatist: 3,
          "future-self": 4,
          judge: 5,
          complete: 6,
        };

        const stepIndex = stageToStep[progress.stage];
        if (stepIndex !== undefined) {
          setCurrentStep(stepIndex);
          setAnalysisSteps(prev =>
            prev.map((step, idx) => {
              if (idx < stepIndex) {
                return { ...step, status: "completed", progress: 100 };
              } else if (idx === stepIndex) {
                return {
                  ...step,
                  status: "running",
                  progress: progress.progress,
                  detail: progress.message,
                };
              }
              return step;
            })
          );
        }
      });

      // 转换为UI兼容格式
      const analysisResults = convertToLegacyFormat(completeAnalysis, data);
      setResults(analysisResults);
      setCompleteAnalysis(completeAnalysis);

      // 保存到历史记录
      const savedAnalysis = saveAnalysis({
        question: data.question,
        recommendation: completeAnalysis.finalReport.recommendation,
        confidence: completeAnalysis.finalReport.confidenceLevel,
        input: data,
        results: analysisResults,
        completeAnalysis,
        debateLogs: latestDebateLogs,
      });

      toast.success("Analysis saved", {
        description: `Saved to history with ${savedAnalysis.confidence}% confidence.`,
      });
    } catch (error) {
      console.error("Analysis failed:", error);
      toast.error("Analysis could not complete", {
        description:
          error instanceof Error
            ? error.message
            : "Please check your model configuration and try again.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleStartNew = () => {
    setResults(null);
  };
  const heroTitle = t("optionHome.title");
  const heroSubtitle = t("optionHome.subtitle");

  if (results) {
    return (
      <div className="container py-8">
        <Suspense
          fallback={
            <div className="rounded-lg border bg-card p-8 text-center text-sm text-muted-foreground">
              Preparing report workspace...
            </div>
          }
        >
          <AnalysisResults
            results={results}
            onStartNew={handleStartNew}
            debateLogs={debateLogs}
            advancedAnalysis={completeAnalysis}
          />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="decision-workspace">
      <div className="container py-8 lg:py-10">
        <div className="mb-8 flex flex-col gap-4 border-b pb-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="gap-1">
                <Sparkles className="h-3.5 w-3.5" />
                {t("optionHome.badge1")}
              </Badge>
              <Badge variant="outline">{t("optionHome.badge2")}</Badge>
              <Badge variant="outline">{t("optionHome.badge3")}</Badge>
            </div>
            <div>
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
                {heroTitle}
              </h1>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                {heroSubtitle}
              </p>
            </div>
          </div>
          <Button variant="outline" asChild>
            <Link href="/history" className="gap-2">
              <History className="h-4 w-4" />
              {t("nav.history")}
            </Link>
          </Button>
        </div>

        {isAnalyzing ? (
          <div className="mx-auto max-w-4xl">
            <AnalysisProgress
              steps={analysisSteps}
              currentStep={currentStep}
              overallProgress={overallProgress}
              logs={debateLogs}
            />
          </div>
        ) : (
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_340px]">
            <div className="min-w-0 space-y-4">
              <div className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
                {t("optionHome.workflow")}
              </div>
              <DecisionInputForm
                onAnalyze={handleAnalyze}
                isAnalyzing={isAnalyzing}
              />
            </div>

            <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
              <ModelStatus />

              <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
                <div className="border-b bg-slate-950 p-5 text-white">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-widest text-slate-400">
                        {t("home.readiness")}
                      </div>
                      <div className="mt-1 text-2xl font-black">
                        {t("home.decisionOS")}
                      </div>
                    </div>
                    <div className="rounded-md bg-white/10 p-2">
                      <Target className="h-5 w-5 text-cyan-300" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>{t("home.inputClarity")}</span>
                      <span>84%</span>
                    </div>
                    <Progress value={84} className="h-2 bg-white/10" />
                  </div>
                </div>
                <div className="p-5">
                  <div className="mb-4 flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    <h2 className="font-semibold">{t("home.analysisStack")}</h2>
                  </div>
                  <div className="space-y-4 text-sm">
                    <div className="flex gap-3">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <div>
                        <div className="font-medium">
                          {t("home.strategicReasoning")}
                        </div>
                        <p className="text-muted-foreground">
                          {t("home.strategicReasoningDesc")}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <div>
                        <div className="font-medium">
                          {t("home.fastPasses")}
                        </div>
                        <p className="text-muted-foreground">
                          {t("home.fastPassesDesc")}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <div>
                        <div className="font-medium">
                          {t("home.reportReady")}
                        </div>
                        <p className="text-muted-foreground">
                          {t("home.reportReadyDesc")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-muted/30 p-5">
                <div className="mb-3 text-sm font-semibold">
                  {t("home.goodInputs")}
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>{t("home.tipConstraints")}</li>
                  <li>{t("home.tipConcrete")}</li>
                  <li>{t("home.tipPersonal")}</li>
                </ul>
                <Button
                  className="mt-5 w-full gap-2"
                  variant="secondary"
                  asChild
                >
                  <Link href="/pricing">
                    {t("home.viewPlans")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg border bg-card p-3">
                  <Layers3 className="mb-2 h-4 w-4 text-primary" />
                  <div className="text-lg font-black">7</div>
                  <div className="text-[10px] uppercase text-muted-foreground">
                    {t("home.agents")}
                  </div>
                </div>
                <div className="rounded-lg border bg-card p-3">
                  <Route className="mb-2 h-4 w-4 text-primary" />
                  <div className="text-lg font-black">5y</div>
                  <div className="text-[10px] uppercase text-muted-foreground">
                    {t("home.horizon")}
                  </div>
                </div>
                <div className="rounded-lg border bg-card p-3">
                  <ShieldCheck className="mb-2 h-4 w-4 text-primary" />
                  <div className="text-lg font-black">API</div>
                  <div className="text-[10px] uppercase text-muted-foreground">
                    {t("home.protected")}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
