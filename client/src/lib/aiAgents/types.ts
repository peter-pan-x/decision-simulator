// AI Agent 输入输出类型定义

export interface DecisionInput {
  question: string;
  options: Array<{ id: string; description: string }>;
  dimensions: string[];
  customFactors?: string[]; // 用户自定义的其他重要因素
  timeframe: string;
  riskProfile: string;
}

// Agent 1: 决策解构师输出
export interface DecisionStructure {
  variables: Variable[];
  causalLinks: CausalLink[];
  assumptions: string[];
  constraints: string[];
}

export interface Variable {
  id: string;
  name: string;
  type:
    | "financial"
    | "career"
    | "lifestyle"
    | "relationships"
    | "health"
    | "time"
    | "other";
  description: string;
  initialValue?: number;
}

export interface CausalLink {
  from: string; // variable id
  to: string; // variable id
  strength: number; // -1 to 1
  delay: number; // time delay in months
  description: string;
}

// Agent 2: 概率计算器输出
export interface ProbabilityTree {
  paths: DecisionPath[];
  distributions: ProbabilityDistribution[];
}

export interface DecisionPath {
  id: string;
  sequence: string[]; // sequence of events
  probability: number;
  outcome: string;
  expectedValue: number;
}

export interface ProbabilityDistribution {
  variable: string;
  distribution: Array<{ value: number; probability: number }>;
}

// Agent 3: 时序演化模拟器输出
export interface TimelineSimulation {
  timelines: Timeline[];
  keyMilestones: Milestone[];
  turningPoints: TurningPoint[];
}

export interface Timeline {
  optionId: string;
  stages: TimeStage[];
}

export interface TimeStage {
  timepoint: string; // '3_months' | '1_year' | '3_years' | '5_years'
  state: Record<string, number>; // variable values
  description: string;
  events: string[];
}

export interface Milestone {
  time: string;
  description: string;
  impact: number;
}

export interface TurningPoint {
  time: string;
  description: string;
  probability: number;
  consequences: string[];
}

// Agent 4: 多维度评估专家输出
export interface MultiDimensionalAnalysis {
  dimensions: DimensionScore[];
  tradeoffs: Tradeoff[];
  synergies: Synergy[];
}

export interface DimensionScore {
  dimension: string;
  score: number; // 0-100
  trend: "improving" | "stable" | "declining";
  details: string;
  subScores: Record<string, number>;
}

export interface Tradeoff {
  dimension1: string;
  dimension2: string;
  description: string;
  severity: number;
}

export interface Synergy {
  dimensions: string[];
  description: string;
  multiplier: number;
}

// Agent 5: 风险分析师输出
export interface RiskAnalysis {
  risks: Risk[];
  uncertainties: Uncertainty[];
  mitigationStrategies: MitigationStrategy[];
  worstCaseScenario: Scenario;
}

export interface Risk {
  id: string;
  type: "financial" | "career" | "health" | "relationship" | "other";
  description: string;
  probability: number;
  impact: number; // 1-10
  severity: "low" | "medium" | "high" | "critical";
  timeframe: string;
}

export interface Uncertainty {
  factor: string;
  description: string;
  impactRange: [number, number];
  controllability: number; // 0-1
}

export interface MitigationStrategy {
  riskId: string;
  strategy: string;
  effectiveness: number;
  cost: string;
}

export interface Scenario {
  description: string;
  probability: number;
  triggers: string[];
  consequences: string[];
}

// Agent 6: 决策协调者输出
export interface FinalDecisionReport {
  summary: string;
  optionRankings: OptionRanking[];
  recommendation: string;
  reasoning: string[];
  keyInsights: string[];
  actionPlan: ActionStep[];
  confidenceLevel: number;
}

export interface OptionRanking {
  optionId: string;
  optionName: string;
  overallScore: number;
  pros: string[];
  cons: string[];
  bestFor: string;
  winningReasons?: string[];
  losingReasons?: string[];
}

export interface ActionStep {
  step: number;
  action: string;
  timeframe: string;
  importance: "critical" | "high" | "medium" | "low";
}

// 辩证式推演
export interface DebateLog {
  agent: string;
  role: "optimist" | "cynic" | "synthesizer" | "futurist" | "coordinator";
  message: string;
  timestamp: number;
  thoughtProcess?: string;
}

// 高级推演结果
export interface GameTheoryResult {
  payoffMatrix: Record<string, Record<string, number>>;
  nashEquilibrium: string;
  strategicInsights: string[];
}

export interface ScenarioResult {
  name: string;
  probability: number;
  description: string;
  implications: string[];
}

export interface CausalChainResult {
  chains: string[][];
}

// 完整的分析结果
export interface CompleteAnalysis {
  decisionStructure: DecisionStructure;
  probabilityTree: ProbabilityTree;
  timelineSimulation: TimelineSimulation;
  multiDimensionalAnalysis: MultiDimensionalAnalysis;
  riskAnalysis: RiskAnalysis;
  finalReport: FinalDecisionReport;
  debateLogs?: DebateLog[];
  gameTheory?: GameTheoryResult;
  scenarios?: ScenarioResult[];
  causalChains?: CausalChainResult;
}
