import React, { useState } from 'react';
import './App.css';

function App() {
  const [showGender, setShowGender] = useState(false);

  const handleShowGender = () => {
    setShowGender(true);
    // Logic to play the gender reveal video can go here if needed.
  };

  const handleCloseUi = () => {
    fetch(`https://your_resource_name/closeUi`, { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'close' })
    });
    setShowGender(false); // Close the video overlay
  };

  return (
    <div className="app-container">
      {!showGender ? (
        <button className="pink-button" onClick={handleShowGender}>
          Show Gender
        </button>
      ) : (
        <div className="video-container">
          <button className="overlay-close-button" onClick={handleCloseUi}>✕</button>
          <video className="video-player" autoPlay loop>
            <source src="/path/to/your/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}

export default App;
