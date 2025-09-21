import React, { useState } from 'react';
import awarenessData from './awarenessData';
import ArticleDetailModal from './ArticleDetailModal';

function Awareness() {

const [selectedArticle, setSelectedArticle] = useState(null);
const handleReadMore = (article) => {
  setSelectedArticle(article);
};

  const cardStyle = {
    minWidth: '280px',
    maxWidth: '300px',
    flex: '1 1 300px', // Flex property for responsive sizing
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(46, 125, 50, 0.1)',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    overflow: 'hidden',
  };

  const imageStyle = {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    flexShrink: 0,
  };

  const contentStyle = {
    padding: '16px',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const titleStyle = {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: '8px',
  };

  const summaryStyle = {
    fontSize: '0.95rem',
    color: '#4C774C',
    marginBottom: '12px',
  };

  const buttonStyle = {
    backgroundColor: '#2E7D32',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: 'auto',
  };

  const gridContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
    margin: '0 auto',
    maxWidth: '1000px',
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', color: '#2E7D32', fontSize: '2rem', marginBottom: '30px' }}>Awareness Hub</h2>
      <div style={gridContainerStyle}>
        {awarenessData.map((article) => (
          <div key={article.id} style={cardStyle}>
            <img src={article.image} alt={article.title} style={imageStyle} />
            <div style={contentStyle}>
              <div>
                <h3 style={titleStyle}>{article.title}</h3>
                <p style={summaryStyle}>{article.summary}</p>
              </div>
              <button style={buttonStyle} onClick={() => handleReadMore(article)}>Read More</button>
            </div>
          </div>
        ))}
      </div>
          {selectedArticle && <ArticleDetailModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />}

    </div>
  );
}

export default Awareness;