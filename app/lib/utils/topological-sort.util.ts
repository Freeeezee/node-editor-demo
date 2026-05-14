import { Node, Edge } from '@xyflow/react';

export function topologicalSort(nodes: Node[], edges: Edge[]): Node[] | null {
    const nodeMap = new Map(nodes.map(n => [n.id, n]));
    const inDegree = new Map<string, number>(nodes.map(n => [n.id, 0]));
    const adjacency = new Map<string, string[]>(nodes.map(n => [n.id, []]));

    for (const edge of edges) {
        adjacency.get(edge.source)!.push(edge.target);
        inDegree.set(edge.target, (inDegree.get(edge.target) ?? 0) + 1);
    }

    const queue = nodes.filter(n => inDegree.get(n.id) === 0).map(n => n.id);
    const sorted: Node[] = [];

    while (queue.length > 0) {
        const id = queue.shift()!;
        sorted.push(nodeMap.get(id)!);

        for (const neighbor of adjacency.get(id) ?? []) {
            const deg = inDegree.get(neighbor)! - 1;
            inDegree.set(neighbor, deg);
            if (deg === 0) queue.push(neighbor);
        }
    }

    return sorted.length === nodes.length ? sorted : null;
}
