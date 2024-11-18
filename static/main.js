document.getElementById('queryForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const query = document.getElementById('query').value;
    const limit = document.getElementById('limit').value;

    try {
        // Fetch Reddit posts using PRAW or a direct Reddit API endpoint (as needed)
        const redditPosts = await fetchRedditPosts(query, limit);

        // Call OpenAI API to summarize the posts
        const summary = await summarizeContent(redditPosts);

        document.getElementById('summary').innerText = summary;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('summary').innerText = 'Failed to fetch the summary.';
    }
});

// Fetch Reddit posts (client-side using a simple fetch request)
async function fetchRedditPosts(query, limit) {
    const redditApiUrl = `https://www.reddit.com/r/all/search.json?q=${query}&limit=${limit}`;
    const response = await fetch(redditApiUrl);
    const data = await response.json();
    
    // Extract titles and self-texts from posts
    return data.data.children.map(post => post.data.title + " " + post.data.selftext).join("\n\n");
}

// Call OpenAI's API (client-side)
async function summarizeContent(content) {
    const openaiApiKey = "YOUR_OPENAI_API_KEY"; // Be careful with exposing your API key!
    const openaiApiUrl = "https://api.openai.com/v1/completions";

    const response = await fetch(openaiApiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${openaiApiKey}`,
        },
        body: JSON.stringify({
            model: "gpt-4",
            prompt: `Summarize the following posts related to current political events:\n\n${content}\n\nProvide a brief summary of key themes.`,
            max_tokens: 100,
        }),
    });

    const data = await response.json();
    return data.choices[0].text.trim();
}
