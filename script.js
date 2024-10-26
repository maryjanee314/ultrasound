// Ensure NUI is hidden initially
window.onload = function() {
    document.getElementById('menu').classList.add('hidden');
};

// Store video element globally to manage playback
let videoElement = null;

// Listen for messages from the Lua script
window.addEventListener('message', function(event) {
    if (event.data.type === 'openMenu') {
        document.getElementById('menu').classList.remove('hidden');
        document.body.style.display = 'flex';
    } else if (event.data.type === 'closeMenu') {
        // Close the menu and stop video playback
        closeMenu();
    } else if (event.data.type === 'playUltrasound') {
        // Use the local video.mp4 file instead of a URL
        playVideo('ui/video.mp4');
    }
});

// Function to play the video
function playVideo(src) {
    // Stop the current video if it exists
    if (videoElement) {
        videoElement.pause();
        document.body.removeChild(videoElement);
    }

    videoElement = document.createElement('video');
    videoElement.src = src; // Use the local file
    videoElement.autoplay = true;
    videoElement.controls = true; // Show controls for video playback
    videoElement.style.position = 'absolute';
    videoElement.style.top = '50%';
    videoElement.style.left = '50%';
    videoElement.style.transform = 'translate(-50%, -50%)';
    videoElement.style.zIndex = '1000';

    document.body.appendChild(videoElement);
    
    // Remove the video element after it ends
    videoElement.onended = function() {
        closeMenu();
    };
}

// Function to close the menu and stop video playback
function closeMenu() {
    document.getElementById('menu').classList.add('hidden');
    document.body.style.display = 'none';

    // Stop the current video if it exists
    if (videoElement) {
        videoElement.pause();
        document.body.removeChild(videoElement);
        videoElement = null;
    }
}

// Button event listeners
document.getElementById('playUltrasound').onclick = function() {
    fetch(`https://${GetParentResourceName()}/playUltrasound`, {
        method: 'POST',
        body: JSON.stringify({}),
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

document.getElementById('closeMenu').onclick = function() {
    fetch(`https://${GetParentResourceName()}/closeMenu`, {
        method: 'POST',
        body: JSON.stringify({}),
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

// Close NUI on Escape key press
window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeMenu(); // Call the closeMenu function
    }
});
