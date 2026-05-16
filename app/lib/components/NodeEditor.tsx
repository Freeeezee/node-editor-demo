'use client'

import {DefaultEdgeOptions, FitViewOptions, ReactFlow} from "@xyflow/react";
import {useNodeEditorContext} from "@/app/lib/context/NodeEditorContext";
import {isConnectionValid} from "@/app/lib/utils/connection.util";
import {nodeTypeRegistry} from "@/app/lib/constants/node-registry";
import {useNodeSpawner} from "@/app/lib/hooks/useNodeSpawner";
import MenuBar from "./MenuBar";
import NodeSearchDialog from "./NodeSearchDialog";

const fitViewOptions: FitViewOptions = { padding: 0.2 };
const defaultEdgeOptions: DefaultEdgeOptions = { animated: true };

export default function NodeEditor() {
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useNodeEditorContext();

    const spawner = useNodeSpawner(nodes, onConnect);

    return (
        <div onKeyDown={spawner.handleSpacebar} onMouseMove={spawner.trackMouse} tabIndex={0} className="w-full h-full outline-none">
            <MenuBar onAddClick={() => spawner.openDialog(window.innerWidth / 2, window.innerHeight / 2)} />
            <NodeSearchDialog
                open={spawner.dialogOpen}
                onClose={spawner.closeDialog}
                position={spawner.spawnPosition}
                onNodeAdded={spawner.handleNodeAdded}
            />
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onConnectStart={spawner.handleConnectStart}
                onConnectEnd={spawner.handleConnectEnd}
                isValidConnection={(c) => isConnectionValid(c, nodes)}
                nodeTypes={nodeTypeRegistry}
                fitView
                fitViewOptions={fitViewOptions}
                defaultEdgeOptions={defaultEdgeOptions}
                maxZoom={1}
                minZoom={0.2}
            />
        </div>
    )
}
