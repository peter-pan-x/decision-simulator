import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb } from 'lucide-react';

interface GameTheoryVisualizationProps {
  payoffMatrix: Record<string, Record<string, number>>;
  nashEquilibrium: string;
  strategicInsights: string[];
  title?: string;
}

export default function GameTheoryVisualization({
  payoffMatrix,
  nashEquilibrium,
  strategicInsights,
  title = 'Game Theory Analysis'
}: GameTheoryVisualizationProps) {
  const entries = Object.entries(payoffMatrix);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Strategic analysis of option interactions and equilibrium states
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Payoff Matrices */}
        {entries.length > 0 && (
          <div>
            <h3 className="font-semibold text-sm mb-3">Payoff Matrices</h3>
            <div className="space-y-4">
              {entries.map(([matchup, payoffs]) => (
                <div key={matchup} className="p-4 rounded-lg border bg-muted/30">
                  <h4 className="font-medium text-sm mb-3">{matchup}</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(payoffs).map(([option, payoff]) => (
                      <div key={option} className="flex items-center justify-between p-2 rounded bg-background border">
                        <span className="text-sm font-medium">{option}</span>
                        <span className={`text-lg font-bold ${
                          payoff >= 75 ? 'text-green-600' :
                          payoff >= 50 ? 'text-blue-600' :
                          'text-yellow-600'
                        }`}>
                          {payoff}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Nash Equilibrium */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
          <h3 className="font-semibold text-sm mb-2">Nash Equilibrium</h3>
          <p className="text-sm leading-relaxed">{nashEquilibrium}</p>
          <p className="text-xs text-muted-foreground mt-2 italic">
            The Nash Equilibrium represents the optimal strategy where no player can improve their outcome by unilaterally changing their choice.
          </p>
        </div>

        {/* Strategic Insights */}
        {strategicInsights.length > 0 && (
          <div>
            <h3 className="font-semibold text-sm mb-3">Strategic Insights</h3>
            <div className="space-y-2">
              {strategicInsights.map((insight, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-lg bg-muted/30 border">
                  <span className="text-primary font-bold flex-shrink-0">→</span>
                  <p className="text-sm leading-relaxed">{insight}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Game Theory Principles */}
        <div className="pt-4 border-t">
          <h4 className="font-semibold text-sm mb-3">Key Principles</h4>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="text-xs p-3 rounded bg-muted/30 border">
              <Badge variant="outline" className="mb-2">Dominant Strategy</Badge>
              <p className="text-muted-foreground">A strategy that yields better payoff regardless of opponent's choice</p>
            </div>
            <div className="text-xs p-3 rounded bg-muted/30 border">
              <Badge variant="outline" className="mb-2">Mixed Strategy</Badge>
              <p className="text-muted-foreground">Randomizing between options to maintain unpredictability</p>
            </div>
            <div className="text-xs p-3 rounded bg-muted/30 border">
              <Badge variant="outline" className="mb-2">Pareto Efficiency</Badge>
              <p className="text-muted-foreground">No outcome where all players could be better off</p>
            </div>
            <div className="text-xs p-3 rounded bg-muted/30 border">
              <Badge variant="outline" className="mb-2">Zero-Sum Game</Badge>
              <p className="text-muted-foreground">One player's gain is another player's loss</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
