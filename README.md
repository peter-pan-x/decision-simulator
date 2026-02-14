# Decision Simulator / 决策模拟器

> **See Your Future, Choose Wisely** | **预见未来,智慧抉择**

An AI-powered decision analysis platform that helps you predict complex decision outcomes through multi-dimensional analysis and visualization.

一个由AI驱动的决策分析平台,通过多维度分析和可视化帮助您预测复杂决策的结果。

![Decision Simulator](https://img.shields.io/badge/AI-Powered-blue) ![React](https://img.shields.io/badge/React-19-61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)

---

## ✨ Features / 功能特性

### 🧠 Multi-AI Collaboration Engine / 多AI协作引擎

Six specialized AI agents working together to analyze your decisions:

六个专业AI代理协同工作分析您的决策:

1. **Decision Deconstructor** - Builds causal relationship networks / 构建因果关系网络
2. **Probability Calculator** - Bayesian inference and probability distribution / 贝叶斯推理和概率分布
3. **Timeline Simulator** - Simulates decision evolution over time / 模拟决策随时间演化
4. **Multi-dimensional Evaluator** - Deep analysis across 6 dimensions / 6个维度的深度分析
5. **Risk Analyst** - Identifies risks and uncertainties / 识别风险和不确定性
6. **Decision Coordinator** - Synthesizes all analyses into final report / 综合所有分析生成最终报告

### 📊 Advanced Visualization / 高级可视化

- **Interactive Flow Charts** - Visualize butterfly effects and cascade impacts / 可视化蝴蝶效应和级联影响
- **Radar Charts** - Compare options across multiple dimensions / 多维度对比选项
- **Timeline Diagrams** - See how decisions unfold over time / 查看决策如何随时间展开
- **Probability Distributions** - Understand likelihood of different outcomes / 了解不同结果的可能性

### 🌍 International / 国际化

- Full bilingual support (English & Chinese) / 完整的双语支持(英文和中文)
- Language switcher in the top-right corner / 右上角语言切换器
- Auto-detect browser language / 自动检测浏览器语言

### 🎯 Multi-dimensional Analysis / 多维度分析

Evaluate decisions across 6 key dimensions:

从6个关键维度评估决策:

- 💰 Financial Impact / 财务影响
- 📈 Career Development / 职业发展
- 🏡 Life Quality / 生活质量
- 👥 Relationships / 人际关系
- 💪 Health & Wellbeing / 健康状况
- ⏰ Time Investment / 时间投入

---

## 🚀 Quick Start / 快速开始

### Prerequisites / 前置要求

- Node.js 18+ 
- pnpm 8+
- OpenAI API Key
- Google Gemini API Key

### Installation / 安装

```bash
# Clone the repository / 克隆仓库
git clone https://github.com/peter-pan-x/decision-simulator.git
cd decision-simulator

# Install dependencies / 安装依赖
pnpm install

# Set up environment variables / 设置环境变量
cp .env.example .env
# Edit .env and add your API keys / 编辑.env并添加您的API密钥

# Start development server / 启动开发服务器
pnpm dev

# (Recommended for secure AI proxy in development)
# Terminal 1: frontend dev server
pnpm dev
# Terminal 2: AI proxy server
pnpm dev:server
```

### Environment Variables / 环境变量

Create a `.env` file in the root directory:

在根目录创建`.env`文件:

```bash
# Recommended (server-side, safer)
OPENAI_API_KEY=your_openai_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here

# AI runtime behavior
VITE_USE_MOCK_AI=false
VITE_ENABLE_BROWSER_AI=false
VITE_AI_PROXY_URL=/api/ai

# Optional (browser direct mode, NOT recommended for production)
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

> Security note / 安全提示：
> - Keep `VITE_ENABLE_BROWSER_AI=false` in production to avoid exposing API keys in browser bundles.
> - Prefer server-side keys (`OPENAI_API_KEY`, `GEMINI_API_KEY`) with the built-in proxy endpoints.

---

## 📖 How to Use / 使用方法

1. **Describe Your Decision** / 描述您的决策
   - Enter the decision you're facing / 输入您面临的决策

2. **Add Options** / 添加选项
   - List 2-5 possible choices / 列出2-5个可能的选择

3. **Select Dimensions** / 选择维度
   - Choose which aspects matter most to you / 选择对您最重要的方面

4. **Set Parameters** / 设置参数
   - Time horizon (short/medium/long-term) / 时间跨度(短期/中期/长期)
   - Risk preference (conservative/balanced/aggressive) / 风险偏好(保守/平衡/激进)

5. **Analyze** / 分析
   - Click "Analyze Decision" and wait for AI processing / 点击"分析决策"并等待AI处理

6. **Review Results** / 查看结果
   - Explore flow charts, radar charts, and detailed reports / 浏览流程图、雷达图和详细报告
   - Export PDF report (coming soon) / 导出PDF报告(即将推出)

---

## 🏗️ Tech Stack / 技术栈

### Frontend / 前端
- **React 19** - UI framework / UI框架
- **TypeScript** - Type safety / 类型安全
- **Tailwind CSS 4** - Styling / 样式
- **shadcn/ui** - Component library / 组件库
- **ReactFlow** - Flow chart visualization / 流程图可视化
- **Recharts** - Chart library / 图表库
- **i18next** - Internationalization / 国际化

### AI Integration / AI集成
- **OpenAI GPT-4** - Main reasoning engine / 主推理引擎
- **Google Gemini** - Multi-dimensional analysis / 多维度分析

### Build Tools / 构建工具
- **Vite** - Build tool / 构建工具
- **pnpm** - Package manager / 包管理器

---

## 📁 Project Structure / 项目结构

```
decision-simulator/
├── client/
│   ├── src/
│   │   ├── components/       # UI components / UI组件
│   │   ├── lib/
│   │   │   ├── aiAgents/    # AI agent implementations / AI代理实现
│   │   │   ├── aiConfig.ts  # AI configuration / AI配置
│   │   │   └── decisionEngine.ts  # Legacy engine / 旧版引擎
│   │   ├── i18n/            # Internationalization / 国际化
│   │   ├── pages/           # Page components / 页面组件
│   │   └── App.tsx          # Main app / 主应用
│   └── public/              # Static assets / 静态资源
├── .env                     # Environment variables / 环境变量
└── README.md               # This file / 本文件
```

---

## 🔮 Roadmap / 路线图

### Current Features / 当前功能
- ✅ Multi-AI collaboration engine / 多AI协作引擎
- ✅ Interactive flow charts / 交互式流程图
- ✅ Multi-dimensional analysis / 多维度分析
- ✅ Bilingual support / 双语支持
- ✅ Risk assessment / 风险评估

### Upcoming Features / 即将推出
- 🔄 User authentication / 用户认证
- 🔄 Decision history / 决策历史
- 🔄 PDF export / PDF导出
- 🔄 Email notifications / 邮件通知
- 🔄 AI image generation (optional) / AI图像生成(可选)
- 🔄 Collaborative decision making / 协作决策

---

## 🤝 Contributing / 贡献

Contributions are welcome! Please feel free to submit a Pull Request.

欢迎贡献!请随时提交Pull Request。

---

## 📄 License / 许可证

MIT License - see LICENSE file for details

MIT许可证 - 详见LICENSE文件

---

## 🙏 Acknowledgments / 致谢

- OpenAI for GPT-4 API / OpenAI提供的GPT-4 API
- Google for Gemini API / Google提供的Gemini API
- React Flow for flow chart visualization / React Flow提供的流程图可视化
- shadcn/ui for beautiful components / shadcn/ui提供的精美组件

---

## 📧 Contact / 联系方式

For questions or feedback, please open an issue on GitHub.

如有问题或反馈,请在GitHub上提交issue。

---

**Built with ❤️ by the Decision Simulator team**

**由Decision Simulator团队用❤️构建**

