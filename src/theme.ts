import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
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
