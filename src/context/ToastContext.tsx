import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  title?: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toasts: Toast[];
  showToast: (message: string, type?: ToastType, title?: string) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType = 'info', title?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = { id, message, type, title };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      <div className="toast-container" role="region" aria-label="Notifications">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast-${t.type}`} role="alert">
            {t.type === 'success' && <CheckCircle2 size={20} className="text-success" style={{ flexShrink: 0 }} />}
            {t.type === 'error' && <AlertCircle size={20} className="text-error" style={{ flexShrink: 0 }} />}
            {t.type === 'warning' && <AlertTriangle size={20} className="text-warning" style={{ flexShrink: 0 }} />}
            {t.type === 'info' && <Info size={20} className="text-info" style={{ flexShrink: 0 }} />}
            <div style={{ flex: 1 }}>
              {t.title && <div style={{ fontWeight: 600, fontSize: '0.8125rem', marginBottom: 2 }}>{t.title}</div>}
              <div style={{ fontSize: '0.8125rem', color: '#475569' }}>{t.message}</div>
            </div>
            <button
              onClick={() => removeToast(t.id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: 2 }}
              aria-label="Close notification"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
