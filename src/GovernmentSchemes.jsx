import React, { useState, useEffect, useRef } from 'react';
import governmentSchemesData from './governmentSchemesData';

// We'll reuse this modal from the Awareness section, but we'll modify it slightly for schemes.
function SchemeDetailModal({ scheme, onClose }) {
  if (!scheme) {
    return null;
  }

  const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
    zIndex: 4000,
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
    zIndex: 3500,
  };
  
  const imageStyle = {
    width: '100%',
    maxWidth: '500px',
    borderRadius: '8px',
    marginBottom: '20px',
    objectFit: 'cover',
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

  const linkButtonStyle = {
    backgroundColor: '#00796B',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    marginTop: '20px',
    textDecoration: 'none',
  };

  return (
    <>
      <div style={overlayStyle} onClick={onClose}></div>
      <div style={modalStyle}>
        <button onClick={onClose} style={closeButtonStyle}>&times;</button>
        <h2 style={{ color: '#004d40' }}>{scheme.title}</h2>
        <img src={scheme.image} alt={scheme.title} style={imageStyle} />
        <p style={contentStyle}>{scheme.content}</p>
        <a href={scheme.link} target="_blank" rel="noopener noreferrer" style={linkButtonStyle}>
          Go to Official Website
        </a>
      </div>
    </>
  );
}


function GovernmentSchemes() {
  const [selectedScheme, setSelectedScheme] = useState(null);

  const carouselRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(true);
  const schemesToRender = [...governmentSchemesData, ...governmentSchemesData.slice(0, 3)];

  const handleLearnMore = (scheme) => {
    setSelectedScheme(scheme);
  };
  
  const closeModal = () => {
    setSelectedScheme(null);
  };

  const schemeImageStyle = {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    flexShrink: 0,
    borderRadius: '8px 8px 0 0', // To match the card's rounded corners
    marginBottom: '15px',
  };

  // The auto-scrolling logic is the same as LatestIssues
  useEffect(() => {
    let animationFrameId;
    let scrollSpeed = 0.5;
    let lastScrollLeft = 0;
    let resumeTimeout;

    const autoScroll = () => {
        if (carouselRef.current && isScrolling) {
            const { scrollWidth, clientWidth, scrollLeft } = carouselRef.current;
            const cardWidth = 320;
            const gap = 20;
            const jumpPoint = (cardWidth + gap) * governmentSchemesData.length;

            if (scrollLeft >= jumpPoint) {
                carouselRef.current.scrollLeft = 0;
            } else {
                carouselRef.current.scrollLeft += scrollSpeed;
            }

            if (scrollLeft === lastScrollLeft && scrollLeft !== 0) {
                carouselRef.current.scrollLeft = 0;
            }
            lastScrollLeft = scrollLeft;
        }
        animationFrameId = requestAnimationFrame(autoScroll);
    };

    const handleUserInteraction = () => {
        setIsScrolling(false);
        clearTimeout(resumeTimeout);
        resumeTimeout = setTimeout(() => setIsScrolling(true), 3000);
    };

    const carouselElement = carouselRef.current;
    if (carouselElement) {
        carouselElement.addEventListener('mouseenter', () => setIsScrolling(false));
        carouselElement.addEventListener('mouseleave', () => {
            clearTimeout(resumeTimeout);
            resumeTimeout = setTimeout(() => setIsScrolling(true), 3000);
        });
        carouselElement.addEventListener('mousedown', handleUserInteraction);
        carouselElement.addEventListener('touchstart', handleUserInteraction);
    }

    autoScroll();

    return () => {
        cancelAnimationFrame(animationFrameId);
        if (carouselElement) {
            carouselElement.removeEventListener('mouseenter', () => setIsScrolling(false));
            carouselElement.removeEventListener('mouseleave', () => {});
            carouselElement.removeEventListener('mousedown', handleUserInteraction);
            carouselElement.removeEventListener('touchstart', handleUserInteraction);
        }
    };
}, [isScrolling]);

  // Styles for the new component
  const schemesSectionStyle = {
    padding: '40px 0',
    backgroundColor: 'rgba(255,255,255,0.04)',
    textAlign: 'center',
    borderRadius: '18px',
    marginBottom: '30px',
    overflowX: 'hidden',
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const schemesHeadingStyle = {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#004d40',
    marginBottom: '40px',
  };
  
  const carouselWrapperStyle = {
    maxWidth: '1000px', // A bit wider to show more cards
    margin: '0 auto',
    overflow: 'hidden',
  };

  const carouselInnerStyle = {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'hidden',
    gap: '20px',
    padding: '0 20px',
    boxSizing: 'border-box',
  };

  const cardStyle = {
    minWidth: '300px', // A bit wider than the issue cards
    height: '400px',
    flexShrink: 0,
    backgroundColor: '#004d40', // ✅ NEW: A dark green background for a 'hightech' feel
    color: 'white',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.3)', // ✅ NEW: A stronger shadow
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '20px',
  };
  
  const cardTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '10px',
  };
  
  const cardSummaryStyle = {
    fontSize: '1rem',
    lineHeight: '1.5',
    flexGrow: 1,
    marginBottom: '15px',
  };
  
  const learnMoreButtonStyle = {
    backgroundColor: '#00796B',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    alignSelf: 'flex-end',
  };

  return (
    <section style={schemesSectionStyle}>
      <h2 style={schemesHeadingStyle}>Government Schemes</h2>
      <div style={carouselWrapperStyle}>
        <div ref={carouselRef} style={carouselInnerStyle}>
          {schemesToRender.map((scheme, index) => (
            <div key={`${scheme.id}-${index}`} style={cardStyle}>
              <img src={scheme.image} alt={scheme.title} style={schemeImageStyle} />
               <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <div>
                <h3 style={cardTitleStyle}>{scheme.title}</h3>
                <p style={cardSummaryStyle}>{scheme.summary}</p>
              </div>
              <button style={learnMoreButtonStyle} onClick={(e) => { e.stopPropagation(); handleLearnMore(scheme); }}>
                Learn More
              </button>
            </div>
            </div>
          ))}
        </div>
      </div>
      {selectedScheme && <SchemeDetailModal scheme={selectedScheme} onClose={closeModal} />}
    </section>
  );
}

export default GovernmentSchemes;