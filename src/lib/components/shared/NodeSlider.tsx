import {ReactNode} from "react";
import {Input, Slider, Typography} from "@mui/material";
import {useNodeEditorStore} from "@/src/lib/stores/node-editor.store";
import {Position} from "@xyflow/react";
import NodeHandle from "@/src/lib/components/shared/NodeHandle";

interface NodeSliderProps {
    value: number;
    min: number;
    max: number;
    onChange: (value: number) => void;
    icon?: ReactNode;
    step?: number;
    handle?: {
        nodeId: string;
        handleId: string;
        computedState?: string;
    };
}

export default function NodeSlider({
    value,
    onChange,
    icon,
    min,
    max,
    step = 0.5,
    handle,
}: NodeSliderProps) {
    const edges = useNodeEditorStore(s => s.edges);

    const isConnected = !!handle && edges.some(
        e => e.target === handle.nodeId && e.targetHandle === handle.handleId
    );

    const handleBlur = () => {
        if (value < min) {
            onChange(min);
        } else if (value > max) {
            onChange(max);
        }
    };

    return (
        <div className={'relative flex flex-row gap-5 items-center nodrag'}>
            {handle && (
                <NodeHandle type={'target'} position={Position.Left} id={handle.handleId} style={{top: '50%', left: '-1.15rem'}} />
            )}
            {icon}
            {isConnected ? (
                <Typography variant={'body1'} color={'textPrimary'}>{handle.computedState ?? value}</Typography>
            ) : (
                <>
                    <Slider
                        value={value}
                        min={min}
                        max={max}
                        onChange={(_e, value) => onChange(value)}
                        className={'grow min-w-25'}
                        step={step}
                    />
                    <Input
                        value={value}
                        size="small"
                        onBlur={handleBlur}
                        onChange={(e) => onChange(e.target.value === '' ? 0 : Number(e.target.value))}
                        inputProps={{
                            min,
                            max,
                            type: 'number',
                        }}
                        className={'w-20'}
                    />
                </>
            )}
        </div>
    )
}
