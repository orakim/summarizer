from flask import Flask, request, jsonify, render_template
import openai
from reddit_api import get_reddit_posts

app = Flask(__name__)
openai.api_key = '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'

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get_summary', methods=['POST'])
def get_summary():
    data = request.json
    query = data.get("query", "")
    limit = data.get("limit", 5)

    # Retrieve Reddit posts and summarize them
    reddit_posts = get_reddit_posts(query, limit)
    combined_content = "\n\n".join(reddit_posts)
    summary = summarize_content(combined_content)

    return jsonify({
        "query": query,
        "summary": summary
    })

def summarize_content(content):
    prompt = f"Summarize the following posts related to current political events:\n\n{content}\n\nProvide a brief summary of key themes."
    response = openai.Completion.create(
        model="gpt-4",
        prompt=prompt,
        max_tokens=100
    )
    return response.choices[0].text.strip()

if __name__ == '__main__':
    app.run(debug=True)
