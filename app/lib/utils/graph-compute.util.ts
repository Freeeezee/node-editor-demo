import {GraphState} from "@/app/lib/models/graph-state.model";
import {Edge, Node} from "@xyflow/react";
import {topologicalSort} from "@/app/lib/utils/topological-sort.util";
import {nodeComputeRegistry} from "@/app/lib/constants/node-registry";

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

    for (const node of sorted) {
        const incoming = edges.filter(e => e.target === node.id);

        const inputs = incoming
            .reduce<Record<string, unknown>>((acc, edge) => {
                if (!edge.targetHandle || !edge.sourceHandle) return acc;

                acc[edge.targetHandle] = (state[edge.source] as Record<string, unknown>)?.[edge.sourceHandle];

                return acc;
            }, {});

        state[node.id] = computeNode(node, inputs);
    }

    return {
        nodes: nodes.map(node => ({
            ...node,
            data: {
                ...node.data,
                computedState: state[node.id],
            }
        })),
        edges,
        graphState: state,
    }
}

const computeNode = (
    node: Node,
    inputs: Record<string, unknown>,
): Record<string, unknown> => {
    if (!node.type) return {};

    const fn = nodeComputeRegistry[node.type];

    if (!fn) return {};

    return fn(node, inputs);
}
