import {createTimeNode} from "@/app/lib/components/nodes/TimeNode";
import {createSineWaveGeneratorNode} from "@/app/lib/components/nodes/SineWaveGeneratorNode";
import {createNumberReaderNode} from "@/app/lib/components/nodes/NumberReaderNode";
import {Edge, Node} from "@xyflow/react";

export const initialNodes: Node[] = [
    createTimeNode('0', { x: 0, y: 0 }),
    createSineWaveGeneratorNode('1', { x: 300, y: 0 }),
    createNumberReaderNode('2', { x: 700, y: 0 }),
];

export const initialEdges: Edge[] = [
    {
        id: '0-1',
        source: '0',
        sourceHandle: 'time',
        target: '1',
        targetHandle: 'time',
    },
    {
        id: '1-2',
        source: '1',
        sourceHandle: 'out',
        target: '2',
        targetHandle: 'in',
    }
];
