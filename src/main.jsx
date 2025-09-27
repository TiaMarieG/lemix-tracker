// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import CollectionProvider from './contexts/CollectionContext.jsx';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1e1e1e'
    },
  },
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: ({ theme }) => ({
          boxShadow: theme.shadows[4]
        }),
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <CollectionProvider>
        <App />
      </CollectionProvider>
    </ThemeProvider>
  </React.StrictMode>,
);