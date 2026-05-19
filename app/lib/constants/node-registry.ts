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
import ChartNode, {
    computeChartNode,
    createChartNode,
    chartNodeType
} from "@/app/lib/components/nodes/ChartNode";
import NumberNode, {computeNumberNode, createNumberNode, numberNodeType} from "@/app/lib/components/nodes/NumberNode";
import MathNode, {computeMathNode, createMathNode, mathNodeType} from "@/app/lib/components/nodes/MathNode";

export const nodeTypeRegistry: NodeTypes = {
    [sineWaveGeneratorNodeType]: SineWaveGeneratorNode,
    [numberReaderNodeType]: NumberReaderNode,
    [chartNodeType]: ChartNode,
    [numberNodeType]: NumberNode,
    [mathNodeType]: MathNode,
}

export const nodeComputeRegistry: Record<string, NodeComputeFunction> = {
    [sineWaveGeneratorNodeType]: computeSineWaveGeneratorNode,
    [numberReaderNodeType]: computeNumberReaderNode,
    [chartNodeType]: computeChartNode,
    [numberNodeType]: computeNumberNode,
    [mathNodeType]: computeMathNode,
}

export type NodeCreator = {
    label: string;
    create: (id: string, position: XYPosition) => Node;
}

export const nodeCreatorRegistry: Record<string, NodeCreator> = {
    [sineWaveGeneratorNodeType]: { label: 'Sine Wave Generator', create: createSineWaveGeneratorNode },
    [numberReaderNodeType]: { label: 'Number Reader', create: createNumberReaderNode },
    [chartNodeType]: { label: 'Chart', create: createChartNode },
    [numberNodeType]: { label: 'Number', create: createNumberNode },
    [mathNodeType]: { label: 'Math', create: createMathNode },
}
