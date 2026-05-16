import {Handle, Node, NodeProps, Position, XYPosition} from "@xyflow/react";
import {NodeComputeFunction, NodeData} from "@/app/lib/models/node.model";
import NodeWrapper from "@/app/lib/components/nodes/NodeWrapper";
import {useNodeEditorStore} from "@/app/lib/stores/node-editor.store";
import {Height, GraphicEqRounded, ArrowRightAlt} from "@mui/icons-material";
import NodeSlider from "@/app/lib/components/shared/NodeSlider";
import theme from "@/app/theme";
import NodeHandle from "@/app/lib/components/shared/NodeHandle";

type SineWaveGeneratorNodeData = NodeData & {
    amplitude: number;
    frequency: number;
    phase: number;
}

export const sineWaveGeneratorNodeType = 'sine-wave-generator';

export default function SineWaveGeneratorNode({
    id,
    data,
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
        >
            <NodeSlider
                value={data.amplitude}
                min={0.5}
                max={5}
                step={0.1}
                onChange={(value) => handleUpdate('amplitude', value)}
                icon={<Height color={'info'} />}
            />
            <NodeSlider
                value={data.frequency}
                min={0.5}
                max={5}
                step={0.1}
                onChange={(value) => handleUpdate('frequency', value)}
                icon={<GraphicEqRounded color={'info'} />}
            />
            <NodeSlider
                value={data.phase}
                min={0}
                max={5}
                step={0.1}
                onChange={(value) => handleUpdate('phase', value)}
                icon={<ArrowRightAlt color={'info'}  />}
            />
            <NodeHandle type={'target'} position={Position.Left} id="time" />
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
                'time': 'number',
                'out': 'number',
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
    const { amplitude, frequency, phase } = node.data as SineWaveGeneratorNodeData;
    const t = (inputs['time'] as number | undefined) ?? 1;

    const out = amplitude * Math.sin(2 * Math.PI * frequency * t + phase);

    return {
        'out': out,
    }
}
