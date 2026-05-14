import {Handle, Node, NodeProps, Position, XYPosition} from "@xyflow/react";
import {NodeComputeFunction, NodeData} from "@/app/lib/models/node.model";

type SineWaveGeneratorNodeData = NodeData & {
    amplitude: number;
    frequency: number;
    phase: number;
}

export const sineWaveGeneratorNodeType = 'sine-wave-generator';

export default function SineWaveGeneratorNode({}: NodeProps<Node<SineWaveGeneratorNodeData>>) {
    return (
        <div>
            <h1>Sine Wave Generator</h1>
            <Handle type={'source'} position={Position.Right} id="out" />
        </div>
    )
}

export const createSineWaveGeneratorNode = (
    id: string,
    position: XYPosition,
): Node<SineWaveGeneratorNodeData> => {
    return {
        id,
        position,
        type: sineWaveGeneratorNodeType,
        data: {
            handles: {
                'out': 'number'
            },
            amplitude: 1,
            frequency: 1,
            phase: 0,
        }
    }
}

export const computeSineWaveGeneratorNode: NodeComputeFunction = (
    node,
) => {
    const { amplitude, frequency, phase } = node.data as SineWaveGeneratorNodeData;

    const out = amplitude * Math.sin(2 * Math.PI * frequency * new Date().getMilliseconds() + phase);

    return {
        'out': out,
    }
}
