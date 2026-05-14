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

interface NodeEditorStore {
    nodes: Node[];
    edges: Edge[];
    state: GraphState;

    onNodesChange: (changes: NodeChange[]) => void;
    onEdgesChange: (changes: EdgeChange[]) => void;
    onConnect: (connection: Connection) => void;
    setNodeValue: (nodeId: string, value: unknown) => void;
}

export const useNodeEditorStore = create<NodeEditorStore>(
    (set, get) => (
        {
            nodes: [],
            edges: [],
            state: {},

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
            setNodeValue: (nodeId, value) => {
                const result = computeGraph(
                    get().nodes,
                    get().edges,
                    {
                        ...get().state,
                        [nodeId]: value,
                    },
                );

                if (!result) return;

                set(result);
            },
        })
);
