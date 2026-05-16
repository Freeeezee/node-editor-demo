import {Divider, Paper, Typography} from "@mui/material";
import {ReactNode} from "react";

interface NodeWrapperProps {
    title: string;
    children?: ReactNode;
}

export default function NodeWrapper({
    title,
    children,
}: NodeWrapperProps) {
    return (
        <Paper
            className={'rounded-2xl'}
            elevation={3}
            sx={{
                borderRadius: 3
            }}
        >
            <Typography
                variant={'h6'}
                color={'textPrimary'}
                className={'px-4 py-2 text-center'}
            >
                {title}
            </Typography>
            <Divider />
            <div className={'px-4 py-2 flex flex-col gap-3'}>
                {children}
            </div>
        </Paper>
    )
}
