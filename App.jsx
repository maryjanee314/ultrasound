import React, { useRef, useState } from 'react';
import Button from './Button';

const App = () => {
    const videoRef = useRef(null); // Reference for the video element
    const [genderNotification, setGenderNotification] = useState(''); // State for gender notification
    const [genderShown, setGenderShown] = useState(false); // Track if gender button was clicked

    // Function to play the ultrasound video
    const handleShowUltrasound = () => {
        if (videoRef.current) {
            videoRef.current.src = 'video.mp4'; // Ensure the path is correct
            videoRef.current.play();
            videoRef.current.style.display = 'block'; // Show the video when playing
            setGenderShown(false); // Reset the Show Gender button each time the video is played
            setGenderNotification(''); // Clear previous gender notification
        }
    };

    // Function to display the gender notification
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
            <Button onClick={handleShowUltrasound}>Show Ultrasound</Button>

            {/* Fullscreen Video with Gender Button */}
            <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
                <video 
                    ref={videoRef} 
                    style={{ display: 'none', width: '100%', height: '100%' }} 
                    loop 
                    onEnded={() => { 
                        videoRef.current.pause(); 
                        videoRef.current.style.display = 'none';
                    }}
                >
                    <source src="video.mp4" type="video/mp4" />
                    Your browser does not support HTML5 video.
                </video>

                {/* Gender button overlay */}
                {videoRef.current && videoRef.current.style.display === 'block' && !genderShown && (
                    <button 
                        onClick={handleShowGender} 
                        className="gender-button"
                        style={{ position: 'absolute', bottom: '20px', right: '20px' }}
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
