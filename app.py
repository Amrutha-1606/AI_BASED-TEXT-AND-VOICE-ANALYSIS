from flask import Flask, render_template, request, jsonify
from textblob import TextBlob
import re
from collections import Counter

app = Flask(__name__)


# ==========================================
# TEXT ANALYSIS FUNCTION
# ==========================================

def analyze_text(text):

    text = text.strip()

    if not text:
        return {
            "sentiment": "Neutral",
            "polarity": 0,
            "subjectivity": 0,
            "word_count": 0,
            "character_count": 0,
            "sentence_count": 0,
            "keywords": []
        }

    # Create TextBlob object
    blob = TextBlob(text)

    # Sentiment analysis
    polarity = blob.sentiment.polarity
    subjectivity = blob.sentiment.subjectivity

    # Determine sentiment
    if polarity > 0.1:
        sentiment = "Positive"
    elif polarity < -0.1:
        sentiment = "Negative"
    else:
        sentiment = "Neutral"

    # Extract words
    words = re.findall(
        r"\b[a-zA-Z]+\b",
        text.lower()
    )

    # Stop words
    stop_words = {
        "the", "is", "a", "an", "and", "or",
        "to", "of", "in", "on", "for", "with",
        "this", "that", "it", "was", "are",
        "be", "as", "at", "by", "from",
        "i", "you", "we", "they", "he",
        "she", "my", "your", "our",
        "but", "have", "has", "had",
        "very", "will", "can", "do",
        "does", "did", "not"
    }

    # Remove stop words
    filtered_words = [
        word
        for word in words
        if word not in stop_words
        and len(word) > 2
    ]

    # Count words
    word_frequency = Counter(filtered_words)

    # Get top 10 keywords
    keywords = [
        word
        for word, count
        in word_frequency.most_common(10)
    ]

    # Sentence count
    sentence_count = len(blob.sentences)

    return {
        "sentiment": sentiment,
        "polarity": round(polarity, 3),
        "subjectivity": round(subjectivity, 3),
        "word_count": len(words),
        "character_count": len(text),
        "sentence_count": sentence_count,
        "keywords": keywords
    }


# ==========================================
# HOME PAGE
# ==========================================

@app.route("/")
def home():

    return render_template(
        "index.html"
    )


# ==========================================
# ANALYZE API
# ==========================================

@app.route(
    "/analyze",
    methods=["POST"]
)
def analyze():

    data = request.get_json()

    if not data:

        return jsonify({
            "error": "No data received"
        }), 400

    text = data.get("text", "")

    if not text.strip():

        return jsonify({
            "error": "Please enter some text."
        }), 400

    result = analyze_text(text)

    return jsonify(result)


# ==========================================
# START SERVER
# ==========================================

if __name__ == "__main__":

    app.run(
        debug=True
    )
