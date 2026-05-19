import {createSineWaveGeneratorNode} from "@/src/lib/components/nodes/SineWaveGeneratorNode";
import {createChartNode} from "@/src/lib/components/nodes/ChartNode";
import {Edge, Node} from "@xyflow/react";
import {createNumberNode} from "@/src/lib/components/nodes/NumberNode";
import {createMathNode} from "@/src/lib/components/nodes/MathNode";
import {createNumberReaderNode} from "@/src/lib/components/nodes/NumberReaderNode";

export const initialNodes: Node[] = [
    createNumberNode('0', { x: -400, y: -300}, 0.5),
    createNumberNode('1', { x: -400, y: 50}),
    createNumberNode('2', { x: -150, y: 200}, 2),
    createMathNode('3', { x: -150, y: -100}),
    createSineWaveGeneratorNode('5', { x: 100, y: 100 }),
    createMathNode('4', { x: 500, y: -100}),
    createChartNode('6', { x: 800, y: 0 }),
    createNumberReaderNode('7', { x: 100, y: -300 }),
];

export const initialEdges: Edge[] = [
    {
        id: '0-3',
        source: '0',
        sourceHandle: 'out',
        target: '3',
        targetHandle: 'a',
    },
    {
        id: '1-3',
        source: '1',
        sourceHandle: 'out',
        target: '3',
        targetHandle: 'b',
    },
    {
        id: '3-5',
        source: '3',
        sourceHandle: 'out',
        target: '5',
        targetHandle: 'amplitude',
    },
    {
        id: '2-5',
        source: '2',
        sourceHandle: 'out',
        target: '5',
        targetHandle: 'frequency',
    },
    {
        id: '0-4',
        source: '0',
        sourceHandle: 'out',
        target: '4',
        targetHandle: 'a',
    },
    {
        id: '5-4',
        source: '5',
        sourceHandle: 'out',
        target: '4',
        targetHandle: 'b',
    },
    {
        id: '4-6',
        source: '4',
        sourceHandle: 'out',
        target: '6',
        targetHandle: 'in',
    },
    {
        id: '3-7',
        source: '3',
        sourceHandle: 'out',
        target: '7',
        targetHandle: 'in',
    }
];
