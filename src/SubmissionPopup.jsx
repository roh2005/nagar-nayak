import React from 'react';

function SubmissionPopup({ report, onClose }) {
  if (!report) {
    return null; // Don't render if no report data is passed
  }

  const style = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
    zIndex: 3000,
    minWidth: '300px',
    textAlign: 'center',
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 2500,
  };

  const headingStyle = {
    color: '#2E7D32',
    marginBottom: '20px',
  };

  const infoStyle = {
    textAlign: 'left',
    lineHeight: '1.6',
    marginBottom: '20px',
    color: '#333',
  };

  const buttonStyle = {
    backgroundColor: '#2E7D32',
    color: 'white',
    border: 'none',
    padding: '10px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  };

  const formatDate = (date) => new Date(date).toLocaleString();

  return (
    <>
      <div style={overlayStyle} onClick={onClose}></div>
      <div style={style}>
        <h3 style={headingStyle}>Report Submitted Successfully!</h3>
        <div style={infoStyle}>
          <p><strong>Report ID:</strong> {report.id}</p>
          <p><strong>Description:</strong> {report.description}</p>
          <p><strong>Location:</strong> {report.location}</p>
          <p><strong>Date & Time:</strong> {formatDate(report.submittedAt)}</p>
        </div>
        <button onClick={onClose} style={buttonStyle}>OK</button>
      </div>
    </>
  );
}

export default SubmissionPopup;