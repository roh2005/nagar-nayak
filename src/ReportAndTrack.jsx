import React, { useState, useEffect } from 'react';
import SubmissionPopup from './SubmissionPopup';
import Notification from './Notification';

// ✅ Accepts 'onReportSubmit' as a prop from the parent App component
function ReportAndTrack({ onReportSubmit, onTrackReport }) {
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    location: '',
    category: '',
    image: '',
    locationCoords: null, // ✅ UPDATED: To store lat/long
  });

  const [trackId, setTrackId] = useState('');
  const [trackedReport, setTrackedReport] = useState(null);
  const [popupReport, setPopupReport] = useState(null); 
  const [notification, setNotification] = useState({ message: '', type: '' });
  const canSubmit =
    agreed && formData.description && formData.location && formData.category && formData.image;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  // ✅ NEW: Function to get user's current location
  const handleGetLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const long = position.coords.longitude;
                setFormData((prev) => ({
                    ...prev,
                    locationCoords: { latitude: lat, longitude: long },
                }));
                // ✅ CORRECT: Only use the state-based notification
                setNotification({ message: 'Location captured successfully!', type: 'success' });
                setTimeout(() => setNotification({ message: '', type: '' }), 2000); // Hide after 2 seconds
            },
            (error) => {
                let errorMessage = "Could not get your location. Please ensure location services are enabled.";
                if (error.code === 1) {
                    errorMessage = "Location access denied. Please enable it in your browser settings.";
                }
                // ✅ CORRECT: Only use the state-based notification
                setNotification({ message: errorMessage, type: 'error' });
                setTimeout(() => setNotification({ message: '', type: '' }), 3000);
            }
        );
    } else {
        // ✅ CORRECT: Only use the state-based notification
        setNotification({ message: "Geolocation is not supported by your browser.", type: 'error' });
        setTimeout(() => setNotification({ message: '', type: '' }), 3000);
    }
};

  const closePopup = () => {
  setPopupReport(null);
};

 const handleSubmit = (e) => {
    e.preventDefault();
    if (canSubmit) {
      // ✅ UPDATED: Use a more unique ID generation
      const reportId = `R-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const newReport = {
        ...formData,
        id: reportId,
        status: 'Reported',
        title: formData.description.split(' ').slice(0, 3).join(' ') + '...',
        image: formData.image,
        locationCoords: formData.locationCoords,
        submittedAt: new Date().toISOString(), 
      };

      

      // ✅ Calls the parent's function instead of local state/storage
      onReportSubmit(newReport); 
      setPopupReport(newReport); 

      // Display a message box instead of alert()
     

      // Reset the form after submission
      setFormData({ description: '', location: '', category: '', image: '', locationCoords: null });
      setAgreed(false);
    }
  };

 // In ReportAndTrack.js
const handleTrack = (e) => {
  e.preventDefault();
  // ✅ NEW: Call the prop function from App.js to find the report
  const found = onTrackReport(trackId);
  setTrackedReport(found || null);
};
  
  // ✅ NEW: useEffect to handle Google Map initialization
  useEffect(() => {
    if (formData.locationCoords) {
        const mapContainer = document.getElementById('map-container');
        if (mapContainer && window.google) {
            const map = new window.google.maps.Map(mapContainer, {
                center: { lat: formData.locationCoords.latitude, lng: formData.locationCoords.longitude },
                zoom: 15,
                mapTypeControl: false,
                fullscreenControl: false,
                streetViewControl: false,
                zoomControl: false,
            });

            new window.google.maps.Marker({
                position: { lat: formData.locationCoords.latitude, lng: formData.locationCoords.longitude },
                map: map,
                title: 'Issue Location',
            });
        }
    }
}, [formData.locationCoords]);

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>How to Report an Issue</h2>
      <ol style={instructionsListStyle}>
        <li>Clearly describe the civic issue including location.</li>
        <li>Choose an appropriate category for the issue.</li>
        <li>Submit accurate and truthful information to help resolution.</li>
      </ol>

      <div style={agreeContainerStyle}>
        <input
          id="agree-checkbox"
          type="checkbox"
          checked={agreed}
          onChange={() => setAgreed(!agreed)}
          style={checkboxStyle}
        />
        <label htmlFor="agree-checkbox" style={agreeLabelStyle}>
          I agree to provide correct and honest information.
        </label>
      </div>

      {agreed && (
        <form onSubmit={handleSubmit} style={formStyle}>
          <label style={labelStyle}>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              style={textareaStyle}
              required
            />
          </label>

          <label style={labelStyle}>
            Location:
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              style={inputStyle}
              required
            />
          </label>
          
          {/* ✅ NEW: Button to get user's location */}
          <button
            type="button" 
            onClick={handleGetLocation}
            style={{
              ...submitButtonStyle,
              backgroundColor: '#4CAF50',
              marginBottom: '10px',
            }}
          >
            Location of That Issue
          </button>
          
          {/* ✅ NEW: Display coordinates if available */}
          {formData.locationCoords && (
            <p style={{
              fontSize: '0.9rem',
              color: '#4C774C',
              marginTop: '-5px',
              marginBottom: '15px'
            }}>
              Location Captured: Latitude {formData.locationCoords.latitude.toFixed(4)}, Longitude {formData.locationCoords.longitude.toFixed(4)}
            </p>
          )}

          {/* ✅ NEW: Map Container */}
          {formData.locationCoords && (
            <div id="map-container" style={{ width: '100%', height: '300px', borderRadius: '12px', overflow: 'hidden', marginTop: '20px' }}></div>
          )}

          <label style={labelStyle}>
            Category:
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              style={selectStyle}
              required
            >
              <option value="">--Select--</option>
              <option value="pothole">Pothole</option>
              <option value="streetlight">Streetlight</option>
              <option value="waste">Waste Management</option>
              <option value="water">Water Supply</option>
            </select>
          </label>

          <label style={labelStyle}>
            Capture Photo:
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageCapture}
              style={{ marginTop: '6px' }}
              required
            />
          </label>

          {formData.image && (
            <img
              src={formData.image}
              alt="Captured issue"
              style={{ marginTop: '10px', width: '100%', borderRadius: '10px' }}
            />
          )}

          <button
            type="submit"
            disabled={!canSubmit}
            style={{
              ...submitButtonStyle,
              opacity: canSubmit ? 1 : 0.5,
              cursor: canSubmit ? 'pointer' : 'not-allowed',
            }}
          >
            Report Now
          </button>
        </form>
      )}

      <div style={{ marginTop: '40px' }}>
        <h2 style={headingStyle}>Track Your Report</h2>
        <form onSubmit={handleTrack} style={formStyle}>
          <input
            type="text"
            placeholder="Enter Report ID (e.g., R-12345678910-abcd5dde54)"
            value={trackId}
            onChange={(e) => setTrackId(e.target.value)}
            style={inputStyle}
          />
          <button type="submit" style={submitButtonStyle}>
            Track
          </button>
        </form>

        {trackedReport ? (
          <div style={trackedBoxStyle}>
            <p><strong>ID:</strong> {trackedReport.id}</p>
            <p><strong>Status:</strong> {trackedReport.status}</p>
            <p><strong>Category:</strong> {trackedReport.category}</p>  
            <p><strong>Allotted Authority:</strong> {trackedReport.allottedAuthority}</p>
            <p><strong>Contact:</strong> {trackedReport.contactNumber}</p>
    
            <p><strong>Location:</strong> {trackedReport.location}</p>
            
            {/* Display location coordinates if available */}
            {trackedReport.locationCoords && (
              <p>
                <strong>Coordinates:</strong> {trackedReport.locationCoords.latitude.toFixed(4)}, {trackedReport.locationCoords.longitude.toFixed(4)}
              </p>
            )}
            <img
              src={trackedReport.image}
              alt="Reported issue"
              style={{ marginTop: '10px', width: '100%', borderRadius: '10px' }}
            />
          </div>
        ) : trackId ? (
          <p style={{ color: 'red' }}>No report found for ID: {trackId}</p>
        ) : null}
             <Notification message={notification.message} type={notification.type} />

         {popupReport && <SubmissionPopup report={popupReport} onClose={closePopup} />}
      </div>
    </div>
  );
}

// Styles
const containerStyle = { margin: '20px auto', maxWidth: '600px', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '18px', padding: '30px', color: '#2E7D32' };
const headingStyle = { fontSize: '1.8rem', fontWeight: '700', marginBottom: '20px', textAlign: 'center' };
const instructionsListStyle = { marginBottom: '20px' };
const agreeContainerStyle = { display: 'flex', alignItems: 'center', marginBottom: '20px' };
const checkboxStyle = { marginRight: '12px', width: '18px', height: '18px' };
const agreeLabelStyle = { fontSize: '1rem', cursor: 'pointer' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '15px' };
const labelStyle = { display: 'flex', flexDirection: 'column', fontSize: '1rem', fontWeight: '600' };
const textareaStyle = { marginTop: '6px', borderRadius: '6px', outline: '2px solid #2E7D32', border: '1px solid #ccc', padding: '8px', resize: 'vertical', fontSize: '1rem' };
const inputStyle = { marginTop: '6px', borderRadius: '6px', border: '1px solid #ccc', padding: '8px', fontSize: '1rem' };
const selectStyle = { marginTop: '6px', borderRadius: '6px', border: '1px solid #ccc', padding: '8px', fontSize: '1rem' };
const submitButtonStyle = { backgroundColor: '#2E7D32', border: 'none', color: 'white', padding: '12px 20px', fontSize: '1.1rem', fontWeight: '600', borderRadius: '18px', cursor: 'pointer', transition: 'opacity 0.3s', marginTop: '10px' };
const trackedBoxStyle = { marginTop: '20px', padding: '15px', borderRadius: '12px', background: 'rgba(46,125,50,0.1)' };

export default ReportAndTrack;
    