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
      },
      
      // Hero Section
      hero: {
        title: 'See Your Future, Choose Wisely',
        subtitle: 'AI-powered decision analysis platform that helps you predict complex decision outcomes through multi-dimensional analysis and visualization',
        cta: 'Start Analysis',
        learnMore: 'Learn More',
      },
      
      // Decision Input
      input: {
        title: 'Describe Your Decision',
        decisionLabel: 'What decision are you facing?',
        decisionPlaceholder: 'E.g., Should I accept a job offer from a competitor company?',
        optionsTitle: 'Your Options',
        addOption: 'Add Option',
        optionPlaceholder: 'Describe this option...',
        dimensionsTitle: 'What matters to you?',
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
          short: 'Short-term (< 1 year)',
          medium: 'Medium-term (1-5 years)',
          long: 'Long-term (5+ years)',
        },
        riskProfile: 'Risk Preference',
        riskOptions: {
          conservative: 'Conservative',
          balanced: 'Balanced',
          aggressive: 'Aggressive',
        },
        customFactorsTitle: 'Other Important Factors',
        customFactorsDescription: 'Please enter other important factors you think should be considered. This will help AI analyze your decision more comprehensively.',
        customFactorPlaceholder: 'E.g., Distance from family, Company culture, Industry prospects...',
        addCustomFactor: 'Add Factor',
        analyze: 'Analyze Decision',
        analyzing: 'Analyzing...',
      },
      
      // Progress
      progress: {
        analyzing: 'Analyzing Your Decision',
        description: 'Our AI agents are working together to provide comprehensive analysis...',
        overall: 'Overall Progress',
        estimatedTime: 'Estimated time: 30-60 seconds',
      },
      
      // Results
      results: {
        title: 'Analysis Results',
        overallScore: 'Overall Score',
        cascadeEffects: 'Cascade Effects',
        firstOrder: 'Direct Impact',
        secondOrder: 'Indirect Effects',
        thirdOrder: 'Long-term Consequences',
        scenarios: 'Possible Scenarios',
        bestCase: 'Best Case',
        mostLikely: 'Most Likely',
        worstCase: 'Worst Case',
        probability: 'Probability',
        keyUncertainties: 'Key Uncertainties',
        dimensionScores: 'Multi-dimensional Analysis',
        exportPDF: 'Export Report',
        startNew: 'New Analysis',
      },
      
      // Common
      common: {
        loading: 'Loading...',
        error: 'Error',
        retry: 'Retry',
        cancel: 'Cancel',
        confirm: 'Confirm',
        close: 'Close',
      },
      
      // Footer
      footer: {
        tagline: 'Predict the future, make better decisions',
        copyright: '© 2025 Decision Simulator. All rights reserved.',
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
      },
      
      // 主页标题
      hero: {
        title: '预见未来,智慧抉择',
        subtitle: 'AI驱动的决策分析平台,通过多维度分析和可视化帮助您预测复杂决策的发展走向',
        cta: '开始分析',
        learnMore: '了解更多',
      },
      
      // 决策输入
      input: {
        title: '描述您的决策',
        decisionLabel: '您面临什么决策?',
        decisionPlaceholder: '例如:我是否应该接受竞争对手公司的工作邀请?',
        optionsTitle: '您的选项',
        addOption: '添加选项',
        optionPlaceholder: '描述这个选项...',
        dimensionsTitle: '您关注什么?',
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
          short: '短期 (< 1年)',
          medium: '中期 (1-5年)',
          long: '长期 (5年以上)',
        },
        riskProfile: '风险偏好',
        riskOptions: {
          conservative: '保守型',
          balanced: '平衡型',
          aggressive: '激进型',
        },
        customFactorsTitle: '其他重要因素',
        customFactorsDescription: '请输入您认为需要考虑的其他重要因素，这将帮助AI更全面地分析您的决策。',
        customFactorPlaceholder: '例如：家庭距离、公司文化、行业前景...',
        addCustomFactor: '添加因素',
        analyze: '分析决策',
        analyzing: '分析中...',
      },
      
      // 进度
      progress: {
        analyzing: '正在分析您的决策',
        description: '我们的AI代理正在协同工作，为您提供全面的分析...',
        overall: '总体进度',
        estimatedTime: '预计时间：30-60秒',
      },
      
      // 结果
      results: {
        title: '分析结果',
        overallScore: '综合评分',
        cascadeEffects: '级联效应',
        firstOrder: '直接影响',
        secondOrder: '间接效应',
        thirdOrder: '长期后果',
        scenarios: '可能场景',
        bestCase: '最好情况',
        mostLikely: '最可能情况',
        worstCase: '最坏情况',
        probability: '概率',
        keyUncertainties: '关键不确定性',
        dimensionScores: '多维度分析',
        exportPDF: '导出报告',
        startNew: '新建分析',
      },
      
      // 通用
      common: {
        loading: '加载中...',
        error: '错误',
        retry: '重试',
        cancel: '取消',
        confirm: '确认',
        close: '关闭',
      },
      
      // 页脚
      footer: {
        tagline: '预测未来,做出更好的决定',
        copyright: '© 2025 决策模拟器。保留所有权利。',
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

