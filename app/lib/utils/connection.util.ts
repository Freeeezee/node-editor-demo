import {Connection, Edge, Node} from "@xyflow/react";
import {NodeData} from "@/app/lib/models/node.model";

export const isConnectionValid = (
    connection: Connection | Edge,
    nodes: Node[],
) => {
    const source = nodes.find(n => n.id === connection.source);
    const target = nodes.find(n => n.id === connection.target);

    const sourceType = getHandleType(source, connection.sourceHandle);
    const targetType = getHandleType(target, connection.targetHandle);

    return sourceType === targetType;
}

const getHandleType = (
    node: Node | undefined,
    handleId: string | null | undefined,
) => {
    if (!node || !handleId) return null;

    const nodeData = node.data as NodeData;

    return nodeData.handles[handleId];
}
