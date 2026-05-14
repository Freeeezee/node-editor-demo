import {NodeTypes} from "@xyflow/react";
import SineWaveGeneratorNode, {
    computeSineWaveGeneratorNode,
    sineWaveGeneratorNodeType
} from "@/app/lib/components/nodes/SineWaveGeneratorNode";
import {NodeComputeFunction} from "@/app/lib/models/node.model";

export const nodeTypeRegistry: NodeTypes = {
    sineWaveGenerator: SineWaveGeneratorNode,
}

export const nodeComputeRegistry: Record<string, NodeComputeFunction> = {
    [sineWaveGeneratorNodeType]: computeSineWaveGeneratorNode,
}
