import { useTranslation } from "react-i18next";
import {
  Award,
  CheckCircle2,
  Download,
  Gavel,
  Medal,
  MessageSquare,
  RotateCcw,
  Share2,
  ShieldAlert,
  Sparkles,
  Target,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { exportToPDF, shareReport } from "@/lib/exportUtils";
import { CompleteAnalysis, DebateLog } from "@/lib/aiAgents/types";

export interface CascadeEffect {
  first_order: string[];
  second_order: string[];
  third_order: string[];
}

export interface OptionAnalysis {
  optionId: string;
  optionName: string;
  overallScore: number;
  dimensionScores: {
    dimension: string;
    score: number;
    details: string;
  }[];
  pros: string[];
  cons: string[];
  bestFor: string;
  riskLevel: "low" | "medium" | "high" | "critical";
  cascadeEffects: CascadeEffect;
  key_uncertainties: string[];
  winningReasons?: string[];
  losingReasons?: string[];
}

interface AnalysisResultsProps {
  results: OptionAnalysis[];
  onStartNew: () => void;
  debateLogs?: DebateLog[];
  advancedAnalysis?: CompleteAnalysis;
}

function getScoreTone(score: number) {
  if (score >= 82) return "text-emerald-600";
  if (score >= 70) return "text-blue-600";
  if (score >= 58) return "text-amber-600";
  return "text-red-600";
}

function getScoreBar(score: number) {
  if (score >= 82) return "bg-emerald-500";
  if (score >= 70) return "bg-blue-500";
  if (score >= 58) return "bg-amber-500";
  return "bg-red-500";
}

export default function AnalysisResults({
  results,
  onStartNew,
  debateLogs = [],
  advancedAnalysis,
}: AnalysisResultsProps) {
  const { t } = useTranslation();
  const rankedResults = [...results].sort(
    (a, b) => b.overallScore - a.overallScore
  );
  const winner = rankedResults[0];
  const runnerUp = rankedResults[1];
  const finalReport = advancedAnalysis?.finalReport;
  const confidence = Math.round((finalReport?.confidenceLevel || 0.76) * 100);
  const winningReasons = winner?.winningReasons?.length
    ? winner.winningReasons
    : finalReport?.reasoning || [];

  if (!winner) {
    return null;
  }

  return (
    <div
      className="space-y-7 animate-in fade-in duration-700"
      id="analysis-report"
    >
      <div className="flex flex-col gap-4 rounded-lg border bg-card p-5 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="gap-1">
              <Gavel className="h-3.5 w-3.5" />
              {t("verdict.executiveBrief")}
            </Badge>
            <Badge variant="outline">
              {t("verdict.confidence")} {confidence}%
            </Badge>
          </div>
          <h2 className="text-2xl font-black tracking-tight md:text-3xl">
            {t("verdict.title")}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("verdict.subtitle")}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() =>
              exportToPDF(
                "analysis-report",
                `Decision_Verdict_${new Date().getTime()}.html`
              )
            }
          >
            <Download className="h-4 w-4" />
            {t("results.export")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() =>
              shareReport(
                "My Decision Verdict",
                `The winning option is: ${winner.optionName}`
              )
            }
          >
            <Share2 className="h-4 w-4" />
            {t("verdict.share")}
          </Button>
          <Button size="sm" onClick={onStartNew} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            {t("results.startNew")}
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden border-primary/25 shadow-md">
        <CardHeader className="bg-primary text-primary-foreground">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Award className="h-5 w-5" />
            {t("verdict.winner")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="grid gap-5 lg:grid-cols-[1fr_220px]">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Badge className="bg-primary text-primary-foreground">
                  {t("verdict.bestChoice")}
                </Badge>
                {runnerUp && (
                  <Badge variant="outline">
                    {t("verdict.beats")} {runnerUp.optionName}
                  </Badge>
                )}
              </div>
              <h3 className="text-4xl font-black tracking-tight">
                {winner.optionName}
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                {finalReport?.summary ||
                  `${winner.optionName} wins with the strongest total tradeoff profile.`}
              </p>
            </div>
            <div className="rounded-lg border bg-background p-5 text-center">
              <div
                className={`text-6xl font-black ${getScoreTone(winner.overallScore)}`}
              >
                {winner.overallScore}
              </div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                {t("verdict.finalScore")}
              </div>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {winningReasons.slice(0, 4).map((reason, index) => (
              <div
                key={index}
                className="flex gap-3 rounded-lg border bg-muted/30 p-3 text-sm"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{reason}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {rankedResults.map((option, index) => (
          <Card
            key={option.optionId}
            className={
              index === 0 ? "border-primary/30 ring-1 ring-primary/20" : ""
            }
          >
            <CardHeader className="pb-3">
              <div className="mb-2 flex items-center justify-between gap-3">
                <Badge
                  variant={index === 0 ? "default" : "outline"}
                  className="gap-1"
                >
                  {index === 0 ? (
                    <Medal className="h-3.5 w-3.5" />
                  ) : (
                    `#${index + 1}`
                  )}
                  {index === 0 ? t("verdict.winnerShort") : t("verdict.rank")}
                </Badge>
                <div
                  className={`text-3xl font-black ${getScoreTone(option.overallScore)}`}
                >
                  {option.overallScore}
                </div>
              </div>
              <CardTitle className="text-xl">{option.optionName}</CardTitle>
              <p className="text-sm text-muted-foreground">{option.bestFor}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="mb-1 flex justify-between text-xs">
                  <span>{t("verdict.optionScore")}</span>
                  <span>{option.overallScore}/100</span>
                </div>
                <Progress value={option.overallScore} className="h-2" />
                <div
                  className={`mt-[-8px] h-2 rounded-full ${getScoreBar(option.overallScore)}`}
                  style={{ width: `${option.overallScore}%` }}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
                <div>
                  <div className="mb-2 flex items-center gap-2 text-sm font-bold text-emerald-700">
                    <CheckCircle2 className="h-4 w-4" />
                    {t("verdict.pros")}
                  </div>
                  <ul className="space-y-2">
                    {option.pros.slice(0, 3).map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="text-sm text-muted-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-2 text-sm font-bold text-red-700">
                    <XCircle className="h-4 w-4" />
                    {t("verdict.cons")}
                  </div>
                  <ul className="space-y-2">
                    {option.cons.slice(0, 3).map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="text-sm text-muted-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              {t("verdict.debate")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {debateLogs.slice(-8).map((log, index) => (
              <div
                key={`${log.timestamp}-${index}`}
                className="rounded-lg border bg-muted/20 p-3"
              >
                <div className="mb-1 flex items-center justify-between gap-2">
                  <Badge variant="outline">{log.agent}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {log.role}
                  </span>
                </div>
                <p className="text-sm font-medium">{log.message}</p>
                {log.thoughtProcess && (
                  <p className="mt-1 text-xs italic text-muted-foreground">
                    {log.thoughtProcess}
                  </p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-primary" />
              {t("verdict.nextSteps")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {(finalReport?.actionPlan || []).slice(0, 4).map(step => (
              <div
                key={step.step}
                className="rounded-lg border bg-muted/20 p-3"
              >
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-primary">
                    {t("verdict.step")} {step.step}
                  </span>
                  <Badge variant="outline" className="text-[10px]">
                    {step.importance}
                  </Badge>
                </div>
                <p className="text-sm font-medium">{step.action}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {step.timeframe}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="border-dashed">
        <CardContent className="flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <Target className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <div className="font-bold">{t("verdict.reminderTitle")}</div>
              <p className="text-sm text-muted-foreground">
                {t("verdict.reminder")}
              </p>
            </div>
          </div>
          <Sparkles className="hidden h-6 w-6 text-primary md:block" />
        </CardContent>
      </Card>
    </div>
  );
}
