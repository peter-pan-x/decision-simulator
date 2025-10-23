import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Plus, X, Sparkles } from 'lucide-react';

export interface DecisionOption {
  id: string;
  description: string;
}

export interface DecisionInput {
  question: string; // 改为question以匹配AI Agent类型
  decision: string; // 保留用于表单
  options: DecisionOption[];
  dimensions: string[];
  customFactors: string[]; // 用户自定义的其他重要因素
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
      question: decision, // 用于AI分析
      decision, // 用于表单显示
      options,
      dimensions: selectedDimensions,
      customFactors: customFactors.filter(f => f.trim() !== ''), // 过滤空值
      timeframe,
      riskProfile,
    });
  };

  const isValid =
    decision.trim() && options.every((opt) => opt.description.trim()) && selectedDimensions.length > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('input.title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Decision Description */}
          <div className="space-y-2">
            <Label htmlFor="decision">{t('input.decisionLabel')}</Label>
            <Textarea
              id="decision"
              placeholder={t('input.decisionPlaceholder')}
              value={decision}
              onChange={(e) => setDecision(e.target.value)}
              className="min-h-24"
              disabled={isAnalyzing}
            />
          </div>

          {/* Options */}
          <div className="space-y-3">
            <Label>{t('input.optionsTitle')}</Label>
            {options.map((option, index) => (
              <div key={option.id} className="flex gap-2">
                <Input
                  placeholder={`${t('input.optionPlaceholder')} ${index + 1}`}
                  value={option.description}
                  onChange={(e) => updateOption(option.id, e.target.value)}
                  disabled={isAnalyzing}
                />
                {options.length > 2 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeOption(option.id)}
                    disabled={isAnalyzing}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            {options.length < 5 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addOption}
                disabled={isAnalyzing}
              >
                <Plus className="h-4 w-4 mr-2" />
                {t('input.addOption')}
              </Button>
            )}
          </div>

          {/* Dimensions */}
          <div className="space-y-3">
            <Label>{t('input.dimensionsTitle')}</Label>
            <div className="grid grid-cols-2 gap-3">
              {AVAILABLE_DIMENSIONS.map((dimension) => (
                <div key={dimension} className="flex items-center space-x-2">
                  <Checkbox
                    id={dimension}
                    checked={selectedDimensions.includes(dimension)}
                    onCheckedChange={() => toggleDimension(dimension)}
                    disabled={isAnalyzing}
                  />
                  <label
                    htmlFor={dimension}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {t(`input.dimension.${dimension}`)}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Factors */}
          <div className="space-y-3">
            <Label>{t('input.customFactorsTitle')}</Label>
            <p className="text-sm text-muted-foreground">
              {t('input.customFactorsDescription')}
            </p>
            <div className="space-y-2">
              {customFactors.map((factor, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder={t('input.customFactorPlaceholder', { number: index + 1 })}
                    value={factor}
                    onChange={(e) => updateCustomFactor(index, e.target.value)}
                    disabled={isAnalyzing}
                    className="flex-1"
                  />
                  {customFactors.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
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
                  variant="outline"
                  size="sm"
                  onClick={addCustomFactor}
                  disabled={isAnalyzing}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {t('input.addCustomFactor')}
                </Button>
              )}
            </div>
          </div>

          {/* Timeframe */}
          <div className="space-y-2">
            <Label htmlFor="timeframe">{t('input.timeframe')}</Label>
            <Select value={timeframe} onValueChange={setTimeframe} disabled={isAnalyzing}>
              <SelectTrigger id="timeframe">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short">{t('input.timeframeOptions.short')}</SelectItem>
                <SelectItem value="medium">{t('input.timeframeOptions.medium')}</SelectItem>
                <SelectItem value="long">{t('input.timeframeOptions.long')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Risk Profile */}
          <div className="space-y-2">
            <Label htmlFor="risk">{t('input.riskProfile')}</Label>
            <Select value={riskProfile} onValueChange={setRiskProfile} disabled={isAnalyzing}>
              <SelectTrigger id="risk">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="conservative">{t('input.riskOptions.conservative')}</SelectItem>
                <SelectItem value="balanced">{t('input.riskOptions.balanced')}</SelectItem>
                <SelectItem value="aggressive">{t('input.riskOptions.aggressive')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" size="lg" className="w-full" disabled={!isValid || isAnalyzing}>
        <Sparkles className="h-5 w-5 mr-2" />
        {isAnalyzing ? t('input.analyzing') : t('input.analyze')}
      </Button>
    </form>
  );
}

