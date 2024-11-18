document.getElementById('queryForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const query = document.getElementById('query').value;
    const limit = document.getElementById('limit').value;

    try {
        const response = await fetch('/get_summary', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query, limit })
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }

        const data = await response.json();
        if (data.summary) {
            document.getElementById('summary').innerText = data.summary;
        } else {
            document.getElementById('summary').innerText = 'No summary available or an error occurred.';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('summary').innerText = `Failed to fetch the summary: ${error.message}`;
    }
});
