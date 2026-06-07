import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus, Sparkles, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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

const DEFAULT_DIMENSIONS = [
  "fit",
  "upside",
  "risk",
  "cost",
  "reversibility",
  "future_regret",
];

const createOption = (index: number, description = ""): DecisionOption => ({
  id: `option-${index}-${Date.now()}`,
  description,
});

export default function DecisionInputForm({
  onAnalyze,
  isAnalyzing = false,
}: DecisionInputProps) {
  const { t, i18n } = useTranslation();
  const isChinese = (i18n.resolvedLanguage || i18n.language)
    .toLowerCase()
    .startsWith("zh");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<DecisionOption[]>([
    { id: "option-a", description: "" },
    { id: "option-b", description: "" },
  ]);

  const updateOption = (id: string, description: string) => {
    setOptions(current =>
      current.map(option =>
        option.id === id ? { ...option, description } : option
      )
    );
  };

  const addOption = () => {
    if (options.length >= 5) return;
    setOptions(current => [...current, createOption(current.length + 1)]);
  };

  const removeOption = (id: string) => {
    if (options.length <= 2) return;
    setOptions(current => current.filter(option => option.id !== id));
  };

  const applyExample = () => {
    if (isChinese) {
      setQuestion("我应该继续做当前工作，还是全职投入自己的产品？");
      setOptions([
        { id: "option-a", description: "继续留在当前工作，业余时间做产品" },
        { id: "option-b", description: "辞职，全职投入产品创业" },
      ]);
      return;
    }

    setQuestion(
      "Should I stay in my current job or go full-time on my product?"
    );
    setOptions([
      {
        id: "option-a",
        description: "Stay in my current job and build on the side",
      },
      { id: "option-b", description: "Quit and work full-time on the product" },
    ]);
  };

  const completedOptions = options.filter(option => option.description.trim());
  const canAnalyze = question.trim().length > 0 && completedOptions.length >= 2;
  const helperText = !question.trim()
    ? t("input.hints.describeDecision")
    : completedOptions.length < 2
      ? t("input.hints.completeOptions")
      : t("input.hints.ready");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!canAnalyze) return;

    const cleanOptions = options
      .map(option => ({ ...option, description: option.description.trim() }))
      .filter(option => option.description);

    onAnalyze({
      question: question.trim(),
      decision: question.trim(),
      options: cleanOptions,
      dimensions: DEFAULT_DIMENSIONS,
      customFactors: [],
      timeframe: "medium",
      riskProfile: "balanced",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Card className="border-primary/15 shadow-sm">
        <CardContent className="space-y-6 p-5 sm:p-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <Label
                htmlFor="decision-question"
                className="text-base font-bold"
              >
                {t("optionInput.questionLabel")}
              </Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={applyExample}
                disabled={isAnalyzing}
                className="h-8 px-2 text-xs"
              >
                {t("optionInput.example")}
              </Button>
            </div>
            <Textarea
              id="decision-question"
              value={question}
              onChange={event => setQuestion(event.target.value)}
              placeholder={t("optionInput.questionPlaceholder")}
              disabled={isAnalyzing}
              className="min-h-24 resize-none text-base"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-bold">
                {t("optionInput.optionsLabel")}
              </Label>
              <span className="text-xs text-muted-foreground">
                {completedOptions.length}/{options.length} {t("input.ready")}
              </span>
            </div>

            <div className="space-y-3">
              {options.map((option, index) => {
                const label = String.fromCharCode(65 + index);
                return (
                  <div key={option.id} className="flex gap-2">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary text-sm font-black text-primary-foreground">
                      {label}
                    </div>
                    <Input
                      value={option.description}
                      onChange={event =>
                        updateOption(option.id, event.target.value)
                      }
                      placeholder={t("optionInput.optionPlaceholder", {
                        label,
                      })}
                      disabled={isAnalyzing}
                      className="h-11 text-base"
                    />
                    {options.length > 2 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeOption(option.id)}
                        disabled={isAnalyzing}
                        aria-label={t("optionInput.removeOption")}
                      >
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>

            {options.length < 5 && (
              <Button
                type="button"
                variant="outline"
                onClick={addOption}
                disabled={isAnalyzing}
                className="w-full border-dashed"
              >
                <Plus className="h-4 w-4" />
                {t("optionInput.addOption")}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Button
        type="submit"
        size="lg"
        disabled={!canAnalyze || isAnalyzing}
        className="h-14 w-full text-base font-black shadow-lg shadow-primary/15"
      >
        <Sparkles className="h-5 w-5" />
        {t("optionInput.analyze")}
      </Button>
      <p className="text-center text-xs text-muted-foreground">{helperText}</p>
    </form>
  );
}
