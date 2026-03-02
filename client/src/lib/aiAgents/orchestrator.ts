import { DecisionInput, CompleteAnalysis, DebateLog } from './types';
import { analyzeDecisionStructure } from './agent1-deconstructor';
import { calculateProbabilities } from './agent2-probability';
import { simulateTimeline } from './agent3-timeline';
import { runDialecticalAnalysis } from './agent-dialectical';
import { analyzeGameTheory, analyzeAdvancedScenarios, analyzeCausalChains } from './agent-advanced-reasoning';
import { OptionAnalysis } from '@/components/AnalysisResults';

/**
 * AI协调器 - 统筹所有AI Agent的工作流程
 */

export interface AnalysisProgress {
  stage: string;
  progress: number;
  message: string;
  logs?: DebateLog[];
}

// 添加延迟以增加仪式感
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function runCompleteAnalysis(
  input: DecisionInput,
  onProgress?: (progress: AnalysisProgress) => void
): Promise<CompleteAnalysis> {
  const allLogs: DebateLog[] = [];
  const handleLog = (log: DebateLog) => {
    allLogs.push(log);
    onProgress?.({
      stage: 'dialectical',
      progress: 50, // This is a rough estimate
      message: `[${log.agent}] ${log.message}`,
      logs: [...allLogs]
    });
  };

  try {
    // Stage 1: 决策解构
    onProgress?.({
      stage: 'deconstruction',
      progress: 5,
      message: 'Initializing AI Agent 1: Decision Deconstructor...',
      logs: [...allLogs]
    });
    await delay(1500); // Increased delay for "ceremony"
    
    onProgress?.({
      stage: 'deconstruction',
      progress: 10,
      message: 'Parsing decision context and extracting key variables...',
      logs: [...allLogs]
    });
    await delay(2000);
    
    const decisionStructure = await analyzeDecisionStructure(input);
    
    onProgress?.({
      stage: 'deconstruction',
      progress: 15,
      message: 'Building causal relationship network...',
      logs: [...allLogs]
    });
    await delay(2500);
    
    // Stage 2: 辩证式推演 (New Phase)
    onProgress?.({
      stage: 'dialectical',
      progress: 20,
      message: 'Initiating Multi-Agent Dialectical Debate...',
      logs: [...allLogs]
    });
    await delay(1500);

    const dialecticalResult = await runDialecticalAnalysis(input, handleLog);
    
    // Stage 2.5: Advanced Reasoning
    onProgress?.({
      stage: 'dialectical',
      progress: 25,
      message: 'Running advanced reasoning: Game Theory Analysis...',
      logs: [...allLogs]
    });
    await delay(2000);
    
    const gameTheoryResult = await analyzeGameTheory(input, decisionStructure, handleLog);
    
    onProgress?.({
      stage: 'dialectical',
      progress: 30,
      message: 'Running advanced reasoning: Scenario Planning...',
      logs: [...allLogs]
    });
    await delay(2000);
    
    const scenarioResult = await analyzeAdvancedScenarios(input, decisionStructure, handleLog);
    
    onProgress?.({
      stage: 'dialectical',
      progress: 35,
      message: 'Running advanced reasoning: Causal Chain Analysis...',
      logs: [...allLogs]
    });
    await delay(2000);
    
    const causalResult = await analyzeCausalChains(input, decisionStructure, handleLog);
    
    // Stage 3: 概率计算
    onProgress?.({
      stage: 'probability',
      progress: 40,
      message: 'Initializing AI Agent 2: Probability Calculator...',
      logs: [...allLogs]
    });
    await delay(2000);
    
    const probabilityTree = await calculateProbabilities(input, decisionStructure);
    
    onProgress?.({
      stage: 'probability',
      progress: 50,
      message: 'Running Monte Carlo simulations (10,000 iterations)...',
      logs: [...allLogs]
    });
    await delay(3000);
    
    // Stage 4: 时序模拟
    onProgress?.({
      stage: 'timeline',
      progress: 60,
      message: 'Modeling decision evolution over time...',
      logs: [...allLogs]
    });
    await delay(2500);
    
    const timelineSimulation = await simulateTimeline(
      input,
      decisionStructure,
      probabilityTree
    );
    
    // Stage 5: 多维度评估
    onProgress?.({
      stage: 'multidimensional',
      progress: 75,
      message: 'Evaluating across ' + input.dimensions.length + ' dimensions...',
      logs: [...allLogs]
    });
    await delay(2000);
    
    const { analyzeMultiDimensional } = await import('./agent4-multidimensional');
    const multiDimensionalAnalysis = await analyzeMultiDimensional(
      input,
      decisionStructure,
      timelineSimulation
    );
    
    // Stage 6: 风险分析
    onProgress?.({
      stage: 'risk',
      progress: 85,
      message: 'Identifying potential risks and failure points...',
      logs: [...allLogs]
    });
    await delay(2500);
    
    const { analyzeRisks } = await import('./agent5-risk');
    const riskAnalysis = await analyzeRisks(
      input,
      decisionStructure,
      timelineSimulation
    );
    
    // Stage 7: 最终整合
    onProgress?.({
      stage: 'integration',
      progress: 95,
      message: 'Synthesizing insights from all AI agents...',
      logs: [...allLogs]
    });
    await delay(3000);
    
    const { generateFinalReport } = await import('./agent6-coordinator');
    const finalReport = await generateFinalReport(
      input,
      decisionStructure,
      probabilityTree,
      timelineSimulation,
      multiDimensionalAnalysis,
      riskAnalysis
    );
    
    onProgress?.({
      stage: 'complete',
      progress: 100,
      message: 'Analysis complete! Preparing visualizations...',
      logs: [...allLogs]
    });
    await delay(1500);

    return {
      decisionStructure,
      probabilityTree,
      timelineSimulation,
      multiDimensionalAnalysis,
      riskAnalysis,
      finalReport,
      debateLogs: allLogs,
      gameTheory: gameTheoryResult,
      scenarios: scenarioResult.scenarios,
      causalChains: causalResult
    };
  } catch (error) {
    console.error('Analysis failed:', error);
    throw new Error('Failed to complete analysis. Please try again.');
  }
}

