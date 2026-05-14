import {NodeComputeFunction, NodeData} from "@/app/lib/models/node.model";
import {Node, NodeProps, XYPosition} from "@xyflow/react";

type NumberReaderNodeData = NodeData & { }

export const numberReaderNodeType = 'number-reader';

export default function NumberReaderNode({
    data,
}: NodeProps<Node<NumberReaderNodeData>>) {
    const value = data.computedState?.['value'] as string;

    return (
        <div>
            {data.computedState ? (
                <p>{value}</p>
            ): (
                <p>No input connected</p>
            )}
        </div>
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
    const inValue = inputs['in'] as number;

    return {
        'value': inValue.toString(),
    }
}
