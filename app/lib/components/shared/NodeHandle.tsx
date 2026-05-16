import {Handle, HandleProps} from "@xyflow/react";
import {Circle} from "@mui/icons-material";

export default function NodeHandle(props: HandleProps) {
    return (
        <Handle
            {...props}
            style={{
                background: 'none',
                border: 'none',
                width: '1em',
                height: '1em',
            }}
        >
            <Circle
                color={'primary'}
                style={{
                    pointerEvents: 'none',
                    fontSize: '1em',
                    left: 0,
                    position: 'absolute',
                }}
            />
        </Handle>
    )
}
