import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Brain,
  TrendingUp,
  Users,
  Zap,
  ShieldCheck,
  Globe,
  BarChart3,
  Lightbulb,
} from "lucide-react";
import { Link } from "wouter";

export default function About() {
  const { i18n } = useTranslation();
  const isChinese = (i18n.resolvedLanguage || i18n.language)
    .toLowerCase()
    .startsWith("zh");
  const features = isChinese
    ? [
        {
          title: "多智能体编排",
          desc: "多个专业 AI 智能体并行工作，从不同角度分析你的决策。",
          icon: Users,
        },
        {
          title: "辩证推理",
          desc: "让乐观派和风险管理派进行内部辩论，生成更平衡的结论。",
          icon: Brain,
        },
        {
          title: "情景规划",
          desc: "可视化多条未来轨迹，包括黑天鹅事件和市场变化。",
          icon: Lightbulb,
        },
        {
          title: "级联效应映射",
          desc: "追踪一阶、二阶和三阶后果，覆盖多个生活与事业维度。",
          icon: TrendingUp,
        },
      ]
    : [
        {
          title: "Multi-Agent Orchestration",
          desc: "Six specialized AI agents working in parallel to analyze your decision from every angle.",
          icon: Users,
        },
        {
          title: "Dialectical Reasoning",
          desc: "Internal debate between optimist and risk-manager agents to ensure balanced conclusions.",
          icon: Brain,
        },
        {
          title: "Scenario Planning",
          desc: "Visualizing multiple future trajectories including black swan events and market shifts.",
          icon: Lightbulb,
        },
        {
          title: "Cascade Effect Mapping",
          desc: "Tracing 1st, 2nd, and 3rd order consequences across 5+ life dimensions.",
          icon: TrendingUp,
        },
      ];

  return (
    <div className="container py-16 space-y-24">
      {/* Hero Section */}
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        <Badge
          variant="outline"
          className="px-4 py-1 text-sm font-medium border-primary/30 text-primary bg-primary/5"
        >
          {isChinese
            ? "战略智能的未来"
            : "The Future of Strategic Intelligence"}
        </Badge>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          {isChinese
            ? "用 AI 赋能更好的决策"
            : "Empowering Better Decisions Through AI"}
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
          {isChinese
            ? "DecisionSimulator AI 将高级决策科学与多智能体大模型编排结合，帮助你穿越复杂性，看清选择的长期影响。"
            : "DecisionSimulator AI combines advanced decision science with multi-agent LLM orchestration to help you navigate complexity and visualize the long-term impact of your choices."}
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link href="/">
            <Button size="lg" className="px-8 font-bold">
              {isChinese ? "开始免费分析" : "Start Free Analysis"}
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="px-8 font-bold">
            {isChinese ? "联系销售" : "Contact Sales"}
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y bg-muted/30 rounded-2xl">
        <div className="text-center space-y-1">
          <p className="text-4xl font-bold text-primary">98%</p>
          <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
            {isChinese ? "准确率" : "Accuracy Rate"}
          </p>
        </div>
        <div className="text-center space-y-1">
          <p className="text-4xl font-bold text-primary">50k+</p>
          <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
            {isChinese ? "已建模决策" : "Decisions Modeled"}
          </p>
        </div>
        <div className="text-center space-y-1">
          <p className="text-4xl font-bold text-primary">120+</p>
          <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
            {isChinese ? "覆盖国家" : "Countries"}
          </p>
        </div>
        <div className="text-center space-y-1">
          <p className="text-4xl font-bold text-primary">24/7</p>
          <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
            {isChinese ? "AI 可用性" : "AI Availability"}
          </p>
        </div>
      </div>

      {/* Core Methodology */}
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">
            {isChinese ? "我们的科学方法" : "Our Scientific Approach"}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {isChinese
              ? "我们不只是猜测，而是使用经过验证的分析框架拆解复杂性。"
              : "We don't just guess. We use proven analytical frameworks to deconstruct complexity."}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="px-0">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Game Theory</CardTitle>
            </CardHeader>
            <CardContent className="px-0 text-muted-foreground">
              {isChinese
                ? "分析不同选项之间的战略互动，寻找纳什均衡和更优路径。"
                : "Analyzing strategic interactions between different options to find the Nash Equilibrium and optimal paths."}
            </CardContent>
          </Card>
          <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="px-0">
              <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>Monte Carlo Simulation</CardTitle>
            </CardHeader>
            <CardContent className="px-0 text-muted-foreground">
              {isChinese
                ? "运行大量模拟，理解概率分布，并为极端情况做准备。"
                : "Running thousands of simulations to understand probability distributions and prepare for edge cases."}
            </CardContent>
          </Card>
          <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="px-0">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Systems Thinking</CardTitle>
            </CardHeader>
            <CardContent className="px-0 text-muted-foreground">
              {isChinese
                ? "映射复杂因果关系，识别反馈回路和不明显的长期后果。"
                : "Mapping complex causal relationships to identify feedback loops and non-obvious long-term consequences."}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Features Grid */}
      <div className="space-y-12">
        <h2 className="text-3xl font-bold text-center">
          {isChinese ? "企业级能力" : "Enterprise-Grade Features"}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="flex gap-4 p-6 rounded-2xl border bg-card hover:border-primary/50 transition-colors"
            >
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-primary text-primary-foreground rounded-3xl p-12 text-center space-y-6">
        <h2 className="text-4xl font-bold">
          {isChinese
            ? "准备好掌控你的未来了吗？"
            : "Ready to Master Your Future?"}
        </h2>
        <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
          {isChinese
            ? "加入正在使用 DecisionSimulator AI 的专业人士和个人，更有把握地做出高风险选择。"
            : "Join thousands of professionals and individuals using DecisionSimulator AI to make high-stakes choices with confidence."}
        </p>
        <Link href="/">
          <Button
            size="lg"
            variant="secondary"
            className="px-12 font-bold text-lg"
          >
            {isChinese ? "立即开始" : "Get Started Now"}
          </Button>
        </Link>
      </div>
    </div>
  );
}

function Badge({
  children,
  className,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline";
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
        variant === "outline"
          ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
          : "border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
      } ${className}`}
    >
      {children}
    </span>
  );
}
