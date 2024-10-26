document.addEventListener('DOMContentLoaded', function() {
    // Target the close button
    const closeButton = document.getElementById('closeUi');

    // Close UI function
    function closeUi() {
        fetch(`https://your_resource_name/closeUi`, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'close' })
        });
    }

    // Event listener for close button
    closeButton.addEventListener('click', closeUi);
});
