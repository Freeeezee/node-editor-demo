import {Handle, HandleProps, useNodeId} from "@xyflow/react";
import {Circle} from "@mui/icons-material";
import {useNodeEditorStore} from "@/app/lib/stores/node-editor.store";
import {HandleOutputType, NodeData} from "@/app/lib/models/node.model";

const handleColors: Record<HandleOutputType, string> = {
    number: '#266DD3',
    signal: '#FE4134',
};

export default function NodeHandle({style, ...props}: HandleProps) {
    const nodeId = useNodeId();
    const node = useNodeEditorStore(s => s.nodes.find(n => n.id === nodeId));
    const handleType = props.id
        ? (node?.data as NodeData | undefined)?.handles[props.id]
        : undefined;
    const color = handleType ? handleColors[handleType] : '#FE4134';

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
            <Circle
                style={{
                    pointerEvents: 'none',
                    fontSize: '1em',
                    left: 0,
                    position: 'absolute',
                    color,
                }}
            />
        </Handle>
    )
}
