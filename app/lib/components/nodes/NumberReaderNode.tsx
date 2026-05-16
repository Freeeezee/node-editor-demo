import {NodeComputeFunction, NodeData} from "@/app/lib/models/node.model";
import {Handle, Node, NodeProps, Position, XYPosition} from "@xyflow/react";
import NodeWrapper from "@/app/lib/components/nodes/NodeWrapper";
import NodeHandle from "@/app/lib/components/shared/NodeHandle";
import {Typography} from "@mui/material";

type NumberReaderNodeData = NodeData & { }

export const numberReaderNodeType = 'number-reader';

export default function NumberReaderNode({
    data,
}: NodeProps<Node<NumberReaderNodeData>>) {
    const value = data.computedState?.['value'] as string | undefined;

    return (
        <NodeWrapper title={'Number Reader'}>
            <NodeHandle type="target" position={Position.Left} id="in" />

            <Typography
                variant={'h4'}
                color={'textPrimary'}
                className={'text-center py-2'}
            >
                {value !== undefined ? value : '—'}
            </Typography>
        </NodeWrapper>
    )
}

export const createNumberReaderNode = (
    id: string,
    position: XYPosition,
): Node<NumberReaderNodeData> => {
    return {
        id,
        position,
        type: numberReaderNodeType,
        data: {
            handles: {
                'in': 'number',
            }
        }
    }
}

export const computeNumberReaderNode: NodeComputeFunction = (
    _node,
    inputs
) => {
    const inValue = inputs['in'] as number | undefined;

    if (inValue === undefined) return {};

    return {
        'value': Number.isFinite(inValue) ? inValue.toFixed(4) : inValue.toString(),
    }
}
