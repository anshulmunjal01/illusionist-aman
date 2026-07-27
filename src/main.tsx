import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { MediaProvider } from './MediaContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MediaProvider>
      <App />
    </MediaProvider>
  </StrictMode>,
);

