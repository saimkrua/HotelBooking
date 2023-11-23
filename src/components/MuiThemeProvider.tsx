"use client"
import { createTheme } from "@mui/material/styles";



export const theme = createTheme({
    typography: {
        fontFamily: [
            "Poppins",
            'sans-serif',
        ].join(','),
    },
    // palette: {
    //     ochre: {
    //         main: '#E3D026',
    //         light: '#E9DB5D',
    //         dark: '#A29415',
    //         contrastText: '#242105',
    //     },
    // },
});
