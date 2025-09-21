import React from 'react';

const statusCardStyle = {
  minWidth: '150px',
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0 4px 16px rgba(46, 125, 50, 0.15)',
  backgroundColor: 'white',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#2E7D32',
};

const countStyle = {
  fontSize: '2.5rem',
  fontWeight: '700',
  marginBottom: '5px',
};

const labelStyle = {
  fontSize: '1rem',
  fontWeight: '500',
  textTransform: 'capitalize',
};

function StatusCounter({ label, count }) {
  return (
    <div style={statusCardStyle}>
      <span style={countStyle}>{count}</span>
      <span style={labelStyle}>{label}</span>
    </div>
  );
}

export default StatusCounter;