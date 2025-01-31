document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const inputField = document.getElementById('user-input');
    const messageText = inputField.value.trim();
    if (!messageText) return;

    // Display user message
    displayMessage(messageText, 'user-message');
    inputField.value = ''; // Clear the input field

    try {
        console.log('Attempting to connect to server...'); // Debug log
        const response = await fetch('http://localhost:3001/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Origin': window.location.origin
            },
            mode: 'cors', // Explicitly state CORS mode
            credentials: 'same-origin',
            body: JSON.stringify({ message: messageText })
        });

        console.log('Response status:', response.status); // Debug log

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Received data:', data); // Debug log
        
        if (data.reply) {
            displayMessage(data.reply, 'bot-message');
        } else {
            throw new Error('No reply in response data');
        }
    } catch (error) {
        console.error('Detailed error:', error); // More detailed error
        if (error.message === 'Failed to fetch') {
            displayMessage('Error: Could not connect to the server. Please make sure the server is running.', 'bot-message');
        } else {
            displayMessage(`Error: ${error.message}`, 'bot-message');
        }
    }
}

function displayMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);

    // Scroll to the latest message
    chatBox.scrollTop = chatBox.scrollHeight;
}
