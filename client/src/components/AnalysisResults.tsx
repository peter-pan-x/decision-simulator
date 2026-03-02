import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileDown, RotateCcw, TrendingUp, AlertTriangle, Brain, MessageSquare, Share2, Download } from 'lucide-react';
import { exportToPDF, shareReport } from '@/lib/exportUtils';
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
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  cascadeEffects: CascadeEffect;
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

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'low': return <Badge className="bg-green-100 text-green-800 border-green-200">Low Risk</Badge>;
      case 'medium': return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Medium Risk</Badge>;
      case 'high': return <Badge className="bg-orange-100 text-orange-800 border-orange-200">High Risk</Badge>;
      case 'critical': return <Badge className="bg-red-100 text-red-800 border-red-200">Critical Risk</Badge>;
      default: return null;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700" id="analysis-report">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card p-6 rounded-xl border shadow-sm">
        <div>
          <h2 className="text-3xl font-bold">{t('results.title')}</h2>
          <p className="text-muted-foreground mt-1">
            Comprehensive multi-dimensional analysis of your decision options
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={() => exportToPDF('analysis-report', `Decision_Analysis_${new Date().getTime()}.pdf`)}
          >
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={() => shareReport('My Decision Analysis', 'Check out this strategic analysis from DecisionSimulator AI!')}
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button variant="default" size="sm" onClick={onStartNew} className="gap-2">
            <RotateCcw className="h-4 w-4" />
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
              {t('results.comparison')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <RadarChart 
                data={
                  results[0]?.dimensionScores.map(dim => {
                    const entry: any = { dimension: dim.dimension };
                    results.forEach(opt => {
                      const optDim = opt.dimensionScores.find(d => d.dimension === dim.dimension);
                      entry[opt.optionName] = optDim ? optDim.score : 0;
                    });
                    return entry;
                  }) || []
                }
                dataKeys={results.map(opt => opt.optionName)}
                colors={['#2563eb', '#db2777', '#059669', '#d97706', '#7c3aed']}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              {t('results.recommendation')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {results.sort((a, b) => b.overallScore - a.overallScore).map((option, index) => (
              <div key={option.optionId} className={`p-4 rounded-lg border ${index === 0 ? 'bg-primary/5 border-primary/20 ring-1 ring-primary/20' : 'bg-muted/30'}`}>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-lg">{option.optionName}</h4>
                  <span className={`text-2xl font-black ${getScoreColor(option.overallScore)}`}>
                    {option.overallScore}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  {getRiskBadge(option.riskLevel)}
                  {index === 0 && <Badge className="bg-primary text-primary-foreground">Best Choice</Badge>}
                </div>
                <p className="text-sm text-muted-foreground italic">
                  Best for: {option.bestFor}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Detailed Option Analysis */}
      <Tabs defaultValue={results[0]?.optionId} className="w-full">
        <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${results.length}, 1fr)` }}>
          {results.map(option => (
            <TabsTrigger key={option.optionId} value={option.optionId} className="text-sm font-semibold">
              {option.optionName}
            </TabsTrigger>
          ))}
        </TabsList>

        {results.map(option => (
          <TabsContent key={option.optionId} value={option.optionId} className="mt-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Pros & Cons */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Pros & Cons
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h5 className="font-bold text-green-600 text-sm uppercase tracking-wider">Advantages</h5>
                    <ul className="space-y-2">
                      {option.pros.map((pro, i) => (
                        <li key={i} className="text-sm flex gap-2">
                          <span className="text-green-500">✓</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h5 className="font-bold text-red-600 text-sm uppercase tracking-wider">Disadvantages</h5>
                    <ul className="space-y-2">
                      {option.cons.map((con, i) => (
                        <li key={i} className="text-sm flex gap-2">
                          <span className="text-red-500">✗</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Dimension Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Dimension Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {option.dimensionScores.map(dim => (
                    <div key={dim.dimension} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{dim.dimension}</span>
                        <span className={getScoreColor(dim.score)}>{dim.score}/100</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-1000 ${
                            dim.score >= 80 ? 'bg-green-500' : 
                            dim.score >= 60 ? 'bg-blue-500' : 
                            dim.score >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${dim.score}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-muted-foreground">{dim.details}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Cascade Effects Visualization */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  Cascade Effects Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DecisionFlowChart 
                  optionName={option.optionName}
                  cascadeEffects={option.cascadeEffects}
                  overallScore={option.overallScore}
                />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
