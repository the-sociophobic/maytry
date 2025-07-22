'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import Notification from './Notification';

type NotificationContextType = {
  showNotification: (msg: string) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotification must be used within NotificationProvider');
  return ctx;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const showNotification = useCallback((msg: string) => {
    setMessage(msg);
    setVisible(true);
    setTimeout(() => setVisible(false), 3000);
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Notification message={message} visible={visible} onClose={() => setVisible(false)} />
    </NotificationContext.Provider>
  );
};
