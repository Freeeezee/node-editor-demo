import {useCallback, useRef, useState} from "react";
import {OnConnectStart, useReactFlow} from "@xyflow/react";
import {Node} from "@xyflow/react";
import {nodeCreatorRegistry} from "@/src/lib/constants/node-registry";
import {NodeData} from "@/src/lib/models/node.model";

interface ConnectSource {
    nodeId: string;
    handleId: string;
}

export function useNodeSpawner(
    nodes: Node[],
    onConnect: (connection: { source: string; target: string; sourceHandle: string; targetHandle: string }) => void,
) {
    const {screenToFlowPosition} = useReactFlow();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [spawnPosition, setSpawnPosition] = useState<{ x: number; y: number } | undefined>();
    const mousePos = useRef({x: 0, y: 0});
    const connectSource = useRef<ConnectSource | null>(null);

    const openDialog = useCallback((screenX: number, screenY: number, keepSource = false) => {
        if (!keepSource) connectSource.current = null;
        setSpawnPosition(screenToFlowPosition({x: screenX, y: screenY}));
        setDialogOpen(true);
    }, [screenToFlowPosition]);

    const closeDialog = useCallback(() => {
        setDialogOpen(false);
        connectSource.current = null;
    }, []);

    const trackMouse = useCallback((e: React.MouseEvent) => {
        mousePos.current = {x: e.clientX, y: e.clientY};
    }, []);

    const handleSpacebar = useCallback((e: React.KeyboardEvent) => {
        if (e.code === 'Space' && !dialogOpen) {
            e.preventDefault();
            openDialog(mousePos.current.x, mousePos.current.y);
        }
    }, [dialogOpen, openDialog]);

    const handleConnectStart: OnConnectStart = useCallback((_event, params) => {
        connectSource.current = params.nodeId && params.handleId
            ? {nodeId: params.nodeId, handleId: params.handleId}
            : null;
    }, []);

    const handleConnectEnd = useCallback((event: MouseEvent | TouchEvent) => {
        if ((event.target as Element).closest('.react-flow__handle')) return;

        const pos = 'changedTouches' in event
            ? {x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY}
            : {x: (event as MouseEvent).clientX, y: (event as MouseEvent).clientY};

        openDialog(pos.x, pos.y, true);
    }, [openDialog]);

    const handleNodeAdded = useCallback((newNodeId: string, type: string) => {
        const source = connectSource.current;
        connectSource.current = null;
        if (!source) return;

        const creator = nodeCreatorRegistry[type];
        if (!creator) return;

        const tempNode = creator.create('_tmp', {x: 0, y: 0});
        const newHandles = (tempNode.data as NodeData).handles;
        const sourceNode = nodes.find(n => n.id === source.nodeId);
        const sourceHandleType = (sourceNode?.data as NodeData)?.handles?.[source.handleId];
        if (!sourceHandleType) return;

        const match = Object.entries(newHandles).find(([, t]) => t === sourceHandleType);
        if (!match) return;

        onConnect({
            source: source.nodeId,
            target: newNodeId,
            sourceHandle: source.handleId,
            targetHandle: match[0],
        });
    }, [nodes, onConnect]);

    return {
        dialogOpen,
        spawnPosition,
        openDialog,
        closeDialog,
        trackMouse,
        handleSpacebar,
        handleConnectStart,
        handleConnectEnd,
        handleNodeAdded,
    };
}
