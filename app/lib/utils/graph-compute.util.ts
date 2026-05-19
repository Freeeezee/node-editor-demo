import {GraphState} from "@/app/lib/models/graph-state.model";
import {Edge, Node} from "@xyflow/react";
import {topologicalSort} from "@/app/lib/utils/topological-sort.util";
import {nodeComputeRegistry} from "@/app/lib/constants/node-registry";
import {NodeData} from "@/app/lib/models/node.model";

interface GraphComputeResult {
    nodes: Node[];
    edges: Edge[];
    graphState: GraphState;
}

export const computeGraph = (
    nodes: Node[],
    edges: Edge[],
    state: GraphState
): GraphComputeResult | null => {
    const sorted = topologicalSort(nodes, edges);
    if (!sorted) return null;

    const handleOverrides: Record<string, Record<string, unknown>> = {};

    for (const node of sorted) {
        const inputs = gatherInputs(edges, node.id, state);
        const result = computeNode(node, inputs);
        if (result['_handles']) {
            handleOverrides[node.id] = result['_handles'] as Record<string, unknown>;
            delete result['_handles'];
        }
        state[node.id] = result;
    }

    return {
        nodes: nodes.map(node => ({
            ...node,
            data: {
                ...node.data,
                ...(handleOverrides[node.id] ? { handles: { ...(node.data as NodeData).handles, ...handleOverrides[node.id] } } : {}),
                computedState: state[node.id],
            }
        })),
        edges,
        graphState: state,
    }
}

const gatherInputs = (edges: Edge[], nodeId: string, state: GraphState): Record<string, unknown> => {
    const incoming = edges.filter(e => e.target === nodeId);
    return incoming.reduce<Record<string, unknown>>((acc, edge) => {
        if (!edge.targetHandle || !edge.sourceHandle) return acc;
        acc[edge.targetHandle] = (state[edge.source] as Record<string, unknown>)?.[edge.sourceHandle];
        return acc;
    }, {});
}

const computeNode = (node: Node, inputs: Record<string, unknown>): Record<string, unknown> => {
    if (!node.type) return {};
    const fn = nodeComputeRegistry[node.type];
    if (!fn) return {};
    return fn(node, inputs);
}
