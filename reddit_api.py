import praw

# Configure Reddit API client
reddit = praw.Reddit(
    client_id="nYzEBXzQaPqPOZhdJK3ooA",
    client_secret="3lt4ZXSVue_nTqVmyGxQp2hm6uBSuQ",
    user_agent="redditsummarizer/0.1 by bjk6"
)

# Function to retrieve Reddit posts
def get_reddit_posts(query, limit=10):
    subreddit = reddit.subreddit("all")
    posts = []
    for submission in subreddit.search(query, limit=limit):
        posts.append(submission.title + " " + submission.selftext)
    return posts
