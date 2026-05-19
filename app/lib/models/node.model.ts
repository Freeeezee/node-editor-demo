import {Node} from "@xyflow/react";

export type Signal = (t: number) => number;

export type HandleOutputType = 'number' | 'signal';

export type NodeData = {
    handles: Record<string, HandleOutputType>;
    computedState?: Record<string, unknown>;
}

export type NodeComputeFunction = (
    node: Node,
    inputs: Record<string, unknown>
) => Record<string, unknown>;
