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
    const openaiApiKey = "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"; // Be careful with exposing your API key!
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

    // Log the full response for debugging
    const data = await response.json();
    console.log("OpenAI API Response:", data); // Log the full response

    // Check if 'choices' exists and has at least one item
    if (data.choices && data.choices.length > 0) {
        return data.choices[0].text.trim();
    } else {
        console.error("Error: No choices in OpenAI response");
        return "Error: Unable to generate summary.";
    }
}
