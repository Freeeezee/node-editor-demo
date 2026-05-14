import {Node, XYPosition} from "@xyflow/react";
import {NodeTypes} from "@xyflow/react";
import SineWaveGeneratorNode, {
    computeSineWaveGeneratorNode,
    createSineWaveGeneratorNode,
    sineWaveGeneratorNodeType
} from "@/app/lib/components/nodes/SineWaveGeneratorNode";
import {NodeComputeFunction} from "@/app/lib/models/node.model";
import NumberReaderNode, {
    computeNumberReaderNode,
    createNumberReaderNode,
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

export type NodeCreator = {
    label: string;
    create: (id: string, position: XYPosition) => Node;
}

export const nodeCreatorRegistry: Record<string, NodeCreator> = {
    [sineWaveGeneratorNodeType]: { label: 'Sine Wave Generator', create: createSineWaveGeneratorNode },
    [numberReaderNodeType]: { label: 'Number Reader', create: createNumberReaderNode },
}
