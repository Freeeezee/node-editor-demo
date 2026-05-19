import {Node, NodeProps, Position, XYPosition} from "@xyflow/react";
import {NodeComputeFunction, NodeData, Signal} from "@/app/lib/models/node.model";
import NodeWrapper from "@/app/lib/components/nodes/NodeWrapper";
import {useNodeEditorStore} from "@/app/lib/stores/node-editor.store";
import {Height, GraphicEqRounded, ArrowRightAlt} from "@mui/icons-material";
import NodeSlider from "@/app/lib/components/shared/NodeSlider";
import NodeHandle from "@/app/lib/components/shared/NodeHandle";
import {Typography} from "@mui/material";

type SineWaveGeneratorNodeData = NodeData & {
    amplitude: number;
    frequency: number;
    phase: number;
}

export const sineWaveGeneratorNodeType = 'sine-wave-generator';

const handleStyle = {top: '50%', left: '-1.15rem'};

export default function SineWaveGeneratorNode({
    id,
    data,
    selected,
}: NodeProps<Node<SineWaveGeneratorNodeData>>) {
    const setNodeValue = useNodeEditorStore(s => s.setNodeValue);
    const edges = useNodeEditorStore(s => s.edges);

    const isConnected = (handleId: string) =>
        edges.some(e => e.target === id && e.targetHandle === handleId);

    const handleUpdate = (key: keyof SineWaveGeneratorNodeData, value: number) => {
        setNodeValue(id, {
            ...data,
            [key]: value,
        });
    }

    const handle = (handleId: string) =>
        <NodeHandle type={'target'} position={Position.Left} id={handleId} style={handleStyle} />;

    return (
        <NodeWrapper
            title={'Sine Wave Generator'}
            selected={selected}
        >
            {isConnected('amplitude') ? (
                <div className={'relative flex flex-row gap-5 items-center'}>
                    {handle('amplitude')}
                    <Height color={'info'} />
                    <Typography variant={'body1'} color={'textPrimary'}>{data.computedState?.['amplitude'] as number ?? data.amplitude}</Typography>
                </div>
            ) : (
                <NodeSlider
                    value={data.amplitude}
                    min={0.5}
                    max={5}
                    step={0.1}
                    onChange={(value) => handleUpdate('amplitude', value)}
                    icon={<Height color={'info'} />}
                    handle={handle('amplitude')}
                />
            )}
            {isConnected('frequency') ? (
                <div className={'relative flex flex-row gap-5 items-center'}>
                    {handle('frequency')}
                    <GraphicEqRounded color={'info'} />
                    <Typography variant={'body1'} color={'textPrimary'}>{data.computedState?.['frequency'] as number ?? data.frequency}</Typography>
                </div>
            ) : (
                <NodeSlider
                    value={data.frequency}
                    min={0.5}
                    max={5}
                    step={0.1}
                    onChange={(value) => handleUpdate('frequency', value)}
                    icon={<GraphicEqRounded color={'info'} />}
                    handle={handle('frequency')}
                />
            )}
            {isConnected('phase') ? (
                <div className={'relative flex flex-row gap-5 items-center'}>
                    {handle('phase')}
                    <ArrowRightAlt color={'info'} />
                    <Typography variant={'body1'} color={'textPrimary'}>{data.computedState?.['phase'] as number ?? data.phase}</Typography>
                </div>
            ) : (
                <NodeSlider
                    value={data.phase}
                    min={0}
                    max={5}
                    step={0.1}
                    onChange={(value) => handleUpdate('phase', value)}
                    icon={<ArrowRightAlt color={'info'} />}
                    handle={handle('phase')}
                />
            )}
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
                'amplitude': 'number',
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
