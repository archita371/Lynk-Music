import React from 'react'
import LinearProgress from '@mui/material/LinearProgress';
import './progressBar.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#f00',
      main: '#f00',
      dark: '##fff',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fff',
      main: '#fff',
      dark: '#fff',
      contrastText: '#fff',
    },
  },
});

function ProgressBar({percentage}) {
      
    return (
    <div className='progress-container'>
        <ThemeProvider theme={theme}>
        <LinearProgress variant="determinate" value={percentage} color="inherit"/>
        </ThemeProvider>
      
    </div>
  )
}

export default ProgressBar