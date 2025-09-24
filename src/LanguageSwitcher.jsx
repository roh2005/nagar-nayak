import React from 'react';

// This component will render the custom language buttons
function LanguageSwitcher() {
  // This is the function that triggers the Google Translate widget
  const changeLanguage = (lang) => {
    // This is a special JavaScript function that Google Translate uses
    const translateElement = document.querySelector('.goog-te-combo');
    if (translateElement) {
      translateElement.value = lang;
      translateElement.dispatchEvent(new Event('change'));
    }
  };


  // New style for the select dropdown
const selectStyle = {
  padding: '5px 10px',
  borderRadius: '4px',
  border: '1px solid #ddd',
  backgroundColor: '#f1f1f1',
  cursor: 'pointer',
  fontSize: '14px',
  color: '#2E7D32',
};

  const buttonContainerStyle = {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  };

  const buttonStyle = {
    padding: '5px 10px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    backgroundColor: '#58915e',
    color: 'white',
    fontWeight: '500',
  };

 // After
return (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <select onChange={(e) => changeLanguage(e.target.value)} style={selectStyle}>
      <option value="en">English</option>
      <option value="hi">Hindi</option>
      <option value="fr">French</option>
      <option value="es">Spanish</option>
      <option value="de">German</option>
      <option value="ja">Japanese</option>
      <option value="ru">Russian</option>
    </select>
  </div>
);
}

export default LanguageSwitcher;