import {Node, NodeProps, Position, XYPosition} from "@xyflow/react";
import {NodeComputeFunction, NodeData, Signal} from "@/src/lib/models/node.model";
import NodeWrapper from "@/src/lib/components/nodes/NodeWrapper";
import {useNodeEditorStore} from "@/src/lib/stores/node-editor.store";
import {GraphicEqRounded, ArrowRightAlt, Height} from "@mui/icons-material";
import NodeSlider from "@/src/lib/components/shared/NodeSlider";
import NodeHandle from "@/src/lib/components/shared/NodeHandle";

type SineWaveGeneratorNodeData = NodeData & {
    amplitude: number;
    frequency: number;
    phase: number;
}

export const sineWaveGeneratorNodeType = 'sine-wave-generator';

export default function SineWaveGeneratorNode({
    id,
    data,
    selected,
}: NodeProps<Node<SineWaveGeneratorNodeData>>) {
    const setNodeValue = useNodeEditorStore(s => s.setNodeValue);

    const handleUpdate = (key: keyof SineWaveGeneratorNodeData, value: number) => {
        setNodeValue(id, {
            ...data,
            [key]: value,
        });
    }

    return (
        <NodeWrapper
            title={'Sine Wave Generator'}
            selected={selected}
        >
            <NodeSlider
                value={data.amplitude}
                min={0.5}
                max={5}
                step={0.1}
                onChange={(value) => handleUpdate('amplitude', value)}
                icon={<Height color={'info'} />}
                handle={{
                    nodeId: id,
                    handleId: 'amplitude',
                    computedState: data.computedState?.['amplitude'] as string,
                }}
            />
            <NodeSlider
                value={data.frequency}
                min={0.5}
                max={5}
                step={0.1}
                onChange={(value) => handleUpdate('frequency', value)}
                icon={<GraphicEqRounded color={'info'} />}
                handle={{
                    nodeId: id,
                    handleId: 'frequency',
                    computedState: data.computedState?.['frequency'] as string,
                }}
            />
            <NodeSlider
                value={data.phase}
                min={0}
                max={5}
                step={0.1}
                onChange={(value) => handleUpdate('phase', value)}
                icon={<ArrowRightAlt color={'info'} />}
                handle={{
                    nodeId: id,
                    handleId: 'phase',
                    computedState: data.computedState?.['phase'] as string,
                }}
            />
            <NodeHandle type={'source'} position={Position.Right} id="out" />
        </NodeWrapper>
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
                'amplitude': ['number'],
                'frequency': 'number',
                'phase': 'number',
                'out': 'signal',
            },
            amplitude: 1,
            frequency: 1,
            phase: 0,
        }
    }
}

export const computeSineWaveGeneratorNode: NodeComputeFunction = (
    node,
    inputs,
) => {
    const data = node.data as SineWaveGeneratorNodeData;
    const amp = (inputs['amplitude'] as number | undefined) ?? data.amplitude;
    const freq = (inputs['frequency'] as number | undefined) ?? data.frequency;
    const ph = (inputs['phase'] as number | undefined) ?? data.phase;

    const signal: Signal = (t) =>
        amp * Math.sin(2 * Math.PI * freq * t + ph);

    return { 'out': signal, 'amplitude': amp, 'frequency': freq, 'phase': ph };
}
