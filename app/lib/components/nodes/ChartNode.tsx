import {Node, NodeProps, Position, XYPosition} from "@xyflow/react";
import {LineChart, Line, XAxis, YAxis, ResponsiveContainer} from "recharts";
import {NodeComputeFunction, NodeData, Signal} from "@/app/lib/models/node.model";
import NodeWrapper from "@/app/lib/components/nodes/NodeWrapper";
import NodeHandle from "@/app/lib/components/shared/NodeHandle";
import NodeSlider from "@/app/lib/components/shared/NodeSlider";
import {useNodeEditorStore} from "@/app/lib/stores/node-editor.store";
import {Timer} from "@mui/icons-material";
import theme from "@/app/theme";

type ChartNodeData = NodeData & {
    windowSeconds: number;
}

export const chartNodeType = 'chart';

const NUM_POINTS = 200;

export default function ChartNode({
    id,
    data,
    selected,
}: NodeProps<Node<ChartNodeData>>) {
    const setNodeValue = useNodeEditorStore(s => s.setNodeValue);

    const signal = data.computedState?.['signal'] as Signal | undefined;
    const windowSeconds = data.windowSeconds ?? 5;

    const chartData = signal
        ? Array.from({length: NUM_POINTS}, (_, i) => {
            const t = (i / (NUM_POINTS - 1)) * windowSeconds;
            return {t: +t.toFixed(2), value: signal(t)};
        })
        : [];

    return (
        <NodeWrapper title={'Chart'} selected={selected}>
            <NodeHandle type={'target'} position={Position.Left} id="in" />
            <div className="w-60 h-32 nodrag">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{top: 5, right: 5, bottom: 0, left: -20}}>
                        <XAxis dataKey="t" type="number" domain={[0, windowSeconds]} tick={{fontSize: 10}} tickCount={6} />
                        <YAxis domain={['auto', 'auto']} tick={{fontSize: 10}} width={40} />
                        <Line
                            type="natural"
                            dataKey="value"
                            stroke={theme.palette.primary.main}
                            strokeWidth={2}
                            dot={false}
                            isAnimationActive={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <NodeSlider
                value={data.windowSeconds ?? 5}
                min={1}
                max={30}
                step={1}
                onChange={(v) => setNodeValue(id, {...data, windowSeconds: v})}
                icon={<Timer color={'info'} />}
            />
        </NodeWrapper>
    )
}

export const createChartNode = (
    id: string,
    position: XYPosition,
): Node<ChartNodeData> => ({
    id,
    position,
    type: chartNodeType,
    data: {
        handles: {
            'in': 'signal',
        },
        windowSeconds: 5,
    }
})

export const computeChartNode: NodeComputeFunction = (
    _node,
    inputs,
) => {
    const signal = inputs['in'] as Signal | undefined;
    if (!signal) return {};
    return {'signal': signal};
}
