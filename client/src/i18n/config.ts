import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        home: 'Home',
        about: 'About',
        pricing: 'Pricing',
        history: 'History',
        newAnalysis: 'New Analysis',
        upgrade: 'Upgrade to Pro',
      },
      
      // Hero Section
      hero: {
        title: 'See Your Future, Choose Wisely',
        subtitle: 'Enterprise-grade decision intelligence platform. Predict complex outcomes through multi-agent AI simulation and deep causal modeling.',
        cta: 'Start Analysis',
        learnMore: 'Learn More',
      },
      
      // Decision Input
      input: {
        title: 'Strategic Input',
        description: 'Define your decision parameters for deep AI simulation',
        decisionLabel: 'What decision are you facing?',
        decisionPlaceholder: 'E.g., Should I leave my stable corporate job to start a FinTech startup?',
        optionsTitle: 'Options to Compare',
        addOption: 'Add Comparison Option',
        optionPlaceholder: 'Describe this option...',
        dimensionsTitle: 'Analysis Dimensions',
        dimension: {
          financial: 'Financial Impact',
          career: 'Career Development',
          lifestyle: 'Life Quality',
          relationships: 'Relationships',
          health: 'Health & Wellbeing',
          time: 'Time Investment',
        },
        timeframe: 'Time Horizon',
        timeframeOptions: {
          short: 'Short Term (0-1 Year)',
          medium: 'Medium Term (1-5 Years)',
          long: 'Long Term (5-10+ Years)',
        },
        riskProfile: 'Risk Tolerance',
        riskOptions: {
          conservative: 'Conservative (Risk Averse)',
          balanced: 'Balanced (Prudent)',
          aggressive: 'Aggressive (Opportunity Focused)',
        },
        customFactorsTitle: 'Custom Success Factors',
        customFactorsDescription: 'Add specific goals or constraints unique to your situation.',
        customFactorPlaceholder: 'E.g., Distance from family, Company culture...',
        addCustomFactor: 'Add Custom Factor',
        analyze: 'Run Strategic Simulation',
        analyzing: 'Initializing AI Agents...',
      },
      
      // Progress
      progress: {
        analyzing: 'Strategic Simulation in Progress',
        description: 'Orchestrating multiple AI agents for deep causal analysis...',
        overall: 'Overall Completion',
        estimatedTime: 'Estimated time: 45-60 seconds',
      },
      
      // Results
      results: {
        title: 'Strategic Analysis Report',
        comparison: 'Comparative Overview',
        recommendation: 'AI Recommendation',
        overallScore: 'Overall Score',
        cascadeEffects: 'Cascade Effects Analysis',
        firstOrder: 'Direct Impact',
        secondOrder: 'Indirect Effects',
        thirdOrder: 'Long-term Consequences',
        scenarios: 'Future Scenario Analysis',
        bestCase: 'Best Case',
        mostLikely: 'Most Likely',
        worstCase: 'Worst Case',
        probability: 'Probability',
        keyUncertainties: 'Key Uncertainties',
        dimensionScores: 'Dimension Breakdown',
        export: 'Export Report',
        startNew: 'New Analysis',
      },
      
      // History
      history: {
        title: 'Decision History',
        subtitle: 'Review and manage your past strategic analyses',
        search: 'Search past decisions...',
        noHistory: 'No history found',
        newAnalysis: 'Start Your First Analysis',
      },
      
      // Common
      common: {
        loading: 'Loading Neural Engine...',
        error: 'System Error',
        retry: 'Retry Analysis',
        cancel: 'Cancel',
        confirm: 'Confirm',
        close: 'Close',
      },
      
      // Footer
      footer: {
        tagline: 'Predict the future, make better decisions',
        copyright: '© 2026 DecisionSimulator AI. All rights reserved.',
      },
    },
  },
  zh: {
    translation: {
      // 导航
      nav: {
        home: '首页',
        about: '关于',
        pricing: '价格',
        history: '历史记录',
        newAnalysis: '新建分析',
        upgrade: '升级专业版',
      },
      
      // 主页标题
      hero: {
        title: '预见未来，智慧抉择',
        subtitle: '企业级决策情报平台。通过多 Agent AI 模拟和深度因果建模预测复杂决策走向。',
        cta: '开始分析',
        learnMore: '了解更多',
      },
      
      // 决策输入
      input: {
        title: '战略输入',
        description: '定义决策参数，进行深度 AI 模拟',
        decisionLabel: '您面临什么决策？',
        decisionPlaceholder: '例如：我是否应该辞去稳定的工作去创办一家金融科技公司？',
        optionsTitle: '对比选项',
        addOption: '添加对比选项',
        optionPlaceholder: '描述此选项...',
        dimensionsTitle: '分析维度',
        dimension: {
          financial: '财务影响',
          career: '职业发展',
          lifestyle: '生活质量',
          relationships: '人际关系',
          health: '健康状况',
          time: '时间投入',
        },
        timeframe: '时间跨度',
        timeframeOptions: {
          short: '短期 (0-1 年)',
          medium: '中期 (1-5 年)',
          long: '长期 (5-10+ 年)',
        },
        riskProfile: '风险偏好',
        riskOptions: {
          conservative: '保守型 (风险规避)',
          balanced: '平衡型 (审慎)',
          aggressive: '激进型 (机会导向)',
        },
        customFactorsTitle: '自定义成功因素',
        customFactorsDescription: '添加针对您个人情况的特定目标或约束。',
        customFactorPlaceholder: '例如：离家距离、公司文化...',
        addCustomFactor: '添加自定义因素',
        analyze: '运行战略模拟',
        analyzing: '正在初始化 AI 代理...',
      },
      
      // 进度
      progress: {
        analyzing: '战略模拟进行中',
        description: '正在协调多个 AI 代理进行深度因果分析...',
        overall: '总体完成度',
        estimatedTime: '预计时间：45-60 秒',
      },
      
      // 结果
      results: {
        title: '战略分析报告',
        comparison: '对比概览',
        recommendation: 'AI 建议',
        overallScore: '综合评分',
        cascadeEffects: '级联效应分析',
        firstOrder: '直接影响',
        secondOrder: '间接效应',
        thirdOrder: '长期后果',
        scenarios: '未来情景分析',
        bestCase: '最好情况',
        mostLikely: '最可能情况',
        worstCase: '最坏情况',
        probability: '概率',
        keyUncertainties: '关键不确定性',
        dimensionScores: '维度分解',
        export: '导出报告',
        startNew: '新建分析',
      },
      
      // 历史记录
      history: {
        title: '决策历史',
        subtitle: '回顾和管理您过去的战略分析',
        search: '搜索过去的决策...',
        noHistory: '未找到历史记录',
        newAnalysis: '开始您的第一次分析',
      },
      
      // 通用
      common: {
        loading: '正在加载神经引擎...',
        error: '系统错误',
        retry: '重试分析',
        cancel: '取消',
        confirm: '确认',
        close: '关闭',
      },
      
      // 页脚
      footer: {
        tagline: '预测未来，做出更好的决定',
        copyright: '© 2026 DecisionSimulator AI。保留所有权利。',
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
