import React from 'react';

function Notification({ message, type }) {
  if (!message) {
    return null;
  }

  const style = {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: type === 'success' ? '#2E7D32' : '#d32f2f',
    color: 'white',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    zIndex: 2000,
    transition: 'opacity 0.5s ease-in-out',
    opacity: message ? 1 : 0,
  };

  return <div style={style}>{message}</div>;
}

export default Notification;