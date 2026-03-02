import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, X, Sparkles, Info, Target, Shield, Clock, Layers } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export interface DecisionOption {
  id: string;
  description: string;
}

export interface DecisionInput {
  question: string;
  decision: string;
  options: DecisionOption[];
  dimensions: string[];
  customFactors: string[];
  timeframe: string;
  riskProfile: string;
}

interface DecisionInputProps {
  onAnalyze: (data: DecisionInput) => void;
  isAnalyzing?: boolean;
}

const AVAILABLE_DIMENSIONS = [
  'financial',
  'career',
  'lifestyle',
  'relationships',
  'health',
  'time',
];

export default function DecisionInputForm({ onAnalyze, isAnalyzing = false }: DecisionInputProps) {
  const { t } = useTranslation();
  const [decision, setDecision] = useState('');
  const [options, setOptions] = useState<DecisionOption[]>([
    { id: '1', description: '' },
    { id: '2', description: '' },
  ]);
  const [selectedDimensions, setSelectedDimensions] = useState<string[]>([
    'financial',
    'career',
    'lifestyle',
  ]);
  const [timeframe, setTimeframe] = useState('medium');
  const [riskProfile, setRiskProfile] = useState('balanced');
  const [customFactors, setCustomFactors] = useState<string[]>(['']);

  const addOption = () => {
    if (options.length < 5) {
      setOptions([...options, { id: Date.now().toString(), description: '' }]);
    }
  };

  const removeOption = (id: string) => {
    if (options.length > 2) {
      setOptions(options.filter((opt) => opt.id !== id));
    }
  };

  const updateOption = (id: string, description: string) => {
    setOptions(options.map((opt) => (opt.id === id ? { ...opt, description } : opt)));
  };

  const toggleDimension = (dimension: string) => {
    setSelectedDimensions((prev) =>
      prev.includes(dimension)
        ? prev.filter((d) => d !== dimension)
        : [...prev, dimension]
    );
  };

  const addCustomFactor = () => {
    if (customFactors.length < 5) {
      setCustomFactors([...customFactors, '']);
    }
  };

  const removeCustomFactor = (index: number) => {
    if (customFactors.length > 1) {
      setCustomFactors(customFactors.filter((_, i) => i !== index));
    }
  };

  const updateCustomFactor = (index: number, value: string) => {
    setCustomFactors(customFactors.map((f, i) => (i === index ? value : f)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!decision.trim() || options.some((opt) => !opt.description.trim())) {
      return;
    }
    onAnalyze({
      question: decision,
      decision,
      options,
      dimensions: selectedDimensions,
      customFactors: customFactors.filter(f => f.trim() !== ''),
      timeframe,
      riskProfile,
    });
  };

  const isValid =
    decision.trim() && options.every((opt) => opt.description.trim()) && selectedDimensions.length > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Strategic Input</h2>
        <p className="text-muted-foreground">Define your decision parameters for deep AI simulation</p>
      </div>

      <div className="grid gap-8">
        {/* Section 1: Core Decision */}
        <Card className="border-primary/10 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2 text-primary mb-1">
              <Target className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Phase 1</span>
            </div>
            <CardTitle>Core Decision & Options</CardTitle>
            <CardDescription>What is the primary choice you are facing?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="decision" className="text-sm font-semibold">Decision Description</Label>
              <Textarea
                id="decision"
                placeholder="e.g., Should I leave my stable corporate job to start a FinTech startup?"
                value={decision}
                onChange={(e) => setDecision(e.target.value)}
                className="min-h-24 resize-none focus:ring-primary"
                disabled={isAnalyzing}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold">Options to Compare</Label>
                <span className="text-[10px] text-muted-foreground uppercase">Min 2, Max 5</span>
              </div>
              <div className="space-y-3">
                {options.map((option, index) => (
                  <div key={option.id} className="flex gap-2 group">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border bg-muted/50 text-xs font-bold">
                      {index + 1}
                    </div>
                    <Input
                      placeholder={`Option ${index + 1} description...`}
                      value={option.description}
                      onChange={(e) => updateOption(option.id, e.target.value)}
                      disabled={isAnalyzing}
                      className="focus:ring-primary"
                    />
                    {options.length > 2 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeOption(option.id)}
                        disabled={isAnalyzing}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              {options.length < 5 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addOption}
                  disabled={isAnalyzing}
                  className="w-full border-dashed"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Comparison Option
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Analysis Dimensions */}
        <Card className="border-primary/10 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2 text-primary mb-1">
              <Layers className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Phase 2</span>
            </div>
            <CardTitle>Analysis Dimensions</CardTitle>
            <CardDescription>Select the areas of life this decision will impact most</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {AVAILABLE_DIMENSIONS.map((dimension) => (
                <div 
                  key={dimension} 
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                    selectedDimensions.includes(dimension) 
                    ? 'bg-primary/5 border-primary ring-1 ring-primary/20' 
                    : 'hover:bg-muted'
                  }`}
                  onClick={() => toggleDimension(dimension)}
                >
                  <Checkbox
                    id={dimension}
                    checked={selectedDimensions.includes(dimension)}
                    onCheckedChange={() => toggleDimension(dimension)}
                    disabled={isAnalyzing}
                    className="data-[state=checked]:bg-primary"
                  />
                  <label
                    htmlFor={dimension}
                    className="text-sm font-medium capitalize cursor-pointer select-none"
                  >
                    {dimension}
                  </label>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-semibold">Custom Success Factors</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs max-w-xs">Add specific goals or constraints unique to your situation (e.g., "Must allow for remote work")</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="space-y-2">
                {customFactors.map((factor, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Specific factor or constraint..."
                      value={factor}
                      onChange={(e) => updateCustomFactor(index, e.target.value)}
                      disabled={isAnalyzing}
                      className="flex-1 text-sm"
                    />
                    {customFactors.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeCustomFactor(index)}
                        disabled={isAnalyzing}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                {customFactors.length < 5 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={addCustomFactor}
                    disabled={isAnalyzing}
                    className="text-xs text-primary hover:bg-primary/5"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add Custom Factor
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Parameters */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-primary/10 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2 text-primary mb-1">
                <Clock className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Phase 3</span>
              </div>
              <CardTitle>Time Horizon</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={timeframe} onValueChange={setTimeframe} disabled={isAnalyzing}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short Term (0-1 Year)</SelectItem>
                  <SelectItem value="medium">Medium Term (1-5 Years)</SelectItem>
                  <SelectItem value="long">Long Term (5-10+ Years)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-[10px] text-muted-foreground mt-3 italic">
                Determines the depth of temporal simulation and causal chain tracing.
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/10 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2 text-primary mb-1">
                <Shield className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Phase 4</span>
              </div>
              <CardTitle>Risk Tolerance</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={riskProfile} onValueChange={setRiskProfile} disabled={isAnalyzing}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conservative">Conservative (Risk Averse)</SelectItem>
                  <SelectItem value="balanced">Balanced (Prudent)</SelectItem>
                  <SelectItem value="aggressive">Aggressive (Opportunity Focused)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-[10px] text-muted-foreground mt-3 italic">
                Influences the weighting of downside risks vs. upside potential in the final report.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="pt-6">
        <Button 
          type="submit" 
          size="lg" 
          className="w-full h-14 text-lg font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.99]" 
          disabled={!isValid || isAnalyzing}
        >
          {isAnalyzing ? (
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Initializing AI Agents...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6" />
              Run Strategic Simulation
            </div>
          )}
        </Button>
        <p className="text-center text-[10px] text-muted-foreground mt-4 uppercase tracking-widest">
          Enterprise Grade Analysis • 10,000+ Simulations • Multi-Agent Synthesis
        </p>
      </div>
    </form>
  );
}
