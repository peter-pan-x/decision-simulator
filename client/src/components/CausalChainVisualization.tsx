import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, GitBranch } from 'lucide-react';

interface CausalChainVisualizationProps {
  chains: string[][];
  title?: string;
}

export default function CausalChainVisualization({ chains, title = 'Causal Chain Analysis' }: CausalChainVisualizationProps) {
  if (!chains || chains.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GitBranch className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Tracing deep causal relationships and feedback loops
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {chains.map((chain, chainIndex) => (
            <div key={chainIndex} className="space-y-3">
              <Badge variant="outline" className="mb-2">
                Chain {chainIndex + 1}
              </Badge>
              <div className="flex flex-wrap items-center gap-2 p-4 rounded-lg bg-muted/30 border">
                {chain.map((effect, effectIndex) => (
                  <div key={effectIndex} className="flex items-center gap-2">
                    <div className="px-3 py-2 rounded-md bg-primary/10 border border-primary/20 text-sm font-medium whitespace-nowrap">
                      {effect}
                    </div>
                    {effectIndex < chain.length - 1 && (
                      <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground italic px-4">
                {chain.length} levels of causality identified
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t">
          <h4 className="font-semibold text-sm mb-3">Key Insights</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Feedback loops amplify initial effects over time</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Long causal chains create non-obvious consequences</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Understanding these chains is critical for risk management</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
