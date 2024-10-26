document.getElementById('playUltrasound').addEventListener('click', function() {
    fetch('https://ultrasound/playUltrasound', { method: 'POST' });
});

document.getElementById('closeMenu').addEventListener('click', function() {
    fetch('https://ultrasound/closeMenu', { method: 'POST' });
});

// Close the video when the escape key is pressed
window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        fetch('https://ultrasound/closeMenu', { method: 'POST' });
    }
});

// Listen for messages from the Lua side
window.addEventListener('message', function(event) {
    if (event.data.type === 'openMenu') {
        document.getElementById('menu').style.display = 'block';
    } else if (event.data.type === 'playUltrasound') {
        document.getElementById('ultrasoundVideo').style.display = 'block';
        document.getElementById('ultrasoundVideo').play();
    } else if (event.data.type === 'closeMenu') {
        document.getElementById('menu').style.display = 'none';
        document.getElementById('ultrasoundVideo').pause();
        document.getElementById('ultrasoundVideo').style.display = 'none';
    }
});
