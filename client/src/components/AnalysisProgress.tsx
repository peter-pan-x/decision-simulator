import { useEffect, useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  Loader2,
  Circle,
  ShieldAlert,
  TrendingUp,
  Brain,
  Cpu,
  Network,
  Database,
  Zap,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { DebateLog } from "@/lib/aiAgents/types";

export interface AnalysisStep {
  id: string;
  name: string;
  status: "pending" | "running" | "completed";
  progress: number;
  detail?: string;
}

interface AnalysisProgressProps {
  steps: AnalysisStep[];
  currentStep: number;
  overallProgress: number;
  logs?: DebateLog[];
}

export default function AnalysisProgress({
  steps,
  currentStep,
  overallProgress,
  logs,
}: AnalysisProgressProps) {
  const { t } = useTranslation();
  const [dots, setDots] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // 动画效果
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // 自动滚动日志
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-2">
          <Cpu className="h-3 w-3 animate-pulse" />
          {t("progress.engineActive")}
        </div>
        <h2 className="text-3xl font-bold tracking-tight">
          {t("progress.analyzing")}
        </h2>
        <p className="text-muted-foreground">{t("progress.description")}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column: Steps */}
        <Card className="md:col-span-1 border-primary/10 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
              <Network className="h-4 w-4 text-primary" />
              {t("progress.pipeline")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-start gap-3 p-2 rounded-md transition-all ${
                  step.status === "running"
                    ? "bg-primary/5 ring-1 ring-primary/20"
                    : ""
                }`}
              >
                <div className="mt-0.5">
                  {step.status === "completed" ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : step.status === "running" ? (
                    <Loader2 className="h-4 w-4 text-primary animate-spin" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground/30" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-xs font-semibold truncate ${
                      step.status === "running"
                        ? "text-primary"
                        : step.status === "completed"
                          ? "text-foreground"
                          : "text-muted-foreground"
                    }`}
                  >
                    {step.name}
                  </p>
                  {step.status === "running" && (
                    <div className="mt-1.5">
                      <Progress value={step.progress} className="h-1" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Right Column: Live Reasoning & Overall */}
        <div className="md:col-span-2 space-y-6">
          {/* Overall Progress Card */}
          <Card className="border-primary/10 shadow-sm bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex justify-between items-end mb-2">
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-primary">
                    {t("progress.overall")}
                  </p>
                  <p className="text-2xl font-black">
                    {Math.round(overallProgress)}%
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground uppercase">
                    {t("progress.remaining")}
                  </p>
                  <p className="text-sm font-mono font-bold">
                    ~{Math.max(0, Math.round((100 - overallProgress) / 2))}s
                  </p>
                </div>
              </div>
              <Progress value={overallProgress} className="h-3 bg-primary/10" />
            </CardContent>
          </Card>

          {/* Live Reasoning Logs */}
          <Card className="border-primary/10 shadow-sm overflow-hidden">
            <CardHeader className="pb-2 border-b bg-muted/30">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                  <Brain className="h-4 w-4 text-primary" />
                  {t("progress.liveReasoning")}
                </CardTitle>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">
                    {t("progress.realTime")}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div
                ref={scrollRef}
                className="h-[300px] overflow-y-auto p-4 space-y-4 font-mono text-[11px] leading-relaxed custom-scrollbar bg-slate-950 text-slate-300"
              >
                {logs && logs.length > 0 ? (
                  logs.map((log, i) => (
                    <div
                      key={i}
                      className="space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-300"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                            log.role === "optimist"
                              ? "bg-green-900/50 text-green-400 border border-green-700/50"
                              : log.role === "cynic"
                                ? "bg-red-900/50 text-red-400 border border-red-700/50"
                                : log.role === "synthesizer"
                                  ? "bg-blue-900/50 text-blue-400 border border-blue-700/50"
                                  : "bg-slate-800 text-slate-400 border border-slate-700"
                          }`}
                        >
                          {log.agent}
                        </span>
                        <span className="text-[9px] text-slate-500">
                          [
                          {new Date(log.timestamp).toLocaleTimeString([], {
                            hour12: false,
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
                          ]
                        </span>
                      </div>
                      <p className="pl-2 border-l border-slate-800 ml-1 py-1">
                        <span className="text-primary mr-1">›</span>
                        {log.message}
                      </p>
                      {log.thoughtProcess && (
                        <p className="pl-2 ml-1 text-slate-500 italic text-[10px]">
                          // {log.thoughtProcess}
                          {dots}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-3">
                    <Database className="h-8 w-8 animate-pulse" />
                    <p className="uppercase tracking-widest text-[10px]">
                      {t("progress.initializingKnowledge")}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* System Info */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Zap className="h-3 w-3 text-yellow-500" />
                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter">
                  {t("progress.highCompute")}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldAlert className="h-3 w-3 text-blue-500" />
                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter">
                  {t("progress.encrypted")}
                </span>
              </div>
            </div>
            <p className="text-[9px] font-mono text-muted-foreground italic">
              {steps[currentStep]?.detail || t("progress.processing")}
              {dots}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
