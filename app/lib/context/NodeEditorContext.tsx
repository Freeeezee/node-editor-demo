'use client'

import React, {createContext, useCallback, useContext, useState} from "react";
import {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Edge,
    Node,
    OnConnect,
    OnEdgesChange,
    OnNodesChange
} from '@xyflow/react';

const NodeEditorContext = createContext<NodeEditorContextValue>({} as NodeEditorContextValue);

export const useNodeEditorContext = () => useContext(NodeEditorContext);

interface NodeEditorProviderProps {
    children: React.ReactNode;
}

export function NodeEditorProvider({children}: NodeEditorProviderProps) {
    const value = useNodeEditorContextValue();

    return (
        <NodeEditorContext.Provider value={value}>
            {children}
        </NodeEditorContext.Provider>
    )
}

interface NodeEditorContextValue {
    nodes: Node[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
}

const useNodeEditorContextValue = (): NodeEditorContextValue => {

    const initialNodes: Node[] = [
        { id: '1', data: { label: 'Node 1' }, position: { x: 5, y: 5 } },
        { id: '2', data: { label: 'Node 2' }, position: { x: 5, y: 100 } },
    ];

    const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }];

    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);

    const onNodesChange: OnNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes],
    );
    const onEdgesChange: OnEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges],
    );
    const onConnect: OnConnect = useCallback(
        (connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges],
    );

    return {
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnect,
    }
}
