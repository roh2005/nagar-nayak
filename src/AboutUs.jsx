import React from 'react';

function AboutUs() {
  const containerStyle = {
    padding: '40px',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: '18px',
    margin: '20px auto',
    maxWidth: '900px',
    color: '#2E7D32',
    textAlign: 'center',
  };

  const headingStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '20px',
  };
  
  const subheadingStyle = {
    fontSize: '1.8rem',
    fontWeight: '600',
    color: '#4C774C',
    marginTop: '40px',
    marginBottom: '15px',
  };

  const paragraphStyle = {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    marginBottom: '20px',
  };

  const valuesContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    flexWrap: 'wrap',
    marginTop: '20px',
  };

  const valueCardStyle = {
    flex: '1 1 250px',
    padding: '20px',
    backgroundColor: 'rgba(46,125,50,0.1)',
    borderRadius: '10px',
  };

  const valueTitleStyle = {
    fontSize: '1.2rem',
    fontWeight: '700',
    marginBottom: '10px',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>About Nagar Nayak</h1>
      
      <p style={paragraphStyle}>
        Nagar Nayak is a civic issue reporting platform built to empower every citizen to take an active role in improving their community. Our mission is to create a more transparent and accountable local government by connecting citizens with the authorities responsible for maintaining civic infrastructure.
      </p>

      <h2 style={subheadingStyle}>Our Vision</h2>
<p style={paragraphStyle}>
  To build a future where every city is a smart city, driven by the collective power of its citizens. We envision a society where civic issues are not just problems, but opportunities for community action and governmental accountability.
</p>

      <h2 style={subheadingStyle}>Our Mission</h2>
      <p style={paragraphStyle}>
        To foster a community where every voice is heard, and every civic issue is addressed with transparency and efficiency. We believe a better city is built by active, engaged citizens.
      </p>
      
      <h2 style={subheadingStyle}>Our Core Values</h2>
      <div style={valuesContainerStyle}>
        <div style={valueCardStyle}>
          <h3 style={valueTitleStyle}>Transparency</h3>
          <p>We provide real-time status updates on every report, ensuring you are always informed.</p>
        </div>
        <div style={valueCardStyle}>
          <h3 style={valueTitleStyle}>Community</h3>
          <p>We enable a collective effort to identify and solve problems that matter most to local residents.</p>
        </div>
        <div style={valueCardStyle}>
          <h3 style={valueTitleStyle}>Responsibility</h3>
          <p>We hold local authorities accountable for their performance and celebrate timely resolutions.</p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;