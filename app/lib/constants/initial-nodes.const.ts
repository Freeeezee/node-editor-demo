import {createSineWaveGeneratorNode} from "@/app/lib/components/nodes/SineWaveGeneratorNode";
import {createChartNode} from "@/app/lib/components/nodes/ChartNode";
import {Edge, Node} from "@xyflow/react";

export const initialNodes: Node[] = [
    createSineWaveGeneratorNode('0', { x: 0, y: 0 }),
    createChartNode('1', { x: 400, y: 0 }),
];

export const initialEdges: Edge[] = [
    {
        id: '0-1',
        source: '0',
        sourceHandle: 'out',
        target: '1',
        targetHandle: 'in',
    },
];
