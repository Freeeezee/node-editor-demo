import {NodeComputeFunction, NodeData} from "@/src/lib/models/node.model";
import NodeWrapper from "@/src/lib/components/nodes/NodeWrapper";
import {Node, NodeProps, Position} from "@xyflow/react";
import NodeHandle from "@/src/lib/components/shared/NodeHandle";
import {Input} from "@mui/material";
import {useNodeEditorStore} from "@/src/lib/stores/node-editor.store";

type NumberNodeData = NodeData & {
    value: number;
}

export const numberNodeType = 'number';

export default function NumberNode({
    id,
    data,
    selected,
}: NodeProps<Node<NumberNodeData>>) {
    const setNodeValue = useNodeEditorStore(s => s.setNodeValue);

    const handleChange = (value: number) => {
        setNodeValue(id, {
            ...data,
            value
        });
    }

    return (
        <NodeWrapper title={'Number'} selected={selected}>
            <Input
                value={data.value}
                size="small"
                onChange={(e) => handleChange(e.target.value === '' ? 0 : Number(e.target.value))}
                inputProps={{
                    type: 'number',
                }}
                className={'w-20'}
            />

            <NodeHandle type="source" position={Position.Right} id="out" />
        </NodeWrapper>
    )
}

export const createNumberNode = (id: string, position: { x: number; y: number; }, initialValue = 1): Node<NumberNodeData> => ({
    id,
    position,
    type: numberNodeType,
    data: {
        value: initialValue,
        handles: {
            'out': 'number',
        }
    }
});

export const computeNumberNode: NodeComputeFunction = (node) => ({ 'out': node.data.value });
