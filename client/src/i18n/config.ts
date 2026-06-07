import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        home: "Home",
        about: "About",
        pricing: "Pricing",
        history: "History",
        newAnalysis: "New Analysis",
        upgrade: "Upgrade to Pro",
      },

      // Hero Section
      hero: {
        title: "See Your Future, Choose Wisely",
        homeTitle: "Wise Decisions, Foresight for the Future",
        homeSubtitle:
          "Convert a messy, high-stakes choice into ranked options, future scenarios, mitigation plans, and a clean action brief.",
        subtitle:
          "Enterprise-grade decision intelligence platform. Predict complex outcomes through multi-agent AI simulation and deep causal modeling.",
        cta: "Start Analysis",
        learnMore: "Learn More",
      },

      home: {
        badgeDeepSeek: "Server-side DeepSeek v4",
        badgeRouting: "Pro reasoning + Flash routing",
        badgeReport: "Report-grade synthesis",
        readiness: "Readiness",
        decisionOS: "Decision OS",
        inputClarity: "Input clarity",
        analysisStack: "Analysis Stack",
        strategicReasoning: "Strategic reasoning",
        strategicReasoningDesc:
          "v4pro handles synthesis, debate, game theory, and the final recommendation.",
        fastPasses: "Fast structured passes",
        fastPassesDesc:
          "v4flash handles probability, timeline, dimension, and risk extraction.",
        reportReady: "Report-ready output",
        reportReadyDesc:
          "Each run saves a recommendation, confidence score, and reusable history item.",
        goodInputs: "Good inputs produce better reports",
        tipConstraints:
          "Include your real constraints, not just ideal outcomes.",
        tipConcrete: "Compare concrete options instead of vague directions.",
        tipPersonal: "Add success factors that matter personally to you.",
        viewPlans: "View plans",
        agents: "Agents",
        horizon: "Horizon",
        protected: "Protected",
      },

      optionHome: {
        title: "Stuck Between Options? Let the Debate Decide.",
        subtitle:
          "Enter your real question and the options you are torn between. Multiple AI roles will argue, stress-test, score, and declare which option wins.",
        badge1: "Option verdict engine",
        badge2: "Multi-role debate",
        badge3: "Winner-first answer",
        workflow:
          "Workflow: write the decision question, enter Option A and Option B, add more options if needed, then let the judge compare them and declare the strongest choice.",
      },

      optionInput: {
        questionLabel: "1. What are you trying to decide?",
        questionPlaceholder:
          "Example: Should I stay in my current job or go full-time on my product?",
        optionsLabel: "2. What options are you torn between?",
        optionPlaceholder: "Option {{label}}...",
        addOption: "Add another option",
        removeOption: "Remove option",
        analyze: "Analyze options and declare a winner",
        example: "Use example",
      },

      modelStatus: {
        title: "Model Runtime",
        live: "Live",
        offline: "Offline",
        keyPending: "Key pending",
        primary: "Primary",
        light: "Light",
        keyHint:
          "Add `DEEPSEEK_API_KEY` on the server to enable live analysis.",
      },

      verdict: {
        title: "Final Option Verdict",
        subtitle:
          "The answer is ranked by option, with the winning choice amplified first.",
        executiveBrief: "Executive verdict",
        confidence: "Confidence",
        share: "Share",
        winner: "Winner",
        winnerShort: "Winner",
        bestChoice: "Best choice",
        beats: "beats",
        finalScore: "Final score",
        optionScore: "Option score",
        rank: "Rank",
        pros: "Pros",
        cons: "Cons",
        debate: "Role debate",
        nextSteps: "Next steps",
        step: "Step",
        reminderTitle: "Use the verdict to move, not to reopen the dilemma.",
        reminder:
          "The best next action is to test the winning option with one clear checkpoint.",
      },

      // Decision Input
      input: {
        title: "Strategic Input",
        description: "Define your decision parameters for deep AI simulation",
        quickStarts: "Quick starts",
        phase: "Phase",
        coreTitle: "Core Decision & Options",
        coreDescription: "What is the primary choice you are facing?",
        decisionLabel: "Decision Description",
        decisionPlaceholder:
          "E.g., Should I leave my stable corporate job to start a FinTech startup?",
        optionsTitle: "Options to Compare",
        ready: "ready",
        option: "Option",
        addOption: "Add Comparison Option",
        optionPlaceholder: "Describe this option...",
        dimensionsTitle: "Analysis Dimensions",
        dimensionsDescription:
          "Select the areas of life this decision will impact most",
        dimension: {
          financial: "Financial Impact",
          career: "Career Development",
          lifestyle: "Life Quality",
          relationships: "Relationships",
          health: "Health & Wellbeing",
          time: "Time Investment",
        },
        timeframe: "Time Horizon",
        timeframeHelp:
          "Determines the depth of temporal simulation and causal chain tracing.",
        timeframeOptions: {
          short: "Short Term (0-1 Year)",
          medium: "Medium Term (1-5 Years)",
          long: "Long Term (5-10+ Years)",
        },
        riskProfile: "Risk Tolerance",
        riskHelp:
          "Influences the weighting of downside risks vs. upside potential in the final report.",
        riskOptions: {
          conservative: "Conservative (Risk Averse)",
          balanced: "Balanced (Prudent)",
          aggressive: "Aggressive (Opportunity Focused)",
        },
        customFactorsTitle: "Custom Success Factors",
        customFactorsDescription:
          "Add specific goals or constraints unique to your situation.",
        customFactorPlaceholder:
          "E.g., Distance from family, Company culture...",
        addCustomFactor: "Add Custom Factor",
        analyze: "Run Strategic Simulation",
        analyzing: "Initializing AI Agents...",
        inputQuality: "Input quality",
        multiAgent: "Multi-Agent Synthesis",
        hints: {
          describeDecision: "Describe the decision first",
          completeOptions: "Complete every comparison option",
          selectDimension: "Select at least one dimension",
          ready: "Ready for simulation",
        },
      },

      // Progress
      progress: {
        engineActive: "Neural Engine Active",
        analyzing: "Strategic Simulation in Progress",
        description:
          "Orchestrating multiple AI agents for deep causal analysis...",
        overall: "Overall Completion",
        estimatedTime: "Estimated time: 45-60 seconds",
        pipeline: "Pipeline Status",
        remaining: "Estimated Time Remaining",
        liveReasoning: "Live Multi-Agent Reasoning",
        realTime: "Real-time Stream",
        initializingKnowledge: "Initializing Knowledge Base...",
        highCompute: "High-Compute Mode",
        encrypted: "Encrypted Session",
        processing: "Processing neural weights",
      },

      // Results
      results: {
        title: "Strategic Analysis Report",
        comparison: "Comparative Overview",
        recommendation: "AI Recommendation",
        overallScore: "Overall Score",
        cascadeEffects: "Cascade Effects Analysis",
        firstOrder: "Direct Impact",
        secondOrder: "Indirect Effects",
        thirdOrder: "Long-term Consequences",
        scenarios: "Future Scenario Analysis",
        bestCase: "Best Case",
        mostLikely: "Most Likely",
        worstCase: "Worst Case",
        probability: "Probability",
        keyUncertainties: "Key Uncertainties",
        dimensionScores: "Dimension Breakdown",
        export: "Export Report",
        startNew: "New Analysis",
      },

      // History
      history: {
        title: "Decision History",
        subtitle: "Review and manage your past strategic analyses",
        search: "Search past decisions...",
        noHistory: "No history found",
        newAnalysis: "Start Your First Analysis",
        savedAnalyses: "Saved analyses",
        avgConfidence: "Avg confidence",
        memory: "Decision memory",
        memoryDescription: "Stored locally on this browser",
        confidence: "Confidence",
        recommendation: "Recommendation",
        noSearchResults: "No decisions match your search criteria.",
        emptyDescription: "You haven't performed any strategic analyses yet.",
        firstAnalysis: "Start Your First Analysis",
      },

      // Common
      common: {
        loading: "Loading Neural Engine...",
        error: "System Error",
        retry: "Retry Analysis",
        cancel: "Cancel",
        confirm: "Confirm",
        close: "Close",
      },

      // Footer
      footer: {
        tagline: "Predict the future, make better decisions",
        copyright: "© 2026 DecisionSimulator AI. All rights reserved.",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        support: "Contact Support",
      },
    },
  },
  zh: {
    translation: {
      // 导航
      nav: {
        home: "首页",
        about: "关于",
        pricing: "价格",
        history: "历史记录",
        newAnalysis: "新建分析",
        upgrade: "升级专业版",
      },

      // 主页标题
      hero: {
        title: "预见未来，智慧抉择",
        homeTitle: "智慧决策，预见未来",
        homeSubtitle:
          "把复杂选择转化为清晰的选项排序、未来情景、风险缓释计划和可执行行动简报。",
        subtitle:
          "企业级决策情报平台。通过多 Agent AI 模拟和深度因果建模预测复杂决策走向。",
        cta: "开始分析",
        learnMore: "了解更多",
      },

      home: {
        badgeDeepSeek: "服务端 DeepSeek v4",
        badgeRouting: "Pro 推理 + Flash 路由",
        badgeReport: "报告级综合分析",
        readiness: "准备度",
        decisionOS: "决策系统",
        inputClarity: "输入清晰度",
        analysisStack: "分析栈",
        strategicReasoning: "战略推理",
        strategicReasoningDesc: "v4pro 负责综合、辩论、博弈论和最终建议。",
        fastPasses: "快速结构化分析",
        fastPassesDesc: "v4flash 负责概率、时间线、维度和风险抽取。",
        reportReady: "报告级输出",
        reportReadyDesc: "每次分析都会保存建议、置信度和可复用的历史记录。",
        goodInputs: "输入越清晰，报告越可靠",
        tipConstraints: "写出现实约束，而不只是理想结果。",
        tipConcrete: "比较具体选项，而不是模糊方向。",
        tipPersonal: "加入真正影响你个人判断的成功因素。",
        viewPlans: "查看方案",
        agents: "智能体",
        horizon: "周期",
        protected: "受保护",
      },

      optionHome: {
        title: "纠结多个选项？让辩论给出裁决。",
        subtitle:
          "输入你的真实问题和正在纠结的选项。多个 AI 角色会辩论、质疑、打分，最后直接告诉你哪个选项胜出。",
        badge1: "选项裁决引擎",
        badge2: "多角色辩论",
        badge3: "赢家优先呈现",
        workflow:
          "使用流程：写下决策问题，输入选项 A 和选项 B，需要时添加更多选项，然后让裁判比较它们并选出最强方案。",
      },

      optionInput: {
        questionLabel: "1. 你正在纠结什么问题？",
        questionPlaceholder: "例如：我应该继续上班，还是全职投入自己的产品？",
        optionsLabel: "2. 你在几个选项之间纠结？",
        optionPlaceholder: "选项 {{label}}...",
        addOption: "添加更多选项",
        removeOption: "删除选项",
        analyze: "分析选项并给出赢家",
        example: "使用示例",
      },

      modelStatus: {
        title: "模型运行状态",
        live: "在线",
        offline: "离线",
        keyPending: "等待密钥",
        primary: "主力模型",
        light: "轻量模型",
        keyHint: "在服务端添加 `DEEPSEEK_API_KEY` 后即可启用实时分析。",
      },

      verdict: {
        title: "最终选项裁决",
        subtitle: "答案按选项排名，并把胜出的选择放在最醒目的位置。",
        executiveBrief: "裁决摘要",
        confidence: "置信度",
        share: "分享",
        winner: "胜出选项",
        winnerShort: "赢家",
        bestChoice: "最佳选择",
        beats: "胜过",
        finalScore: "最终得分",
        optionScore: "选项得分",
        rank: "排名",
        pros: "优点",
        cons: "缺点",
        debate: "角色辩论",
        nextSteps: "下一步",
        step: "步骤",
        reminderTitle: "用裁决推动行动，而不是重新打开纠结。",
        reminder: "最好的下一步，是用一个明确检查点去测试胜出选项。",
      },

      // 决策输入
      input: {
        title: "战略输入",
        description: "定义决策参数，进行深度 AI 模拟",
        quickStarts: "快速开始",
        phase: "阶段",
        coreTitle: "核心决策与选项",
        coreDescription: "你现在主要要做出的选择是什么？",
        decisionLabel: "决策描述",
        decisionPlaceholder:
          "例如：我是否应该辞去稳定的工作去创办一家金融科技公司？",
        optionsTitle: "对比选项",
        ready: "已完成",
        option: "选项",
        addOption: "添加对比选项",
        optionPlaceholder: "描述此选项...",
        dimensionsTitle: "分析维度",
        dimensionsDescription: "选择这个决策最可能影响的生活和事业维度",
        dimension: {
          financial: "财务影响",
          career: "职业发展",
          lifestyle: "生活质量",
          relationships: "人际关系",
          health: "健康状况",
          time: "时间投入",
        },
        timeframe: "时间跨度",
        timeframeHelp: "决定时间线模拟和因果链追踪的深度。",
        timeframeOptions: {
          short: "短期 (0-1 年)",
          medium: "中期 (1-5 年)",
          long: "长期 (5-10+ 年)",
        },
        riskProfile: "风险偏好",
        riskHelp: "影响最终报告中下行风险与上行机会的权重。",
        riskOptions: {
          conservative: "保守型 (风险规避)",
          balanced: "平衡型 (审慎)",
          aggressive: "激进型 (机会导向)",
        },
        customFactorsTitle: "自定义成功因素",
        customFactorsDescription: "添加针对您个人情况的特定目标或约束。",
        customFactorPlaceholder: "例如：离家距离、公司文化...",
        addCustomFactor: "添加自定义因素",
        analyze: "运行战略模拟",
        analyzing: "正在初始化 AI 代理...",
        inputQuality: "输入质量",
        multiAgent: "多智能体综合",
        hints: {
          describeDecision: "请先描述决策",
          completeOptions: "请补全所有对比选项",
          selectDimension: "请至少选择一个分析维度",
          ready: "可以开始模拟",
        },
      },

      // 进度
      progress: {
        engineActive: "神经引擎运行中",
        analyzing: "战略模拟进行中",
        description: "正在协调多个 AI 代理进行深度因果分析...",
        overall: "总体完成度",
        estimatedTime: "预计时间：45-60 秒",
        pipeline: "流程状态",
        remaining: "预计剩余时间",
        liveReasoning: "多智能体实时推理",
        realTime: "实时流",
        initializingKnowledge: "正在初始化知识库...",
        highCompute: "高算力模式",
        encrypted: "加密会话",
        processing: "正在处理神经权重",
      },

      // 结果
      results: {
        title: "战略分析报告",
        comparison: "对比概览",
        recommendation: "AI 建议",
        overallScore: "综合评分",
        cascadeEffects: "级联效应分析",
        firstOrder: "直接影响",
        secondOrder: "间接效应",
        thirdOrder: "长期后果",
        scenarios: "未来情景分析",
        bestCase: "最好情况",
        mostLikely: "最可能情况",
        worstCase: "最坏情况",
        probability: "概率",
        keyUncertainties: "关键不确定性",
        dimensionScores: "维度分解",
        export: "导出报告",
        startNew: "新建分析",
      },

      // 历史记录
      history: {
        title: "决策历史",
        subtitle: "回顾和管理您过去的战略分析",
        search: "搜索过去的决策...",
        noHistory: "未找到历史记录",
        newAnalysis: "新建分析",
        savedAnalyses: "已保存分析",
        avgConfidence: "平均置信度",
        memory: "决策记忆",
        memoryDescription: "保存在当前浏览器本地",
        confidence: "置信度",
        recommendation: "建议",
        noSearchResults: "没有匹配搜索条件的决策。",
        emptyDescription: "你还没有进行过战略分析。",
        firstAnalysis: "开始第一次分析",
      },

      // 通用
      common: {
        loading: "正在加载神经引擎...",
        error: "系统错误",
        retry: "重试分析",
        cancel: "取消",
        confirm: "确认",
        close: "关闭",
      },

      // 页脚
      footer: {
        tagline: "预测未来，做出更好的决定",
        copyright: "© 2026 DecisionSimulator AI。保留所有权利。",
        privacy: "隐私政策",
        terms: "服务条款",
        support: "联系支持",
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
