'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'var(--font-roboto)',
    },
    palette: {
        primary: {
            main: '#FE4134',
        },
        text: {
            primary: '#2F2F2F',
        },
        info: {
            main: '#2F2F2F',
        }
    }
});

export default theme;
