import { ColorModeScript, extendTheme } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';


// 2. Extend the theme to include custom colors, fonts, etc
const customTheme = extendTheme({
  colors: {
    brand: {
      400:"#68D2E8",
      500: "#03AED2",
    },
  },
});
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={customTheme}>

      <App />
    </ChakraProvider>
  </StrictMode>
);


