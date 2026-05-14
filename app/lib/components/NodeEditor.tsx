'use client'

import {DefaultEdgeOptions, FitViewOptions, ReactFlow} from "@xyflow/react";
import {useNodeEditorContext} from "@/app/lib/context/NodeEditorContext";
import {isConnectionValid} from "@/app/lib/utils/connection.util";
import {nodeTypeRegistry} from "@/app/lib/constants/node-registry";
import MenuBar from "./MenuBar";

export default function NodeEditor() {
    const {
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnect,
    } = useNodeEditorContext();

    const fitViewOptions: FitViewOptions = {
        padding: 0.2,
    }

    const defaultEdgeOptions: DefaultEdgeOptions = {
        animated: true,
    }

    return (
        <>
            <MenuBar />
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                isValidConnection={(connection) => {
                    return isConnectionValid(connection, nodes);
                }}
                nodeTypes={nodeTypeRegistry}
                fitView
                fitViewOptions={fitViewOptions}
                defaultEdgeOptions={defaultEdgeOptions}
            />
        </>
    )
}
