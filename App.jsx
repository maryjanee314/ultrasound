import React, { useState } from 'react';
import './styles/App.css';

function App() {
  const [showGender, setShowGender] = useState(false);

  const handleShowGender = () => {
    setShowGender(true);
  };

  const handleCloseUi = () => {
    fetch(`https://your_resource_name/closeUi`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'close' }),
    });
    setShowGender(false); // Close the video overlay
  };

  return (
    <div className="app-container">
      {!showGender ? (
        <button className="button" onClick={handleShowGender}>
          Show Gender
        </button>
      ) : (
        <div className="video-container">
          <button className="close-button" onClick={handleCloseUi}>
            ✕
          </button>
          <video className="video" autoPlay loop>
            <source src="/path/to/your/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}

export default App;
