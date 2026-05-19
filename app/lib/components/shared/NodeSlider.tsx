import {ReactNode} from "react";
import {Input, Slider} from "@mui/material";

interface NodeSliderProps {
    value: number;
    min: number;
    max: number;
    onChange: (value: number) => void;
    icon?: ReactNode;
    step?: number;
    handle?: ReactNode;
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


    const handleBlur = () => {
        if (value < min) {
            onChange(min);
        } else if (value > max) {
            onChange(max);
        }
    };

    return (
        <div className={'relative flex flex-row gap-5 items-center nodrag'}>
            {handle}
            {icon}
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
        </div>
    )
}
