import React, { useState, useEffect, useRef } from 'react';
import indiaMapLightGreen from './assets/india_map_light_green.png';
import ReportAndTrack from './ReportAndTrack';
import ReportDetail from './ReportDetail';
import Awareness from './Awareness';
import StatusCounter from './StatusCounter';
import Weather from './Weather';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import GovernmentSchemes from './GovernmentSchemes';

const statusStyles = {
  reported: { color: '#d32f2f', fontWeight: 'bold' },
  'in progress': { color: '#f9a825', fontWeight: 'bold' },
  resolved: { color: '#388e3c', fontWeight: 'bold' },
};


const HEADER_HEIGHT = 70;
const NAVBAR_HEIGHT = 60;

function NavButton({ label, isActive, onClick }) {
  const [isHovered, setHovered] = React.useState(false);
  const baseStyle = {
    ...navButtonStyle,
   
    fontWeight: isActive ? '700' : '500',
    borderBottom: isActive ? '2px solid #2E7D32' : 'none',
    backgroundColor: isHovered ? '#E8F5E9' : 'transparent',
    boxShadow: isHovered ? '0 2px 8px rgba(46,125,50,0.15)' : 'none',
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
  };
  return (
    <button
      style={baseStyle}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </button>
  );
}

function HeroSectionButton({ onClick, children }) {
  const [isHovered, setHovered] = React.useState(false);
  const ctaButtonStyle = {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: 'white',
    backgroundColor: isHovered ? '#1B4F22' : '#2E7D32',
    border: 'none',
    padding: '9px 32px',
    borderRadius: '16px',
    cursor: 'pointer',
    boxShadow: isHovered ? '0 6px 14px rgba(27,79,34,0.36)' : '0 2px 6px rgba(46,125,50,0.08)',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease',
    outline: 'none',
    transform: isHovered ? 'translateY(-2px)' : 'none',
  };
  return (
    <button
      style={ctaButtonStyle}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
}

function HowItWorks() {
  const steps = [
    { key: 'report', title: 'Report', description: 'Submit details and location of a civic issue.', icon: '📝' },
    { key: 'track', title: 'Track', description: 'Get real-time updates on your report’s status.', icon: '⏳' },
    { key: 'engage', title: 'Engage', description: 'Collaborate with local authorities and the community.', icon: '💬' },
    { key: 'resolve', title: 'Resolve', description: 'See the problem fixed and provide feedback.', icon: '✅' },
  ];

  return (
    <section style={howItWorksSectionStyle}>
      <h2 style={howItWorksHeadingStyle}>How It Works</h2>
      <div style={stepsContainerStyle}>
        {steps.map(({ key, title, description, icon }) => (
          <div key={key} style={stepStyle}>
            <div style={iconCircleStyle}>{icon}</div>
            <h3 style={stepTitleStyle}>{title}</h3>
            <p style={stepDescriptionStyle}>{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function LatestIssues({ issues, onUpvote, onDownvote, onIssueClick }) {
  const statusStyles = {
    reported: { color: '#d32f2f', fontWeight: 'bold' },
    'in progress': { color: '#f9a825', fontWeight: 'bold' },
    resolved: { color: '#388e3c', fontWeight: 'bold' },
  };
  
  // ✅ NEW: useRef to access the carousel element
  const carouselRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(true);
// ✅ Restored: Create a new array with duplicated cards for a seamless loop
const issuesToRender = [...issues, ...issues.slice(0, 3)];

useEffect(() => {
    let animationFrameId;
    let scrollSpeed = 0.5;
    let lastScrollLeft = 0;
    let resumeTimeout;

    const autoScroll = () => {
        if (carouselRef.current && isScrolling) {
            const { scrollWidth, clientWidth, scrollLeft } = carouselRef.current;
            const cardWidth = 280;
            const gap = 20;
            const duplicateCount = 3;

            const jumpPoint = (cardWidth + gap) * issues.length;

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
        resumeTimeout = setTimeout(() => setIsScrolling(true), 3000); // Resume after 3 seconds
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
            carouselElement.removeEventListener('mouseleave', () => { });
            carouselElement.removeEventListener('mousedown', handleUserInteraction);
            carouselElement.removeEventListener('touchstart', handleUserInteraction);
        }
    };
}, [isScrolling]);


  // ✅ NEW: Effect for continuous scrolling animation
// In LatestIssues component within App.js
useEffect(() => {
  let animationFrameId;
  let scrollSpeed = 0.5;
  let lastScrollLeft = 0;
  let resumeTimeout;

  // In LatestIssues component's useEffect hook
const autoScroll = () => {
    if (carouselRef.current && isScrolling) {
        const { scrollWidth, clientWidth, scrollLeft } = carouselRef.current;
        const cardWidth = 280; // The width of a card
        const gap = 20;       // The gap between cards
        const duplicateCount = 3; // The number of duplicated cards
        
        // ✅ NEW: Calculate the position of the last card in the original set
        const jumpPoint = (cardWidth + gap) * issues.length;

        // ✅ CHANGE THIS LINE: The old logic is replaced with a precise check
        if (scrollLeft >= jumpPoint) {
            carouselRef.current.scrollLeft = 0; // Instant jump back to the start
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

  // ✅ NEW: Define named handler functions
  const handleMouseEnter = () => setIsScrolling(false);
  const handleMouseLeave = () => {
    clearTimeout(resumeTimeout);
    resumeTimeout = setTimeout(() => setIsScrolling(true), 3000);
  };
  const handleUserInteraction = () => {
    setIsScrolling(false);
    clearTimeout(resumeTimeout);
    resumeTimeout = setTimeout(() => setIsScrolling(true), 3000);
  };

  const carouselElement = carouselRef.current;
  if (carouselElement) {
    // ✅ NEW: Attach event listeners using the named functions
    carouselElement.addEventListener('mouseenter', handleMouseEnter);
    carouselElement.addEventListener('mouseleave', handleMouseLeave);
    carouselElement.addEventListener('mousedown', handleUserInteraction);
    carouselElement.addEventListener('touchstart', handleUserInteraction);
  }

  autoScroll();

  return () => {
    cancelAnimationFrame(animationFrameId);
    // ✅ NEW: Clean up with the named functions
    if (carouselElement) {
      carouselElement.removeEventListener('mouseenter', handleMouseEnter);
      carouselElement.removeEventListener('mouseleave', handleMouseLeave);
      carouselElement.removeEventListener('mousedown', handleUserInteraction);
      carouselElement.removeEventListener('touchstart', handleUserInteraction);
    }
  };
}, [isScrolling]);

// A helper function to format the category string
const formatCategory = (cat) => {
  if (!cat) return '';
  // Split words by hyphen, capitalize the first letter, and join with a space
  return cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

 // In LatestIssues component's return statement
return (
  <section style={latestIssuesSectionStyle}>
    <h2 style={latestIssuesHeadingStyle}>Latest Issues</h2>
    <div style={issuesContainerStyle}>
      {/* Added ref to the carousel container */}
        <div style={carouselWrapperStyle}> 
      <div ref={carouselRef} style={carouselInnerStyle}> 
        {/* Make sure to destructure the 'upvotes' and 'onUpvote' props */}
{issuesToRender.map(({ id, description, location, status, image, upvotes,  downvotes, category }, index) => (
    <div key={`${id}-${index}`} style={issueCardStyle} onClick={() => onIssueClick(id)}>
            <img src={image} alt={description} style={issueImageStyle} />
            <div style={issueContentStyle}>
              <h3 style={issueTitleStyle}>{formatCategory(category)}</h3>
              <p style={issueLocationStyle}>{location}</p>
             <span style={{ 
  ...issueStatusStyle, 
  // ✅ Add a safeguard to check if status exists before calling trim()
  ...(status && status.trim().toLowerCase() in statusStyles ? statusStyles[status.trim().toLowerCase()] : {}) 
}}>
  {status}
</span>
              {/* ✅ ADD THE NEW UPVOTE CODE HERE */}
             <div style={upvoteSectionStyle}>
  <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
    <span>{upvotes}</span>
    <button onClick={(event) => { event.stopPropagation(); onUpvote(id); }} style={upvoteButtonStyle}>👍</button>
  </div>
  {/* ✅ NEW: Add the downvote button */}
  <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
    <span>{downvotes}</span>
    <button onClick={(event) => { event.stopPropagation(); onDownvote(id); }} style={{...upvoteButtonStyle, backgroundColor: '#FFCDD2', borderColor: '#D32F2F', color: '#D32F2F'}}>👎</button>
  </div>
</div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  </section>
);
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  
  // ✅ LIFTED STATE: Initializing state from local storage on first render
const [reports, setReports] = useState(() => {
  try {
    const savedReports = localStorage.getItem('reports');
    return savedReports ? JSON.parse(savedReports) : [];
  } catch (error) {
    console.error("Failed to parse reports from localStorage:", error);
    return []; // Return an empty array on error
  }
});

  useEffect(() => {
    const timerID = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timerID);
  }, []);
  
  // ✅ NEW: Effect to load Google Maps script
 // In App.js
useEffect(() => {
    const loadGoogleMapsScript = () => {
        // Check if script is already loaded
        if (document.querySelector('script[src*="maps.googleapis.com"]')) {
            return;
        }
        const script = document.createElement('script');
        // ✅ CORRECTED SYNTAX: Use import.meta.env for Vite
        script.async = true;
        script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=geometry,places`; 
        script.id = 'google-maps-script';
        document.head.appendChild(script);
    };
    loadGoogleMapsScript();
}, []);

  // ✅ NEW: Effect to save reports to local storage whenever 'reports' state changes
  useEffect(() => {
    localStorage.setItem('reports', JSON.stringify(reports));
  }, [reports]);

  // ✅ NEW: The function to be passed as a prop to the child component
  // In App.js
const handleNewReportSubmit = (newReport) => {
  setReports((prevReports) => [
    ...prevReports,
    {
      ...newReport,
      upvotes: 0, // ✅ Add this line to initialize upvotes
        downvotes: 0, 
      comments: [], // ✅ Add this line to initialize an empty comments array
    allottedAuthority: 'Municipal Corporation of Hyderabad', // Placeholder for the authority name
      contactNumber: '9701560948',    // Placeholder for their contact number
    },
  ]);
};
   // In App.js
// ✅ NEW: Function to handle upvoting a report
const handleUpvote = (reportId) => {
  setReports((prevReports) =>
    prevReports.map((report) =>
      report.id === reportId ? { ...report, upvotes: report.upvotes + 1 } : report
    )
  );
};


const handleDownvote = (reportId) => {
  setReports((prevReports) =>
    prevReports.map((report) =>
      report.id === reportId ? { ...report, downvotes: report.downvotes + 1 } : report
    )
  );
};

// In App.js
const calculateStatusCounts = () => {
  const counts = { reported: 0, 'in progress': 0, resolved: 0 };
  reports.forEach(report => {
    const status = report.status.toLowerCase().trim();
    if (counts.hasOwnProperty(status)) {
      counts[status]++;
    }
  });
  return counts;
};


// In App.js
// ✅ NEW: Function to handle clicking on an issue card
const handleIssueClick = (id) => {
    setSelectedReportId(id);
    setCurrentPage('report_detail');
};

// ✅ NEW: Function to go back from the detail page
const handleBack = () => {
    setSelectedReportId(null);
    setCurrentPage('home');
};

  // New function to handle tracking, which will be passed to the child component
const handleTrackReport = (id) => {
    const foundReport = reports.find(r => r.id === id);
    // We can then pass this found report back up to App's state or a
    // state within ReportAndTrack to display it.
    // For now, let's log it to show it works.
    console.log("Found report:", foundReport);
    return foundReport;
};


  const formattedTime = currentTime.toLocaleTimeString();
  const formattedDate = currentTime.toLocaleDateString();

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  const navButtons = [
    { key: 'home', label: 'Home' },
    { key: 'report_track', label: 'Report & Track' },
    { key: 'awareness', label: 'Awareness' },
    { key: 'about_us', label: 'About Us' },
    { key: 'contact_us', label: 'Contact Us' },
  ];

  return (
    <div style={mainContainerStyle}>
      <header style={headerStyle}>
        <div style={logoAbsoluteStyle}>
          <a href="/" style={logoLinkStyle}>Nagar Nayak</a>
        </div>
        <div style={headerRightSectionStyle}>
          <div style={dateTimeStyle}>
            <div>{formattedDate}</div>
            <div>{formattedTime}</div>
          </div>
          <Weather />
       <div style={profileSectionStyle}>
  {/* The profile section is now always visible */}
  
</div>
        </div>
      </header>

      <nav style={navbarStyle}>
        {navButtons.map(({ key, label }) => (
          <NavButton key={key} label={label} isActive={currentPage === key} onClick={() => setCurrentPage(key)} />
        ))}
      </nav>

      <div style={fixedBgStyle}>
        <img src={indiaMapLightGreen} alt="India Map" style={bgMapStyle} />
      </div>

   <div style={contentWrapperStyle}>
  {currentPage === 'home' && (
    <>
      <section style={heroSectionStyle}>
        <p style={heroSubtitleStyle}>
          Our civic issue reporting platform empowers every citizen to take an active role in improving their communities. Through our easy-to-use tools, you can quickly report problems such as potholes, street lighting issues, waste management concerns, or water supply disruptions. Track your reports' progress and engage with your neighbors and local government to ensure timely resolution. Together, we foster transparency, accountability, and civic responsibility — making our neighborhoods cleaner, safer, and better places to live. Join us today and be a catalyst for positive change.
        </p>
        <HeroSectionButton onClick={() => setCurrentPage('report_track')}>
          Report an Issue
        </HeroSectionButton>
      </section>
      <HowItWorks />
      {/* ✅ CORRECT: Pass both onUpvote and onIssueClick props */}
      <LatestIssues
        issues={reports}
        onUpvote={handleUpvote}
         onDownvote={handleDownvote}
        onIssueClick={handleIssueClick}
      />

<h2 style={liveStatsHeadingStyle}>Live Stats</h2>

      {/* ✅ NEW: Render the status counters here */}
    <div style={statusTrackerContainerStyle}>
      <StatusCounter label="Reported" count={calculateStatusCounts().reported} />
      <StatusCounter label="In Progress" count={calculateStatusCounts()['in progress']} />
      <StatusCounter label="Resolved" count={calculateStatusCounts().resolved} />
    </div>
     <GovernmentSchemes />
    </>
  )}

  {currentPage === 'report_track' && (
    <ReportAndTrack
      onReportSubmit={handleNewReportSubmit}
      onTrackReport={handleTrackReport}
    />
  )}
  
  {/* ✅ NEW: Add the conditional rendering for the ReportDetail page */}
  {currentPage === 'report_detail' && (
    <ReportDetail
      report={reports.find(r => r.id === selectedReportId)}
      onBack={handleBack}
    />
  )}

 {currentPage === 'awareness' && (
  <Awareness />
)}

  {currentPage === 'about_us' && (
  <AboutUs />
)}

{currentPage === 'contact_us' && (
  <ContactUs />
)}
</div>
    </div>
  );
}

export default App;

// Styles

const mainContainerStyle = {
  position: 'relative',
  width: '100vw',
  minHeight: '100vh',
  background: 'white', // ✅ UPDATED: White background
  overflowX: 'hidden', // ✅ FIX: Prevents the global horizontal scrollbar
};

const contentWrapperStyle = {
  position: 'relative',
  zIndex: 2,
  marginTop: HEADER_HEIGHT + NAVBAR_HEIGHT,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const headerStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: `${HEADER_HEIGHT}px`,
  backgroundColor: '#2E7D32',
  color: 'white',
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const logoAbsoluteStyle = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  pointerEvents: 'auto',
  whiteSpace: 'nowrap',
};

const logoLinkStyle = {
  fontSize: '30px',
  fontWeight: 'bold',
  color: 'white',
  textDecoration: 'none',
  cursor: 'pointer',
};

// New styles for the status tracker section
const statusTrackerContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '40px',
  marginTop: '15px',
  padding: '20px',
  width: '100%',
};

const navButtonStyle = {
  border: 'none',
  color: '#2E7D32',
  cursor: 'pointer',
  fontSize: '17px',
  padding: '10px 18px',
  borderRadius: '4px',
  transition: 'all 0.3s ease',
  fontWeight: '500',
  backgroundColor: 'transparent',
};

const headerRightSectionStyle = {
  marginLeft: 'auto',
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  paddingRight: '20px',
};

const dateTimeStyle = {
  fontSize: '14px',
  textAlign: 'right',
  whiteSpace: 'nowrap',
};

const profileSectionStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const authButtonsStyle = {
  display: 'flex',
  gap: '10px',
};

const buttonStyle = {
  padding: '5px 10px',
  borderRadius: '4px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '14px',
  backgroundColor: '#222',
  color: 'white',
  fontWeight: '500',
};

const profileStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const profilePicStyle = {
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  objectFit: 'cover',
};

const userNameStyle = {
  color: 'white',
  fontSize: '14px',
  marginTop: '5px',
  fontWeight: '500',
  whiteSpace: 'nowrap',
  textAlign: 'center',
};

const logoutButtonStyle = {
  marginTop: '4px',
  fontSize: '12px',
  height: '28px',
  padding: '3px 8px',
  cursor: 'pointer',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: '#222',
  color: 'white',
  alignSelf: 'center',
};

const navbarStyle = {
  position: 'fixed',
  top: HEADER_HEIGHT,
  left: 0,
  width: '100%',
  height: 'auto', // Make height flexible
  backgroundColor: '#fff',
  zIndex: 999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap', // This is key to letting buttons wrap
  padding: '10px 0',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  gap: '15px', // Reduce the gap for smaller screens
};

const heroSectionStyle = {
  width: '100%',
  padding: '40px 16px 44px 16px',
  boxSizing: 'border-box',
  background: 'rgba(255,255,255,0.03)', // nearly transparent for map visibility
  textAlign: 'center',
  borderRadius: '18px',
  marginBottom: '20px',
};

const heroSubtitleStyle = {
  fontSize: '1.2rem',
  color: '#2E7D32',
  marginBottom: '16px',
  marginTop: 0,
  fontWeight: 500,
};

const fixedBgStyle = {
  position: 'fixed',
  top: HEADER_HEIGHT + NAVBAR_HEIGHT,
  left: 0,
  width: '100vw',
  height: `calc(100vh - ${HEADER_HEIGHT + NAVBAR_HEIGHT}px)`,
  backgroundColor: 'white',
  zIndex: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const bgMapStyle = {
  maxWidth: '80vw',
  maxHeight: '85vh',
  objectFit: 'contain',
  display: 'block',
  opacity: 1,
};

const howItWorksSectionStyle = {
  width: '100%',
  padding: '40px 20px',
  background: 'rgba(255,255,255,0.04)', // transparent background
  textAlign: 'center',
  borderRadius: '18px',
  marginBottom: '30px',
};

const howItWorksHeadingStyle = {
  fontSize: '2rem',
  fontWeight: '700',
  color: '#2E7D32',
  marginBottom: '40px',
};

const stepsContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '30px',
  flexWrap: 'wrap',
};

const stepStyle = {
  maxWidth: '250px',
  minWidth: '180px',
  flex: '1 1 180px',
  backgroundColor: 'rgba(255,255,255,0.48)',
  borderRadius: '12px',
  padding: '20px',
  boxShadow: '0 4px 16px rgb(46 125 50 / 0.1)',
  margin: '10px',
  transition: 'transform 0.3s ease',
};

const iconCircleStyle = {
  fontSize: '32px',
  width: '60px',
  height: '60px',
  lineHeight: '60px',
  margin: '0 auto 20px',
  borderRadius: '50%',
  backgroundColor: '#E6F1E9',
  color: '#2E7D32',
  boxShadow: 'inset 0 0 5px #B6DFB3',
};

const stepTitleStyle = {
  fontSize: '1.25rem',
  fontWeight: '700',
  color: '#2E7D32',
  marginBottom: '12px',
};

const stepDescriptionStyle = {
  fontSize: '1rem',
  color: '#4C774C',
  lineHeight: '1.5',
};

const latestIssuesSectionStyle = {
  padding: '40px 0',
  backgroundColor: 'rgba(255,255,255,0.04)',
  textAlign: 'center',
  borderRadius: '18px',
  marginBottom: '30px',
  overflowX: 'hidden',
};

const latestIssuesHeadingStyle = {
  fontSize: '2rem',
  fontWeight: '700',
  color: '#2E7D32',
  marginBottom: '40px',
};

const issuesContainerStyle = {
  display: 'flex',
  flexWrap: 'nowrap',
  overflowX: 'auto',
  gap: '20px',
  padding: '0 20px 10px 20px',
  boxSizing: 'border-box',
};
const carouselInnerStyle = {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'hidden', // Hides the scrollbar
    gap: '20px',
    padding: '0 20px',
    boxSizing: 'border-box',
};
const issueCardStyle = {
  minWidth: '280px',
  height: '420px', // ✅ NEW: Set a fixed height for the entire card
  display: 'flex', // ✅ NEW: Use flexbox for consistent layout
  flexDirection: 'column', // ✅ NEW: Stack content vertically
  flexShrink: 0,
  backgroundColor: 'white',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(46, 125, 50, 0.1)',
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
};

const issueImageStyle = {
  width: '100%',
  height: '180px',
  borderTopLeftRadius: '12px',
  borderTopRightRadius: '12px',
  objectFit: 'cover', // ✅ REMAINS: Crops the image to fit without stretching
  flexShrink: 0, // ✅ NEW: Prevents the image from shrinking
};

const issueContentStyle = {
  padding: '16px',
  flexGrow: 1,
};

const issueTitleStyle = {
  fontSize: '1.25rem',
  fontWeight: '700',
  margin: '0 0 8px 0',
  color: '#2E7D32',
};

const issueLocationStyle = {
  fontSize: '0.95rem',
  color: '#607D24',
  margin: '0 0 12px 0',
};

const issueStatusStyle = {
  fontWeight: '700',
  padding: '5px 12px',
  borderRadius: '20px',
  fontSize: '0.8rem',
  display: 'inline-block',
  color: 'white',
};

// In the styles section of your code
const upvoteSectionStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginTop: '10px',
  color: '#2E7D32',
  fontWeight: '600',
};

const upvoteButtonStyle = {
  fontSize: '1.2rem',
  backgroundColor: '#E8F5E9',
  border: 'none',
  borderRadius: '50%',
  width: '32px',
  height: '32px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background-color 0.2s',
};

// New style for the Live Stats heading
const liveStatsHeadingStyle = {
  fontSize: '2rem',
  fontWeight: '700',
  color: '#2E7D32',
  marginTop: '40px',
  textAlign: 'center',
};

// New styles for the carousel container
const carouselWrapperStyle = {
  maxWidth: '900px', // Set a fixed width for the container
  margin: '0 auto',  // Center the container
  overflow: 'hidden', // Hide any content that goes beyond the max width
};