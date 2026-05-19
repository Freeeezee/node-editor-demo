import {Node, NodeProps, Position, XYPosition} from "@xyflow/react";
import {NodeComputeFunction, NodeData} from "@/src/lib/models/node.model";
import NodeWrapper from "@/src/lib/components/nodes/NodeWrapper";
import NodeHandle from "@/src/lib/components/shared/NodeHandle";
import {Typography} from "@mui/material";

type TimeNodeData = NodeData & {}

export const timeNodeType = 'time';

export default function TimeNode({
    data,
    selected,
}: NodeProps<Node<TimeNodeData>>) {
    const t = data.computedState?.['time'] as number | undefined;

    return (
        <NodeWrapper title={'Time'} selected={selected}>
            <Typography variant={'body2'} color={'textSecondary'} className={'text-center'}>
                {t !== undefined ? `${t.toFixed(2)}s` : '—'}
            </Typography>
            <NodeHandle type={'source'} position={Position.Right} id="time" />
        </NodeWrapper>
    )
}

export const createTimeNode = (
    id: string,
    position: XYPosition,
): Node<TimeNodeData> => {
    return {
        id,
        position,
        type: timeNodeType,
        data: {
            handles: {
                'time': 'number',
            },
        }
    }
}

export const computeTimeNode: NodeComputeFunction = () => {
    const t = Date.now() / 1000;
    return {
        'time': t,
    }
}
