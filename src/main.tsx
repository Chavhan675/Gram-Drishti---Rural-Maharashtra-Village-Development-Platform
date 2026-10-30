import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Register service worker with auto-update and offline-ready notification
registerSW({
  immediate: true,
  onNeedRefresh() {
    console.info('Gram Drishti update available');
  },
  onOfflineReady() {
    console.info('Gram Drishti is ready to work offline in rural areas');
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

