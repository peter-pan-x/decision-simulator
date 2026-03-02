import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileDown, RotateCcw, TrendingUp, AlertTriangle, Brain, MessageSquare } from 'lucide-react';
import DecisionFlowChart from './DecisionFlowChart';
import RadarChart from './RadarChart';
import ReasoningVisualization from './ReasoningVisualization';
import CausalChainVisualization from './CausalChainVisualization';
import ScenarioAnalysisVisualization from './ScenarioAnalysisVisualization';
import GameTheoryVisualization from './GameTheoryVisualization';
import { DebateLog, CompleteAnalysis } from '@/lib/aiAgents/types';

export interface CascadeEffect {
  first_order: string[];
  second_order: string[];
  third_order: string[];
}

export interface Scenario {
  description: string;
  probability: number;
  image_url?: string;
}

export interface OptionAnalysis {
  option_name: string;
  overall_score: number;
  cascade_effects: CascadeEffect;
  dimension_scores: Record<string, number>;
  scenarios: {
    best_case: Scenario;
    most_likely: Scenario;
    worst_case: Scenario;
  };
  key_uncertainties: string[];
}

interface AnalysisResultsProps {
  results: OptionAnalysis[];
  onStartNew: () => void;
  debateLogs?: DebateLog[];
  advancedAnalysis?: CompleteAnalysis;
}

export default function AnalysisResults({ results, onStartNew, debateLogs, advancedAnalysis }: AnalysisResultsProps) {
  const { t } = useTranslation();

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-blue-50 border-blue-200';
    if (score >= 40) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  // 准备雷达图数据
  const radarData = Object.keys(results[0]?.dimension_scores || {}).map((dimension) => {
    const dataPoint: any = { dimension: t(`input.dimension.${dimension}`) };
    results.forEach((result, index) => {
      dataPoint[`Option ${index + 1}`] = result.dimension_scores[dimension];
    });
    return dataPoint;
  });

  const radarDataKeys = results.map((_, index) => `Option ${index + 1}`);
  const radarColors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">{t('results.title')}</h2>
          <p className="text-muted-foreground mt-1">
            Comprehensive multi-dimensional analysis of your decision options
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileDown className="h-4 w-4 mr-2" />
            {t('results.exportPDF')}
          </Button>
          <Button variant="outline" size="sm" onClick={onStartNew}>
            <RotateCcw className="h-4 w-4 mr-2" />
            {t('results.startNew')}
          </Button>
        </div>
      </div>

      {/* Reasoning Visualization */}
      {debateLogs && debateLogs.length > 0 && (
        <div className="mb-8">
          <ReasoningVisualization logs={debateLogs} />
        </div>
      )}

      {advancedAnalysis && advancedAnalysis.gameTheory && (
        <div className="mb-8">
          <GameTheoryVisualization
            payoffMatrix={advancedAnalysis.gameTheory.payoffMatrix}
            nashEquilibrium={advancedAnalysis.gameTheory.nashEquilibrium}
            strategicInsights={advancedAnalysis.gameTheory.strategicInsights}
          />
        </div>
      )}

      {advancedAnalysis && advancedAnalysis.scenarios && advancedAnalysis.scenarios.length > 0 && (
        <div className="mb-8">
          <ScenarioAnalysisVisualization scenarios={advancedAnalysis.scenarios} />
        </div>
      )}

      {advancedAnalysis && advancedAnalysis.causalChains && advancedAnalysis.causalChains.chains.length > 0 && (
        <div className="mb-8">
          <CausalChainVisualization chains={advancedAnalysis.causalChains.chains} />
        </div>
      )}

      {/* Comparison Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Options Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Score Comparison */}
              <div>
                <h4 className="font-semibold mb-4">Overall Scores</h4>
                <div className="space-y-3">
                  {results.map((result, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium truncate max-w-[200px]">
                          {result.option_name}
                        </span>
                        <span className={`text-lg font-bold ${getScoreColor(result.overall_score)}`}>
                          {result.overall_score}
                        </span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            result.overall_score >= 70
                              ? 'bg-green-500'
                              : result.overall_score >= 50
                              ? 'bg-blue-500'
                              : 'bg-yellow-500'
                          }`}
                          style={{ width: `${result.overall_score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Radar Chart */}
              <div>
                <h4 className="font-semibold mb-4">Multi-dimensional Comparison</h4>
                <RadarChart data={radarData} dataKeys={radarDataKeys} colors={radarColors} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dialectical Reasoning Logs in Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Reasoning Trace
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {debateLogs?.map((log, i) => (
                <div key={i} className="text-[11px] p-2 rounded bg-muted/30 border-l-2 border-primary/20">
                  <div className="font-bold flex items-center gap-1 mb-1">
                    <MessageSquare className="h-3 w-3 opacity-50" />
                    {log.agent}
                  </div>
                  <p className="opacity-80">{log.message}</p>
                </div>
              ))}
              {!debateLogs?.length && (
                <p className="text-xs text-muted-foreground italic">No reasoning trace available.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis for Each Option */}
      <div className="space-y-6">
        {results.map((result, index) => (
          <Card key={index} className={`border-2 ${getScoreBgColor(result.overall_score)}`}>
            <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline">Option {index + 1}</Badge>
                    <CardTitle className="text-xl">{result.option_name}</CardTitle>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">{t('results.overallScore')}</div>
                  <div className={`text-4xl font-bold ${getScoreColor(result.overall_score)}`}>
                    {result.overall_score}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Cascade Effects Flow Chart */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  {t('results.cascadeEffects')} - Decision Flow
                </h3>
                <DecisionFlowChart
                  optionName={result.option_name}
                  cascadeEffects={result.cascade_effects}
                  overallScore={result.overall_score}
                />
              </div>

              {/* Cascade Effects List */}
              <div>
                <h3 className="font-semibold mb-3">Detailed Cascade Analysis</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Badge variant="default" className="mb-2">
                      {t('results.firstOrder')}
                    </Badge>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {result.cascade_effects.first_order.map((effect, i) => (
                        <li key={i}>{effect}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      {t('results.secondOrder')}
                    </Badge>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {result.cascade_effects.second_order.map((effect, i) => (
                        <li key={i}>{effect}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2">
                      {t('results.thirdOrder')}
                    </Badge>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {result.cascade_effects.third_order.map((effect, i) => (
                        <li key={i}>{effect}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Scenarios */}
              <div>
                <h3 className="font-semibold mb-3">{t('results.scenarios')}</h3>
                <Tabs defaultValue="most_likely" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="best_case">{t('results.bestCase')}</TabsTrigger>
                    <TabsTrigger value="most_likely">{t('results.mostLikely')}</TabsTrigger>
                    <TabsTrigger value="worst_case">{t('results.worstCase')}</TabsTrigger>
                  </TabsList>
                  {(['best_case', 'most_likely', 'worst_case'] as const).map((scenarioType) => (
                    <TabsContent key={scenarioType} value={scenarioType} className="space-y-2 mt-4">
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm leading-relaxed">{result.scenarios[scenarioType].description}</p>
                        <div className="mt-3 flex items-center gap-2">
                          <Badge variant="outline">
                            {t('results.probability')}: {(result.scenarios[scenarioType].probability * 100).toFixed(0)}%
                          </Badge>
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>

              {/* Key Uncertainties */}
              {result.key_uncertainties.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    {t('results.keyUncertainties')}
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    {result.key_uncertainties.map((uncertainty, i) => (
                      <li key={i}>{uncertainty}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

