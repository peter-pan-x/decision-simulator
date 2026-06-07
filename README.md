# Decision Simulator / 决策模拟器

> **See Your Future, Choose Wisely** | **预见未来,智慧抉择**

An AI-powered decision analysis platform that turns complex choices into ranked options, risk controls, timelines, and report-ready recommendations.

一个由AI驱动的决策分析平台,将复杂选择转化为选项排名、风险控制、时间线和可交付的决策建议。

![Decision Simulator](https://img.shields.io/badge/AI-Powered-blue) ![React](https://img.shields.io/badge/React-19-61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)

---

## ✨ Features / 功能特性

### 🧠 DeepSeek Multi-Agent Engine / DeepSeek 多代理引擎

Specialized AI agents work together with DeepSeek v4 model routing:

多个专业AI代理通过 DeepSeek v4 模型路由协同分析您的决策:

1. **Decision Deconstructor** - Builds causal relationship networks with `deepseek-v4pro` / 使用 `deepseek-v4pro` 构建因果关系网络
2. **Probability Calculator** - Bayesian inference with `deepseek-v4flash` / 使用 `deepseek-v4flash` 进行贝叶斯推理
3. **Timeline Simulator** - Simulates decision evolution with `deepseek-v4flash` / 使用 `deepseek-v4flash` 模拟时间演化
4. **Dialectical Strategist** - Stress-tests optimism, downside risk, and synthesis with `deepseek-v4pro` / 使用 `deepseek-v4pro` 进行辩证推演
5. **Risk Analyst** - Identifies risks and mitigation plans with `deepseek-v4flash` / 使用 `deepseek-v4flash` 识别风险和缓释策略
6. **Decision Coordinator** - Synthesizes all analyses into a final report with `deepseek-v4pro` / 使用 `deepseek-v4pro` 综合生成最终报告

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
- DeepSeek API Key

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
```

### Environment Variables / 环境变量

Create a `.env` file in the root directory:

在根目录创建`.env`文件:

```bash
DEEPSEEK_API_KEY=your_deepseek_api_key_here
DEEPSEEK_BASE_URL=https://api.deepseek.com/v1
DEEPSEEK_PRO_MODEL=deepseek-v4pro
DEEPSEEK_FLASH_MODEL=deepseek-v4flash
VITE_AI_PROXY_PATH=/api/ai/chat
VITE_USE_MOCK_AI=false
```

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
   - Export a standalone HTML report / 导出独立 HTML 报告

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
- **DeepSeek v4pro** - Primary reasoning, debate, advanced analysis, and final reports / 主推理、辩证推演、高级分析和最终报告
- **DeepSeek v4flash** - Lightweight structured extraction, probability, timeline, dimension, and risk passes / 轻量结构化抽取、概率、时间线、维度和风险分析

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
- ✅ DeepSeek v4pro/v4flash routing / DeepSeek v4pro/v4flash 模型路由
- ✅ Interactive flow charts / 交互式流程图
- ✅ Multi-dimensional analysis / 多维度分析
- ✅ Bilingual support / 双语支持
- ✅ Risk assessment / 风险评估
- ✅ Decision history / 决策历史

### Upcoming Features / 即将推出
- 🔄 User authentication / 用户认证
- ✅ Standalone report export / 独立报告导出
- 🔄 Email notifications / 邮件通知
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

- DeepSeek for v4 model APIs / DeepSeek 提供的 v4 模型 API
- React Flow for flow chart visualization / React Flow提供的流程图可视化
- shadcn/ui for beautiful components / shadcn/ui提供的精美组件

---

## 📧 Contact / 联系方式

For questions or feedback, please open an issue on GitHub.

如有问题或反馈,请在GitHub上提交issue。

---

**Built with ❤️ by the Decision Simulator team**

**由Decision Simulator团队用❤️构建**
