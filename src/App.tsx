import React from 'react';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { HRMSProvider } from './context/HRMSContext';
import { AppLayout } from './components/layout/AppLayout';

export function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <HRMSProvider>
          <AppLayout />
        </HRMSProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
