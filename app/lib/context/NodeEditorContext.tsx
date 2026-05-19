'use client'

import React, {createContext, useContext} from "react";
import {
    Edge,
    Node,
    OnConnect,
    OnEdgesChange,
    OnNodesChange
} from '@xyflow/react';
import {useNodeEditorStore} from "@/app/lib/stores/node-editor.store";

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
    const {
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnect,
    } = useNodeEditorStore();

    return {
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnect,
    }
}