/**
 * 将CompleteAnalysis转换为旧的OptionAnalysis格式(用于兼容现有UI)
 */
export function convertToLegacyFormat(analysis: CompleteAnalysis, input: DecisionInput): OptionAnalysis[] {
  return input.options.map((option, index) => {
    const timeline = analysis.timelineSimulation.timelines[index];
    const finalStage = timeline?.stages[timeline.stages.length - 1];
    
    // 计算综合评分
    const overallScore = finalStage
      ? Math.round(
          Object.values(finalStage.state).reduce((sum, val) => sum + val, 0) /
            Object.values(finalStage.state).length
        )
      : 50 + Math.random() * 30;

    const dimensionScores = finalStage ? Object.entries(finalStage.state).map(([dim, score]) => ({
      dimension: dim,
      score: score,
      details: `Impact analysis for ${dim}`
    })) : [];

    return {
      optionId: option.id,
      optionName: option.description,
      overallScore: overallScore,
      dimensionScores: dimensionScores,
      pros: analysis.finalReport.recommendation.includes(option.description) ? ['High strategic alignment', 'Strong upside potential'] : ['Stable outcome', 'Predictable risks'],
      cons: overallScore < 60 ? ['Significant resource requirement', 'High opportunity cost'] : ['Minor operational risks'],
      bestFor: overallScore > 75 ? 'Optimal growth' : 'Risk mitigation',
      riskLevel: overallScore > 70 ? 'low' : overallScore > 40 ? 'medium' : 'high',
      cascadeEffects: {
        first_order: timeline?.stages[0]?.events || [],
        second_order: timeline?.stages[1]?.events || [],
        third_order: timeline?.stages[2]?.events || [],
      },
      key_uncertainties: analysis.decisionStructure.assumptions,
    };
  });
}
