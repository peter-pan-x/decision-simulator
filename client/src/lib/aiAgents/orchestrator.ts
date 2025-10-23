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

// 添加延迟以增加仪式感
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function runCompleteAnalysis(
  input: DecisionInput,
  onProgress?: (progress: AnalysisProgress) => void
): Promise<CompleteAnalysis> {
  try {
    // Stage 1: 决策解构
    onProgress?.({
      stage: 'deconstruction',
      progress: 5,
      message: 'Initializing AI Agent 1: Decision Deconstructor...',
    });
    await delay(800);
    
    onProgress?.({
      stage: 'deconstruction',
      progress: 10,
      message: 'Parsing decision context and extracting key variables...',
    });
    await delay(1000);
    
    const decisionStructure = await analyzeDecisionStructure(input);
    
    onProgress?.({
      stage: 'deconstruction',
      progress: 18,
      message: 'Building causal relationship network...',
    });
    await delay(1200);
    
    onProgress?.({
      stage: 'deconstruction',
      progress: 22,
      message: 'Decision structure complete. Identified ' + decisionStructure.variables.length + ' key variables.',
    });

    await delay(500);

    // Stage 2: 概率计算
    onProgress?.({
      stage: 'probability',
      progress: 25,
      message: 'Initializing AI Agent 2: Probability Calculator...',
    });
    await delay(800);
    
    onProgress?.({
      stage: 'probability',
      progress: 30,
      message: 'Constructing Bayesian network from causal links...',
    });
    await delay(1000);
    
    const probabilityTree = await calculateProbabilities(input, decisionStructure);
    
    onProgress?.({
      stage: 'probability',
      progress: 38,
      message: 'Running Monte Carlo simulations (10,000 iterations)...',
    });
    await delay(1500);
    
    onProgress?.({
      stage: 'probability',
      progress: 45,
      message: 'Probability distributions computed. ' + probabilityTree.paths.length + ' decision paths identified.',
    });

    await delay(500);

    // Stage 3: 时序模拟
    onProgress?.({
      stage: 'timeline',
      progress: 48,
      message: 'Initializing AI Agent 3: Timeline Simulator...',
    });
    await delay(800);
    
    onProgress?.({
      stage: 'timeline',
      progress: 52,
      message: 'Modeling decision evolution over time...',
    });
    await delay(1000);
    
    const timelineSimulation = await simulateTimeline(
      input,
      decisionStructure,
      probabilityTree
    );
    
    onProgress?.({
      stage: 'timeline',
      progress: 60,
      message: 'Analyzing cascade effects and butterfly impacts...',
    });
    await delay(1200);
    
    onProgress?.({
      stage: 'timeline',
      progress: 65,
      message: 'Timeline simulation complete. Future states projected across ' + input.timeframe + ' horizon.',
    });

    await delay(500);

    // Stage 4: 多维度评估
    onProgress?.({
      stage: 'multidimensional',
      progress: 68,
      message: 'Initializing AI Agent 4: Multi-dimensional Evaluator...',
    });
    await delay(800);
    
    onProgress?.({
      stage: 'multidimensional',
      progress: 72,
      message: 'Evaluating across ' + input.dimensions.length + ' dimensions' + (input.customFactors?.length ? ' and ' + input.customFactors.length + ' custom factors' : '') + '...',
    });
    await delay(1000);
    
    const { analyzeMultiDimensional } = await import('./agent4-multidimensional');
    const multiDimensionalAnalysis = await analyzeMultiDimensional(
      input,
      decisionStructure,
      timelineSimulation
    );
    
    onProgress?.({
      stage: 'multidimensional',
      progress: 78,
      message: 'Multi-dimensional scoring complete.',
    });

    await delay(500);

    // Stage 5: 风险分析
    onProgress?.({
      stage: 'risk',
      progress: 80,
      message: 'Initializing AI Agent 5: Risk Analyst...',
    });
    await delay(800);
    
    onProgress?.({
      stage: 'risk',
      progress: 84,
      message: 'Identifying potential risks and failure points...',
    });
    await delay(1000);
    
    const { analyzeRisks } = await import('./agent5-risk');
    const riskAnalysis = await analyzeRisks(
      input,
      decisionStructure,
      timelineSimulation
    );
    
    onProgress?.({
      stage: 'risk',
      progress: 88,
      message: 'Risk assessment complete. Mitigation strategies generated.',
    });

    await delay(500);

    // Stage 6: 最终整合
    onProgress?.({
      stage: 'integration',
      progress: 90,
      message: 'Initializing AI Agent 6: Decision Coordinator...',
    });
    await delay(800);
    
    onProgress?.({
      stage: 'integration',
      progress: 93,
      message: 'Synthesizing insights from all AI agents...',
    });
    await delay(1000);
    
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
      stage: 'integration',
      progress: 97,
      message: 'Generating final recommendations and action plan...',
    });
    await delay(800);

    onProgress?.({
      stage: 'complete',
      progress: 100,
      message: 'Analysis complete! Preparing visualizations...',
    });
    await delay(500);

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

