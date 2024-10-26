import React, { useRef, useState } from 'react';
import Button from './Button';

const App = () => {
    const videoRef = useRef(null); // Reference for the video element
    const [videoPlaying, setVideoPlaying] = useState(false); // Track if video is playing
    const [genderShown, setGenderShown] = useState(false); // Track if gender has been shown
    const additionalVideos = ['video1.mp4', 'video2.mp4']; // Array of additional videos

    // Function to play the ultrasound video
    const handleShowUltrasound = () => {
        if (videoRef.current) {
            videoRef.current.src = 'video.mp4'; // Ensure the path is correct
            videoRef.current.play();
            videoRef.current.style.display = 'block'; // Show the video when playing
            setVideoPlaying(true); // Video is now playing
            setGenderShown(false); // Reset gender button for new video session
        }
    };

    // Function to switch to a random additional video
    const handleShowGender = () => {
        if (videoPlaying && !genderShown) {
            const randomIndex = Math.floor(Math.random() * additionalVideos.length);
            const newSrc = additionalVideos[randomIndex]; // Change to a random additional video
            console.log("Switching to video:", newSrc); // Log the source
            videoRef.current.src = newSrc; // Set the new source
            videoRef.current.play(); // Play the new video
            setGenderShown(true); // Mark gender as shown to disable button
        }
    };

    const handleCloseUi = () => {
      fetch(`https://ultrasound/closeUi`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'close' })
      });
  };
  

    return (
      <div className="app-container">
        {!showGender ? (
          <button className="pink-button" onClick={handleShowGender}>
            Show Gender
          </button>
        ) : (
          <video className="video-player" autoPlay loop>
            <source src="/path/to/your/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        <button className="close-button" onClick={handleCloseUi}>Close</button>
      </div>
    );
  }
  
  export default App;
