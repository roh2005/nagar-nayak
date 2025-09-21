import React, { useState } from 'react';

function ContactUs() {
  const [formData, setFormData] = useState({ phoneNumber: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to a server here.
    console.log('Form Submitted:', formData);
    setIsSubmitted(true);
  };

  const pageContainerStyle = {
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

 const contactInfoStyle = {
  display: 'flex',
  flexDirection: 'column', // ✅ NEW: Stack items vertically
  alignItems: 'center',    // ✅ NEW: Center the content
  gap: '8px',
  marginBottom: '40px',
};



  const socialIconStyle = {
    width: '40px',
    height: '40px',
  };

  const formSectionStyle = {
    marginTop: '40px',
    padding: '30px',
    backgroundColor: 'rgba(46,125,50,0.1)',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  };


const socialIconsContainerStyle = { // ✅ NEW: A new style for the social icons
  display: 'flex',
  gap: '20px',                     // Add some spacing between the icons
  marginTop: '10px',
};
   
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    textAlign: 'left',
  };

  const labelStyle = {
    fontSize: '1rem',
    fontWeight: '600',
  };

  const inputStyle = {
    marginTop: '6px',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  };
  
  const submitButtonStyle = {
    backgroundColor: '#2E7D32',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    fontSize: '1.1rem',
    fontWeight: '600',
    borderRadius: '18px',
    cursor: 'pointer',
    transition: 'opacity 0.3s',
    marginTop: '10px',
  };

  return (
    <div style={pageContainerStyle}>
      <h1 style={headingStyle}>Contact Us</h1>
      <p>We'd love to hear from you. Feel free to reach out to us through any of the channels below.</p>

      {/* ✅ SECTION 1: Contact Details & Social Links */}
     <div style={contactInfoStyle}>
  <p>+91 98765 43210</p>
  <p>wagdarerohan08@gmail.com</p>
  {/* ✅ NEW: Use the new horizontal style for social icons */}
  <div style={socialIconsContainerStyle}>
    <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
      <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" style={socialIconStyle} />
    </a>
    <a href="https://facebook.com/nagarnayak" target="_blank" rel="noopener noreferrer">
      <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" style={socialIconStyle} />
    </a>
    <a href="https://twitter.com/nagarnayak" target="_blank" rel="noopener noreferrer">
      <img src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg" alt="Twitter" style={socialIconStyle} />
    </a>
  </div>
</div>

      {/* ✅ SECTION 2: The Form */}
      <div style={formSectionStyle}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '600' }}>Drop a Line for Us</h2>
        {isSubmitted ? (
          <p style={{ color: '#2E7D32', fontWeight: 'bold' }}>Thank you for your message! We'll get back to you soon.</p>
        ) : (
          <form onSubmit={handleSubmit} style={formStyle}>
            <label style={labelStyle}>
              Your Phone Number:
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                style={inputStyle}
                required
              />
            </label>
            <label style={labelStyle}>
              Your Message:
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="5"
                style={inputStyle}
                required
              />
            </label>
            <button type="submit" style={submitButtonStyle}>Submit</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ContactUs;