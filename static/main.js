document.getElementById('queryForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const query = document.getElementById('query').value;
    const limit = document.getElementById('limit').value;

    try {
        const response = await fetch('https://your-backend-url.com/get_summary', {  // Replace with your deployed backend URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query, limit })
        });

        const data = await response.json();
        console.log('Response:', data); // Log response for debugging
        if (data.summary) {
            document.getElementById('summary').innerText = data.summary;
        } else {
            document.getElementById('summary').innerText = 'No summary available or an error occurred.';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('summary').innerText = 'Failed to fetch the summary.';
    }
});
