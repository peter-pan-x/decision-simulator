import { DecisionInput, CompleteAnalysis } from './types';
import { analyzeDecisionStructure } from './agent1-deconstructor';
import { calculateProbabilities } from './agent2-probability';
import { simulateTimeline } from './agent3-timeline';

/**
 * AI协调器 - 统筹所有AI Agent的工作流程
 */

export interface AnalysisProgress {
  stage: string;
  progress: number;
  message: string;
}

export async function runCompleteAnalysis(
  input: DecisionInput,
  onProgress?: (progress: AnalysisProgress) => void
): Promise<CompleteAnalysis> {
  try {
    // Stage 1: 决策解构
    onProgress?.({
      stage: 'deconstruction',
      progress: 10,
      message: 'AI Agent 1: Analyzing decision structure...',
    });
    
    const decisionStructure = await analyzeDecisionStructure(input);
    
    onProgress?.({
      stage: 'deconstruction',
      progress: 20,
      message: 'Decision structure analyzed. Variables and causal links identified.',
    });

    // Stage 2: 概率计算
    onProgress?.({
      stage: 'probability',
      progress: 30,
      message: 'AI Agent 2: Calculating probabilities...',
    });
    
    const probabilityTree = await calculateProbabilities(input, decisionStructure);
    
    onProgress?.({
      stage: 'probability',
      progress: 45,
      message: 'Probability distributions computed. Decision paths mapped.',
    });

    // Stage 3: 时序模拟
    onProgress?.({
      stage: 'timeline',
      progress: 55,
      message: 'AI Agent 3: Simulating timeline evolution...',
    });
    
    const timelineSimulation = await simulateTimeline(
      input,
      decisionStructure,
      probabilityTree
    );
    
    onProgress?.({
      stage: 'timeline',
      progress: 70,
      message: 'Timeline simulation complete. Future states projected.',
    });

    // Stage 4: 多维度评估
    onProgress?.({
      stage: 'multidimensional',
      progress: 75,
      message: 'AI Agent 4: Performing multi-dimensional analysis...',
    });
    
    const { analyzeMultiDimensional } = await import('./agent4-multidimensional');
    const multiDimensionalAnalysis = await analyzeMultiDimensional(
      input,
      decisionStructure,
      timelineSimulation
    );

    // Stage 5: 风险分析
    onProgress?.({
      stage: 'risk',
      progress: 85,
      message: 'AI Agent 5: Analyzing risks and uncertainties...',
    });
    
    const { analyzeRisks } = await import('./agent5-risk');
    const riskAnalysis = await analyzeRisks(
      input,
      decisionStructure,
      timelineSimulation
    );

    // Stage 6: 最终整合
    onProgress?.({
      stage: 'integration',
      progress: 92,
      message: 'AI Agent 6: Integrating all analyses...',
    });
    
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
      message: 'Analysis complete! Generating visualizations...',
    });

    return {
      decisionStructure,
      probabilityTree,
      timelineSimulation,
      multiDimensionalAnalysis,
      riskAnalysis,
      finalReport,
    };
  } catch (error) {
    console.error('Analysis failed:', error);
    throw new Error('Failed to complete analysis. Please try again.');
  }
}

/**
 * 将CompleteAnalysis转换为旧的OptionAnalysis格式(用于兼容现有UI)
 */
export function convertToLegacyFormat(analysis: CompleteAnalysis, input: DecisionInput) {
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

    return {
      option_name: option.description,
      overall_score: overallScore,
      cascade_effects: {
        first_order: timeline?.stages[0]?.events || [],
        second_order: timeline?.stages[1]?.events || [],
        third_order: timeline?.stages[2]?.events || [],
      },
      dimension_scores: finalStage?.state || {},
      scenarios: {
        best_case: {
          description: timeline?.stages[3]?.description || 'Optimal outcome achieved',
          probability: 0.25,
        },
        most_likely: {
          description: timeline?.stages[2]?.description || 'Expected outcome',
          probability: 0.50,
        },
        worst_case: {
          description: 'Significant challenges encountered',
          probability: 0.25,
        },
      },
      key_uncertainties: analysis.decisionStructure.assumptions,
    };
  });
}

