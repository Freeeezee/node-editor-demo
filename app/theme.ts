'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'var(--font-roboto)',
    },
    palette: {
        primary: {
            main: '#FE4134',
        }
    }
});

export default theme;
