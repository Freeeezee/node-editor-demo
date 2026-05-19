import {Connection, Edge, Node} from "@xyflow/react";
import {NodeData} from "@/app/lib/models/node.model";

export const isConnectionValid = (
    connection: Connection | Edge,
    nodes: Node[],
) => {
    const source = nodes.find(n => n.id === connection.source);
    const target = nodes.find(n => n.id === connection.target);

    let sourceType = getHandleType(source, connection.sourceHandle);
    let targetType = getHandleType(target, connection.targetHandle);

    if (!sourceType || !targetType) return false;

    if (!Array.isArray(sourceType)) sourceType = [sourceType];
    if (!Array.isArray(targetType)) targetType = [targetType];

    return sourceType.some(type => targetType.includes(type));
}

const getHandleType = (
    node: Node | undefined,
    handleId: string | null | undefined,
) => {
    if (!node || !handleId) return null;

    const nodeData = node.data as NodeData;

    return nodeData.handles[handleId];
}
