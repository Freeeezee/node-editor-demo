import {Node, NodeProps, Position, XYPosition} from "@xyflow/react";
import {NodeComputeFunction, NodeData, Signal} from "@/app/lib/models/node.model";
import NodeWrapper from "@/app/lib/components/nodes/NodeWrapper";
import {useNodeEditorStore} from "@/app/lib/stores/node-editor.store";
import NodeSlider from "@/app/lib/components/shared/NodeSlider";
import NodeHandle from "@/app/lib/components/shared/NodeHandle";
import {MenuItem, Select} from "@mui/material";

const operations = ['add', 'subtract', 'multiply', 'divide'] as const;
type Operation = typeof operations[number];

type MathNodeData = NodeData & {
    operation: Operation;
    a: number;
    b: number;
}

export const mathNodeType = 'math';

export default function MathNode({
    id,
    data,
    selected,
}: NodeProps<Node<MathNodeData>>) {
    const setNodeValue = useNodeEditorStore(s => s.setNodeValue);

    const handleUpdate = (key: keyof MathNodeData, value: unknown) => {
        setNodeValue(id, {
            ...data,
            [key]: value,
        });
    }

    return (
        <NodeWrapper
            title={'Math'}
            selected={selected}
        >
            <Select
                value={data.operation}
                onChange={(e) => handleUpdate('operation', e.target.value)}
                size="small"
                className="nodrag"
            >
                {operations.map(op => (
                    <MenuItem key={op} value={op}>
                        {op.charAt(0).toUpperCase() + op.slice(1)}
                    </MenuItem>
                ))}
            </Select>
            <NodeSlider
                value={data.a}
                min={-10}
                max={10}
                step={0.1}
                onChange={(value) => handleUpdate('a', value)}
                handle={{
                    nodeId: id,
                    handleId: 'a',
                    computedState: typeof data.computedState?.['a'] === 'function' ? 'f(t)' : data.computedState?.['a'] as string,
                }}
            />
            <NodeSlider
                value={data.b}
                min={-10}
                max={10}
                step={0.1}
                onChange={(value) => handleUpdate('b', value)}
                handle={{
                    nodeId: id,
                    handleId: 'b',
                    computedState: typeof data.computedState?.['b'] === 'function' ? 'f(t)' : data.computedState?.['b'] as string,
                }}
            />
            <NodeHandle type={'source'} position={Position.Right} id="out" />
        </NodeWrapper>
    )
}

const applyOp = (op: Operation, a: number, b: number): number => {
    switch (op) {
        case 'add': return a + b;
        case 'subtract': return a - b;
        case 'multiply': return a * b;
        case 'divide': return b !== 0 ? a / b : 0;
    }
}

export const createMathNode = (
    id: string,
    position: XYPosition,
): Node<MathNodeData> => ({
    id,
    position,
    type: mathNodeType,
    data: {
        handles: {
            'a': ['number', 'signal'],
            'b': ['number', 'signal'],
            'out': ['number'],
        },
        operation: 'add',
        a: 0,
        b: 0,
    }
})

export const computeMathNode: NodeComputeFunction = (
    node,
    inputs,
) => {
    const data = node.data as MathNodeData;
    const op = data.operation;

    const rawA = inputs['a'] ?? data.a;
    const rawB = inputs['b'] ?? data.b;

    const aIsSignal = typeof rawA === 'function';
    const bIsSignal = typeof rawB === 'function';

    if (aIsSignal || bIsSignal) {
        const fnA: Signal = aIsSignal ? rawA as Signal : () => rawA as number;
        const fnB: Signal = bIsSignal ? rawB as Signal : () => rawB as number;

        const signal: Signal = (t) => applyOp(op, fnA(t), fnB(t));
        return { 'out': signal, 'a': rawA, 'b': rawB, '_handles': { 'out': 'signal' } };
    }

    return { 'out': applyOp(op, rawA as number, rawB as number), 'a': rawA, 'b': rawB, '_handles': { 'out': 'number' } };
}
