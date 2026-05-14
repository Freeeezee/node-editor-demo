import {Node} from "@xyflow/react";

type HandleOutputType = 'number' | 'string';

export type NodeData = {
    handles: Record<string, HandleOutputType>;
    computedState?: Record<string, unknown>;
}

export type NodeComputeFunction = (
    node: Node,
    inputs: Record<string, unknown>
) => Record<string, unknown>;
