import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, TrendingUp, Zap } from 'lucide-react';

interface Scenario {
  name: string;
  probability: number;
  description: string;
  implications: string[];
}

interface ScenarioAnalysisVisualizationProps {
  scenarios: Scenario[];
  title?: string;
}

export default function ScenarioAnalysisVisualization({ scenarios, title = 'Future Scenario Analysis' }: ScenarioAnalysisVisualizationProps) {
  if (!scenarios || scenarios.length === 0) {
    return null;
  }

  const getSeverityColor = (probability: number) => {
    if (probability > 0.3) return 'bg-red-50 border-red-200';
    if (probability > 0.15) return 'bg-yellow-50 border-yellow-200';
    return 'bg-blue-50 border-blue-200';
  };

  const getSeverityIcon = (probability: number) => {
    if (probability > 0.3) return <AlertTriangle className="h-4 w-4 text-red-600" />;
    if (probability > 0.15) return <Zap className="h-4 w-4 text-yellow-600" />;
    return <TrendingUp className="h-4 w-4 text-blue-600" />;
  };

  const sortedScenarios = [...scenarios].sort((a, b) => b.probability - a.probability);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Exploring alternative futures and their implications
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={sortedScenarios[0]?.name.replace(/\s+/g, '-').toLowerCase()} className="w-full">
          <TabsList className="grid w-full gap-2" style={{ gridTemplateColumns: `repeat(${Math.min(scenarios.length, 3)}, 1fr)` }}>
            {sortedScenarios.map((scenario) => (
              <TabsTrigger
                key={scenario.name}
                value={scenario.name.replace(/\s+/g, '-').toLowerCase()}
                className="text-xs"
              >
                <div className="flex items-center gap-1">
                  {getSeverityIcon(scenario.probability)}
                  <span className="hidden sm:inline">{scenario.name}</span>
                  <span className="sm:hidden">{(scenario.probability * 100).toFixed(0)}%</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {sortedScenarios.map((scenario) => (
            <TabsContent
              key={scenario.name}
              value={scenario.name.replace(/\s+/g, '-').toLowerCase()}
              className="space-y-4 mt-4"
            >
              <div className={`p-4 rounded-lg border ${getSeverityColor(scenario.probability)}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{scenario.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{scenario.description}</p>
                  </div>
                  <Badge variant="outline" className="ml-2 whitespace-nowrap">
                    {(scenario.probability * 100).toFixed(0)}% likely
                  </Badge>
                </div>

                {/* Probability Bar */}
                <div className="mt-4 mb-4">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Probability</span>
                    <span>{(scenario.probability * 100).toFixed(0)}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        scenario.probability > 0.3
                          ? 'bg-red-500'
                          : scenario.probability > 0.15
                          ? 'bg-yellow-500'
                          : 'bg-blue-500'
                      }`}
                      style={{ width: `${scenario.probability * 100}%` }}
                    />
                  </div>
                </div>

                {/* Implications */}
                <div>
                  <h4 className="font-semibold text-sm mb-2">Key Implications</h4>
                  <ul className="space-y-2">
                    {scenario.implications.map((implication, i) => (
                      <li key={i} className="text-sm flex gap-2">
                        <span className="text-primary font-bold">→</span>
                        <span>{implication}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Summary Statistics */}
        <div className="mt-6 pt-6 border-t grid md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{scenarios.length}</p>
            <p className="text-xs text-muted-foreground">Scenarios Analyzed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">
              {(Math.max(...scenarios.map(s => s.probability)) * 100).toFixed(0)}%
            </p>
            <p className="text-xs text-muted-foreground">Highest Probability</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">
              {(scenarios.reduce((sum, s) => sum + s.implications.length, 0) / scenarios.length).toFixed(1)}
            </p>
            <p className="text-xs text-muted-foreground">Avg Implications</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
