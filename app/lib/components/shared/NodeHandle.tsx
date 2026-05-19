import {Handle, HandleProps, useNodeId} from "@xyflow/react";
import {useNodeEditorStore} from "@/app/lib/stores/node-editor.store";
import {HandleOutputType, NodeData} from "@/app/lib/models/node.model";
import {useId} from "react";

const handleColors: Record<HandleOutputType, string> = {
    number: '#266DD3',
    signal: '#FE4134',
};

export default function NodeHandle({style, ...props}: HandleProps) {
    const gradientId = useId();
    const nodeId = useNodeId();
    const node = useNodeEditorStore(s => s.nodes.find(n => n.id === nodeId));

    const handleType = props.id
        ? (node?.data as NodeData | undefined)?.handles[props.id]
        : undefined;

    const types = handleType
        ? (Array.isArray(handleType) ? handleType : [handleType])
        : [];

    const colors = types.length > 0
        ? types.map(t => handleColors[t])
        : ['#FE4134'];

    return (
        <Handle
            {...props}
            style={{
                background: 'none',
                border: 'none',
                width: '1em',
                height: '1em',
                ...style,
            }}
        >
            <svg
                viewBox="0 0 24 24"
                style={{
                    pointerEvents: 'none',
                    width: '1em',
                    height: '1em',
                    left: 0,
                    position: 'absolute',
                }}
            >
                {colors.length > 1 && (
                    <defs>
                        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                            {colors.map((c, i) => (
                                <stop
                                    key={i}
                                    offset={`${(i / (colors.length - 1)) * 100}%`}
                                    stopColor={c}
                                />
                            ))}
                        </linearGradient>
                    </defs>
                )}
                <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill={colors.length > 1 ? `url(#${gradientId})` : colors[0]}
                />
            </svg>
        </Handle>
    )
}
