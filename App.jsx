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

    // Function to take a screenshot
    const handleScreenshot = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;

        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(blob => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64data = reader.result; // Convert to base64
                // Send to server
                fetch('https://your-server-endpoint/screenshot', { // Update with your server URL
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        image: base64data,
                        playerName: 'PlayerNameHere', // Update with actual player name
                    }),
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Screenshot sent successfully:', data);
                })
                .catch((error) => {
                    console.error('Error sending screenshot:', error);
                });
            };
            reader.readAsDataURL(blob);
        });
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

                {/* Screenshot button overlay */}
                {videoPlaying && (
                    <button 
                        onClick={handleScreenshot} 
                        className="screenshot-button"
                    >
                        Take Screenshot
                    </button>
                )}
            </div>

            {/* Optionally, you could add a message that the gender has already been shown */}
            {genderShown && (
                <div className="gender-notification">
                    Gender information has already been shown.
                </div>
            )}
        </div>
    );
};

export default App;
