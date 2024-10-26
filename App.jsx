import React, { useRef, useState } from 'react';
import Button from './Button';

const App = () => {
    const videoRef = useRef(null); // Reference for the video element
    const [genderNotification, setGenderNotification] = useState(''); // State for gender notification
    const [genderShown, setGenderShown] = useState(false); // State to track if gender has been shown

    // Function to play the ultrasound video
    const handleShowUltrasound = () => {
        if (videoRef.current) {
            videoRef.current.src = 'video.mp4'; // Ensure the path is correct
            videoRef.current.play();
            videoRef.current.style.display = 'block'; // Show the video when playing
            setGenderShown(false); // Reset gender button each time video is played
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
            <Button onClick={handleShowUltrasound}>Show Ultrasound</Button>

            {/* Video element with overlay button */}
            <div style={{ position: 'relative' }}>
                <video 
                    ref={videoRef} 
                    style={{ display: 'none', width: '100%', maxWidth: '600px' }} 
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
                {videoRef.current && videoRef.current.style.display === 'block' && (
                    <button 
                        onClick={handleShowGender} 
                        className="gender-button"
                        disabled={genderShown} // Disable after first click
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
