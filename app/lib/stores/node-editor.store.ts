import {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Connection,
    Edge,
    EdgeChange,
    Node,
    NodeChange
} from "@xyflow/react";
import {create} from "zustand/react";
import {GraphState} from "@/app/lib/models/graph-state.model";
import {computeGraph} from "@/app/lib/utils/graph-compute.util";
import {nodeCreatorRegistry} from "@/app/lib/constants/node-registry";
import {initialEdges, initialNodes} from "@/app/lib/constants/initial-nodes.const";

const initialState = computeGraph(initialNodes, initialEdges, {});

interface NodeEditorStore {
    nodes: Node[];
    edges: Edge[];
    state: GraphState;

    onNodesChange: (changes: NodeChange[]) => void;
    onEdgesChange: (changes: EdgeChange[]) => void;
    onConnect: (connection: Connection) => void;
    setNodeValue: (nodeId: string, value: unknown) => void;
    addNode: (type: string, position?: { x: number; y: number }) => string | null;
}

export const useNodeEditorStore = create<NodeEditorStore>(
    (set, get) => (
        {
            nodes: initialState?.nodes ?? initialNodes,
            edges: initialState?.edges ?? initialEdges,
            state: initialState?.graphState ?? {},

            onNodesChange: (changes) => {
                set({nodes: applyNodeChanges(changes, get().nodes)});
            },
            onEdgesChange: (changes) => {
                const result = computeGraph(
                    get().nodes,
                    applyEdgeChanges(changes, get().edges),
                    get().state,
                );

                if (!result) return;

                set(result);
            },
            onConnect: (connection) => {
                const result = computeGraph(
                    get().nodes,
                    addEdge(connection, get().edges),
                    get().state,
                );

                if (!result) return;

                set(result);
            },
            addNode: (type, position) => {
                const creator = nodeCreatorRegistry[type];
                if (!creator) return null;
                const id = `${type}-${Date.now()}`;
                set({ nodes: [...get().nodes, creator.create(id, position ?? { x: 0, y: 0 })] });
                return id;
            },
            setNodeValue: (nodeId, value) => {
                const updatedNodes = get().nodes.map(node =>
                    node.id === nodeId
                        ? { ...node, data: { ...node.data, ...(value as Record<string, unknown>) } }
                        : node
                );

                const result = computeGraph(
                    updatedNodes,
                    get().edges,
                    get().state,
                );

                if (!result) return;

                set(result);
            },
        })
);
