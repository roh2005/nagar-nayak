import React, { useEffect, useRef } from 'react';

function ReportDetail({ report, onBack }) {
    // ✅ NEW: useRef to get a reference to the map div
    const mapRef = useRef(null);

    // ✅ NEW: useEffect to handle map initialization
    useEffect(() => {
        // Check if report and coordinates exist and the Google Maps script is loaded
        if (report?.locationCoords && window.google) {
            const map = new window.google.maps.Map(mapRef.current, {
                center: { lat: report.locationCoords.latitude, lng: report.locationCoords.longitude },
                zoom: 15,
                mapTypeControl: false,
                fullscreenControl: false,
                streetViewControl: false,
                zoomControl: true, // You might want to enable this for a single-issue view
            });

            new window.google.maps.Marker({
                position: { lat: report.locationCoords.latitude, lng: report.locationCoords.longitude },
                map: map,
                title: 'Issue Location',
            });
        }
    }, [report]); // Rerun the effect whenever the report data changes

    // This is where all the report details will be rendered
    if (!report) {
        return <div>Report not found.</div>;
    }

    return (
        <div style={reportDetailWrapperStyle}>
        <div style={reportDetailContainerStyle}>
            <button onClick={onBack} style={backButtonStyle}>← Back</button>
            <h2 style={reportDetailHeadingStyle}>{report.description}</h2>
            <img src={report.image} alt={report.description} style={reportDetailImageStyle} />
            
            <div style={reportDetailInfoStyle}>
                <p><strong>Status:</strong> {report.status}</p>
                <p><strong>Location:</strong> {report.location}</p>
                <p><strong>Category:</strong> {report.category}</p>
            </div>

            {/* ✅ NEW: Conditional rendering for the map */}
            {report.locationCoords && (
                <div style={mapContainerStyle}>
                    <h3 style={mapHeadingStyle}>Location on Map</h3>
                    <div ref={mapRef} style={{ width: '100%', height: '400px', borderRadius: '12px' }}></div>
                </div>
            )}
        </div>
         </div>
    );
}

// Add some basic styles for the new component
const reportDetailContainerStyle = {
    padding: '40px',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: '18px',
    margin: '20px auto',
    maxWidth: '800px',
    color: '#2E7D32',
};

const reportDetailHeadingStyle = {
    fontSize: '2rem',
    marginBottom: '20px',
    textAlign: 'center',
};

const reportDetailImageStyle = {
    width: '100%',
    borderRadius: '12px',
    marginBottom: '20px',
    objectFit: 'cover',
    maxHeight: '400px',
};

const reportDetailInfoStyle = {
    fontSize: '1.1rem',
    lineHeight: '1.6',
};

const backButtonStyle = {
    backgroundColor: '#388e3c',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '20px',
};

// ✅ NEW: Add new styles for the map container and heading
const mapContainerStyle = {
    marginTop: '30px',
    padding: '20px',
    backgroundColor: 'rgba(46,125,50,0.1)',
    borderRadius: '12px',
};

const mapHeadingStyle = {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '15px',
    color: '#2E7D32',
};

 const reportDetailWrapperStyle = {
  maxWidth: '900px', // Set a fixed max width
  margin: '0 auto',  // Center the container
};

 
export default ReportDetail;