import {NodeTypes} from "@xyflow/react";
import SineWaveGeneratorNode, {
    computeSineWaveGeneratorNode,
    sineWaveGeneratorNodeType
} from "@/app/lib/components/nodes/SineWaveGeneratorNode";
import {NodeComputeFunction} from "@/app/lib/models/node.model";
import NumberReaderNode, {
    computeNumberReaderNode,
    numberReaderNodeType
} from "@/app/lib/components/nodes/NumberReaderNode";

export const nodeTypeRegistry: NodeTypes = {
    [sineWaveGeneratorNodeType]: SineWaveGeneratorNode,
    [numberReaderNodeType]: NumberReaderNode,
}

export const nodeComputeRegistry: Record<string, NodeComputeFunction> = {
    [sineWaveGeneratorNodeType]: computeSineWaveGeneratorNode,
    [numberReaderNodeType]: computeNumberReaderNode,
}
