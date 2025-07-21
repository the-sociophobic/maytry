import React from 'react';

type NotificationProps = {
  message: string;
  visible: boolean;
  onClose: () => void;
};

const Notification: React.FC<NotificationProps> = ({ message, visible, onClose }) => {
  if (!visible) return null;
  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        zIndex: 3000,
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <div
        className="alert alert-success"
        style={{
          margin: 24,
          minWidth: 300,
          maxWidth: 500,
          pointerEvents: 'auto',
          boxShadow: '0 2px 16px rgba(0,0,0,0.15)',
          cursor: 'pointer',
        }}
        onClick={onClose}
      >
        {message}
      </div>
    </div>
  );
};

export default Notification; 