import {ReactNode} from "react";
import {Input, Slider} from "@mui/material";

interface NodeSliderProps {
    value: number;
    min: number;
    max: number;
    onChange: (value: number) => void;
    icon?: ReactNode;
}

export default function NodeSlider({
    value,
    onChange,
    icon,
    min,
    max
}: NodeSliderProps) {
    const handleBlur = () => {
        if (value < min) {
            onChange(min);
        } else if (value > max) {
            onChange(max);
        }
    };

    return (
        <div className={'flex flex-row gap-2 items-center'}>
            <div className={'w-12'}>
                {icon}
            </div>
            <Slider
                value={value}
                min={min}
                max={max}
                onChange={(_e, value) => onChange(value)}
                className={'grow'}
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
                className={'w-16'}
            />
        </div>
    )
}
