import './topInstallHotfix';
import './pwa-hotfix.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { AdminProvider } from './contexts/AdminContext';
import { registerServiceWorker } from './registerServiceWorker';
import AppErrorBoundary from './components/AppErrorBoundary';
import './index.css';
import PersistentInstallButton from './components/PersistentInstallButton';
import TopBannerSafetyFix from './components/TopBannerSafetyFix';

registerServiceWorker();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <AuthProvider>
        <AdminProvider>
          <App />
    <PersistentInstallButton />
    <TopBannerSafetyFix />
        </AdminProvider>
      </AuthProvider>
    </AppErrorBoundary>
  </React.StrictMode>
);


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((error) => {
      console.warn('Service worker registration failed:', error);
    });
  });
}





