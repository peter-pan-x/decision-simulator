import { useCallback, useMemo } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { CascadeEffect } from './AnalysisResults';

interface DecisionFlowChartProps {
  optionName: string;
  cascadeEffects: CascadeEffect;
  overallScore: number;
}

export default function DecisionFlowChart({
  optionName,
  cascadeEffects,
  overallScore,
}: DecisionFlowChartProps) {
  // 构建流程图节点
  const initialNodes: Node[] = useMemo(() => {
    const nodes: Node[] = [];
    const nodeWidth = 250;
    const nodeHeight = 80;
    const horizontalSpacing = 350;
    const verticalSpacing = 120;

    // 起始节点
    nodes.push({
      id: 'start',
      type: 'input',
      data: { label: optionName },
      position: { x: 0, y: 0 },
      style: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        padding: '16px',
        fontSize: '14px',
        fontWeight: 'bold',
        width: nodeWidth,
      },
    });

    // 一阶效应节点
    cascadeEffects.first_order.forEach((effect, index) => {
      nodes.push({
        id: `first-${index}`,
        data: { label: effect },
        position: {
          x: horizontalSpacing,
          y: index * verticalSpacing - ((cascadeEffects.first_order.length - 1) * verticalSpacing) / 2,
        },
        style: {
          background: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '12px',
          fontSize: '12px',
          width: nodeWidth,
        },
      });
    });

    // 二阶效应节点
    cascadeEffects.second_order.forEach((effect, index) => {
      nodes.push({
        id: `second-${index}`,
        data: { label: effect },
        position: {
          x: horizontalSpacing * 2,
          y: index * verticalSpacing - ((cascadeEffects.second_order.length - 1) * verticalSpacing) / 2,
        },
        style: {
          background: '#8b5cf6',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '12px',
          fontSize: '12px',
          width: nodeWidth,
        },
      });
    });

    // 三阶效应节点
    cascadeEffects.third_order.forEach((effect, index) => {
      nodes.push({
        id: `third-${index}`,
        data: { label: effect },
        position: {
          x: horizontalSpacing * 3,
          y: index * verticalSpacing - ((cascadeEffects.third_order.length - 1) * verticalSpacing) / 2,
        },
        style: {
          background: '#ec4899',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '12px',
          fontSize: '12px',
          width: nodeWidth,
        },
      });
    });

    // 最终结果节点
    nodes.push({
      id: 'end',
      type: 'output',
      data: { label: `Overall Score: ${overallScore}/100` },
      position: { x: horizontalSpacing * 4, y: 0 },
      style: {
        background: overallScore >= 70 ? '#10b981' : overallScore >= 50 ? '#f59e0b' : '#ef4444',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        padding: '16px',
        fontSize: '14px',
        fontWeight: 'bold',
        width: nodeWidth,
      },
    });

    return nodes;
  }, [optionName, cascadeEffects, overallScore]);

  // 构建连接边
  const initialEdges: Edge[] = useMemo(() => {
    const edges: Edge[] = [];

    // 起始节点到一阶效应
    cascadeEffects.first_order.forEach((_, index) => {
      edges.push({
        id: `e-start-first-${index}`,
        source: 'start',
        target: `first-${index}`,
        animated: true,
        style: { stroke: '#3b82f6', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' },
      });
    });

    // 一阶到二阶效应
    cascadeEffects.first_order.forEach((_, firstIndex) => {
      cascadeEffects.second_order.forEach((_, secondIndex) => {
        if (firstIndex === secondIndex || (firstIndex === 0 && secondIndex === 0)) {
          edges.push({
            id: `e-first-${firstIndex}-second-${secondIndex}`,
            source: `first-${firstIndex}`,
            target: `second-${secondIndex}`,
            animated: true,
            style: { stroke: '#8b5cf6', strokeWidth: 2 },
            markerEnd: { type: MarkerType.ArrowClosed, color: '#8b5cf6' },
          });
        }
      });
    });

    // 二阶到三阶效应
    cascadeEffects.second_order.forEach((_, secondIndex) => {
      cascadeEffects.third_order.forEach((_, thirdIndex) => {
        if (secondIndex === thirdIndex || (secondIndex === 0 && thirdIndex === 0)) {
          edges.push({
            id: `e-second-${secondIndex}-third-${thirdIndex}`,
            source: `second-${secondIndex}`,
            target: `third-${thirdIndex}`,
            animated: true,
            style: { stroke: '#ec4899', strokeWidth: 2 },
            markerEnd: { type: MarkerType.ArrowClosed, color: '#ec4899' },
          });
        }
      });
    });

    // 三阶效应到最终结果
    cascadeEffects.third_order.forEach((_, index) => {
      edges.push({
        id: `e-third-${index}-end`,
        source: `third-${index}`,
        target: 'end',
        animated: true,
        style: { stroke: '#10b981', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' },
      });
    });

    return edges;
  }, [cascadeEffects]);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="h-[600px] w-full border rounded-lg overflow-hidden bg-muted/20">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        attributionPosition="bottom-left"
      >
        <Background />
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            if (node.type === 'input') return '#667eea';
            if (node.type === 'output') return '#10b981';
            return '#3b82f6';
          }}
          maskColor="rgba(0, 0, 0, 0.1)"
        />
      </ReactFlow>
    </div>
  );
}

