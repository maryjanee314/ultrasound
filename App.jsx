import React, { useRef, useState } from 'react';
import Button from './Button';

const App = () => {
    const videoRef = useRef(null); // Reference for the video element
    const [genderNotification, setGenderNotification] = useState(''); // State for gender notification
    const [genderShown, setGenderShown] = useState(false); // State to track if gender has been shown
    const [videoPlaying, setVideoPlaying] = useState(false); // Track if video is playing

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

    // Function to show gender notification only once
    const handleShowGender = () => {
        if (!genderShown) {
            const randomGender = Math.random() < 0.5 ? 'Male' : 'Female';
            setGenderNotification(`Gender: ${randomGender}`);
            setGenderShown(true); // Disable further presses
            setTimeout(() => setGenderNotification(''), 3000); // Hide notification after 3 seconds
        }
    };

    return (
        <div>
            <h1>Ultrasound Menu</h1>

            {/* Show Ultrasound Button */}
            {!videoPlaying && (
                <Button className="show-ultrasound" onClick={handleShowUltrasound}>
                    Show Ultrasound
                </Button>
            )}

            {/* Video element with overlay button */}
            <div style={{ position: 'relative' }}>
                <video 
                    ref={videoRef} 
                    style={{ display: 'none', width: '100vw', height: '100vh', objectFit: 'cover' }} 
                    loop 
                    onEnded={() => { 
                        videoRef.current.pause(); 
                        videoRef.current.style.display = 'none';
                        setVideoPlaying(false); // Reset video playing status
                    }}
                >
                    <source src="video.mp4" type="video/mp4" />
                    Your browser does not support HTML5 video.
                </video>

                {/* Show Gender button overlay */}
                {videoPlaying && !genderShown && (
                    <button 
                        onClick={handleShowGender} 
                        className="gender-button"
                    >
                        Show Gender
                    </button>
                )}
            </div>

            {/* Display gender notification if set */}
            {genderNotification && (
                <div className="gender-notification">
                    {genderNotification}
                </div>
            )}
        </div>
    );
};

export default App;
