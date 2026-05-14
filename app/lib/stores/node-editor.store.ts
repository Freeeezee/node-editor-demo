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
import {createSineWaveGeneratorNode} from "@/app/lib/components/nodes/SineWaveGeneratorNode";
import {createNumberReaderNode} from "@/app/lib/components/nodes/NumberReaderNode";
import {nodeCreatorRegistry} from "@/app/lib/constants/node-registry";

interface NodeEditorStore {
    nodes: Node[];
    edges: Edge[];
    state: GraphState;

    onNodesChange: (changes: NodeChange[]) => void;
    onEdgesChange: (changes: EdgeChange[]) => void;
    onConnect: (connection: Connection) => void;
    setNodeValue: (nodeId: string, value: unknown) => void;
    tick: () => void;
    addNode: (type: string) => void;
}

export const useNodeEditorStore = create<NodeEditorStore>(
    (set, get) => (
        {
            nodes: [
                createSineWaveGeneratorNode('1', { x: 0, y: 0 }),
                createNumberReaderNode('2', { x: 0, y: 100 }),
            ],
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
            tick: () => {
                const result = computeGraph(get().nodes, get().edges, get().state);
                if (!result) return;
                set(result);
            },
            addNode: (type) => {
                const creator = nodeCreatorRegistry[type];
                if (!creator) return;
                const id = `${type}-${Date.now()}`;
                const position = { x: 0, y: 0 };
                set({ nodes: [...get().nodes, creator.create(id, position)] });
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
