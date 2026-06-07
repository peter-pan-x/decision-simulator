import { Check, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "react-i18next";

export default function Pricing() {
  const { i18n } = useTranslation();
  const isChinese = (i18n.resolvedLanguage || i18n.language)
    .toLowerCase()
    .startsWith("zh");
  const plans = isChinese
    ? [
        {
          name: "免费版",
          price: "$0",
          description: "适合个人快速决策",
          features: [
            "每月 3 次分析",
            "标准 AI 智能体",
            "基础可视化",
            "7 天历史记录",
          ],
          cta: "当前方案",
          variant: "outline" as const,
        },
        {
          name: "专业版",
          price: "$19",
          description: "适合专业人士和战略思考者",
          features: [
            "无限分析",
            "高级辩证智能体",
            "博弈论与情景规划",
            "PDF 导出与分享",
            "无限历史记录",
            "优先神经处理",
          ],
          cta: "升级专业版",
          variant: "default" as const,
          popular: true,
        },
        {
          name: "企业版",
          price: "定制",
          description: "适合团队和组织",
          features: [
            "包含专业版全部功能",
            "团队协作",
            "自定义决策框架",
            "API 访问",
            "专属支持",
            "SLA 保障",
          ],
          cta: "联系销售",
          variant: "outline" as const,
        },
      ]
    : [
        {
          name: "Free",
          price: "$0",
          description: "Perfect for individual quick decisions",
          features: [
            "3 analyses per month",
            "Standard AI agents",
            "Basic visualization",
            "7-day history",
          ],
          cta: "Current Plan",
          variant: "outline" as const,
        },
        {
          name: "Pro",
          price: "$19",
          description: "For professionals and strategic thinkers",
          features: [
            "Unlimited analyses",
            "Advanced Dialectical Agents",
            "Game Theory & Scenario Planning",
            "PDF Export & Sharing",
            "Unlimited history",
            "Priority neural processing",
          ],
          cta: "Upgrade to Pro",
          variant: "default" as const,
          popular: true,
        },
        {
          name: "Enterprise",
          price: "Custom",
          description: "For teams and organizations",
          features: [
            "Everything in Pro",
            "Team collaboration",
            "Custom decision frameworks",
            "API access",
            "Dedicated support",
            "SLA guarantees",
          ],
          cta: "Contact Sales",
          variant: "outline" as const,
        },
      ];

  return (
    <div className="container py-16 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          {isChinese ? "为重要决策而生" : "Built for serious decisions"}
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {isChinese ? "为决策速度定价" : "Pricing for decision velocity"}
        </h1>
        <p className="text-xl text-muted-foreground">
          {isChinese
            ? "从个人快速分析开始，逐步扩展到报告级战略工作流。"
            : "Start with quick personal analysis, then scale into report-grade strategy workflows."}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map(plan => (
          <Card
            key={plan.name}
            className={`relative flex flex-col overflow-hidden ${plan.popular ? "border-primary shadow-lg ring-1 ring-primary/20 scale-105 z-10" : ""}`}
          >
            {plan.popular && (
              <div className="bg-primary px-4 py-2 text-center text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                {isChinese ? "最适合执行者" : "Most Popular for Operators"}
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== "Custom" && plan.price !== "定制" && (
                  <span className="text-muted-foreground">
                    {isChinese ? "/月" : "/month"}
                  </span>
                )}
              </div>
              <ul className="space-y-3">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full font-bold" variant={plan.variant}>
                {(plan.name === "Pro" || plan.name === "专业版") && (
                  <Zap className="h-4 w-4 mr-2 fill-current" />
                )}
                {(plan.name === "Free" || plan.name === "免费版") && (
                  <Sparkles className="h-4 w-4 mr-2" />
                )}
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center pt-12">
        <div className="mx-auto max-w-3xl rounded-lg border bg-muted/30 p-6 text-left">
          <h2 className="font-semibold">
            {isChinese
              ? "升级后会改变什么？"
              : "What changes when you upgrade?"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isChinese
              ? "专业版围绕反复出现的战略决策设计：持久历史、更深的智能体分析、可导出报告，以及更快的备选方案迭代。"
              : "Pro is designed around repeated strategic decisions: persistent history, deeper agent passes, exportable reports, and faster iteration on alternatives."}
          </p>
        </div>
      </div>
    </div>
  );
}
