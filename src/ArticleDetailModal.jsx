import React from 'react';

function ArticleDetailModal({ article, onClose }) {
  if (!article) {
    return null; // Don't render if there's no article
  }

  const modalStyle = {
    position: 'fixed',
    top: '60%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
    zIndex: 3500,
    minWidth: '350px',
    maxWidth: '800px',
    maxHeight: '90vh',
    overflowY: 'auto',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 3000,
  };

  const imageStyle = {
    width: '100%',
    height: '300px', // ✅ NEW: Fixed height for consistency
    maxWidth: '500px',
    borderRadius: '8px',
    marginBottom: '20px',
    objectFit: 'cover', // ✅ NEW: Ensures image fits without distortion
};
  const contentStyle = {
    textAlign: 'left',
    lineHeight: '1.6',
    color: '#4C774C',
  };
  
  const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#2E7D32',
  };

  // ✅ NEW: Styles for the action buttons
const actionButtonsContainerStyle = {
  display: 'flex',
  gap: '15px',
  marginTop: '20px',
};

const actionButtonStyle = {
  fontSize: '1.2rem',
  padding: '8px 16px',
  borderRadius: '8px',
  backgroundColor: '#E8F5E9',
  border: '1px solid #2E7D32',
  color: '#2E7D32',
  cursor: 'pointer',
};

  // Add this function inside the ArticleDetailModal component, before the return statement
const handleShare = () => {
  if (navigator.share) {
    navigator.share({
      title: article.title,
      text: article.summary,
      url: window.location.href, // This shares the current URL of the page
    }).then(() => {
      console.log('Successfully shared');
    }).catch((error) => {
      console.error('Error sharing:', error);
    });
  } else {
    alert('Web Share API is not supported in this browser.');
  }
};

  return (
    <>
      <div style={overlayStyle} onClick={onClose}></div>
      <div style={modalStyle}>
        <button onClick={onClose} style={closeButtonStyle}>&times;</button>
        <h2 style={{ color: '#2E7D32' }}>{article.title}</h2>
       <img src={article.image} alt={article.title} style={imageStyle} />
{/* ✅ NEW: Move the action buttons div here */}
<div style={actionButtonsContainerStyle}>
  <button style={actionButtonStyle}>👍</button>
  <button style={actionButtonStyle}>👎</button>
  <button style={actionButtonStyle} onClick={handleShare}>Share</button>
</div>
<p style={contentStyle}>{article.content}</p>
        {/* We'll add like/dislike/share buttons here later */}
      </div>
    </>
  );
}

export default ArticleDetailModal;