import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, TrendingUp, ShieldAlert, Zap, GitBranch } from 'lucide-react';
import { DebateLog } from '@/lib/aiAgents/types';

interface ReasoningVisualizationProps {
  logs: DebateLog[];
}

export default function ReasoningVisualization({ logs }: ReasoningVisualizationProps) {
  const optimistLogs = logs.filter(l => l.role === 'optimist');
  const cynicLogs = logs.filter(l => l.role === 'cynic');
  const synthesizerLogs = logs.filter(l => l.role === 'synthesizer');
  const futuristLogs = logs.filter(l => l.role === 'futurist');

  const renderAgentColumn = (title: string, agentLogs: DebateLog[], icon: React.ReactNode, color: string) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h4 className="font-semibold text-sm">{title}</h4>
      </div>
      <div className={`space-y-2 p-3 rounded-lg border-l-4 ${color}`}>
        {agentLogs.length > 0 ? (
          agentLogs.map((log, i) => (
            <div key={i} className="text-[11px] leading-relaxed">
              <p className="font-medium">{log.message}</p>
              {log.thoughtProcess && (
                <p className="opacity-60 italic mt-1">💭 {log.thoughtProcess}</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-xs opacity-50 italic">No reasoning yet...</p>
        )}
      </div>
    </div>
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Multi-Agent Reasoning Process
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-4 gap-4">
          {renderAgentColumn(
            'Optimist',
            optimistLogs,
            <TrendingUp className="h-4 w-4 text-green-600" />,
            'border-green-200 bg-green-50/30'
          )}
          {renderAgentColumn(
            'Risk Manager',
            cynicLogs,
            <ShieldAlert className="h-4 w-4 text-red-600" />,
            'border-red-200 bg-red-50/30'
          )}
          {renderAgentColumn(
            'Synthesizer',
            synthesizerLogs,
            <Zap className="h-4 w-4 text-blue-600" />,
            'border-blue-200 bg-blue-50/30'
          )}
          {renderAgentColumn(
            'Futurist',
            futuristLogs,
            <GitBranch className="h-4 w-4 text-purple-600" />,
            'border-purple-200 bg-purple-50/30'
          )}
        </div>

        {/* Synthesis Summary */}
        {synthesizerLogs.length > 0 && (
          <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <Zap className="h-4 w-4 text-blue-600" />
              Final Synthesis
            </h4>
            <div className="space-y-2">
              {synthesizerLogs.map((log, i) => (
                <p key={i} className="text-sm leading-relaxed">
                  {log.message}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Reasoning Depth Indicator */}
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Reasoning Depth</span>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-[10px]">
                Optimist: {optimistLogs.length} thoughts
              </Badge>
              <Badge variant="outline" className="text-[10px]">
                Risk: {cynicLogs.length} thoughts
              </Badge>
              <Badge variant="outline" className="text-[10px]">
                Synthesis: {synthesizerLogs.length} thoughts
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
