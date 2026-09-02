🤖 AI-Based Text and Voice Analysis Platform

An AI-powered web application that analyzes text and voice input using Natural Language Processing (NLP). The platform converts voice into text and provides useful insights such as sentiment, polarity, subjectivity, keywords, and text statistics.

📌 Project Overview

The AI-Based Text and Voice Analysis Platform is developed as an Application Development project. It allows users to either type text or speak through a microphone. Voice input is converted into text using browser-based speech recognition, and the resulting text is analyzed using Natural Language Processing techniques.

The application provides a simple and interactive dashboard for understanding textual information.

✨ Features
📝 Text input and analysis
🎤 Voice input using microphone
🗣️ Speech-to-text conversion
😊 Sentiment analysis
📊 Polarity analysis
🧠 Subjectivity analysis
🔑 Keyword extraction
🔢 Word count
🔤 Character count
📄 Sentence count
📱 Responsive web interface
⚡ Real-time analysis results
🛠️ Technologies Used
Frontend
HTML5
CSS3
JavaScript
Backend
Python
Flask
Natural Language Processing
TextBlob
Speech Recognition
Web Speech API
Development Environment
Visual Studio Code
Google Chrome / Microsoft Edge
📂 Project Structure
AI Text Voice Analysis/
│
├── app.py
├── requirements.txt
│
├── templates/
│   └── index.html
│
└── static/
    ├── style.css
    └── script.js

⚙️ Installation
1. Clone the repository
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git

2. Open the project
cd "AI Text Voice Analysis"

3. Install the required packages
python -m pip install flask textblob

4. Download TextBlob language data
python -m textblob.download_corpora

▶️ Run the Application

Start the Flask server:

python app.py


You should see:

* Running on http://127.0.0.1:5000


Open your browser and visit:

http://127.0.0.1:5000

🎯 How to Use
Text Analysis
Open the application.
Enter a sentence or paragraph in the text box.
Click Analyze Text.
The application displays:
Sentiment
Polarity
Subjectivity
Word count
Character count
Sentence count
Important keywords
Voice Analysis
Click Start Voice.
Allow microphone access.
Speak clearly.
The application converts your speech into text.
Click Analyze Text.
View the analysis results.
📊 Example
Input
I really love this application. It is very useful and easy to use.

Output
Sentiment: Positive
Polarity: Positive
Subjectivity: 0.x
Word Count: ...
Character Count: ...
Sentence Count: ...
Keywords: application, useful, easy

🧠 Sentiment Analysis

The application classifies text into three basic sentiment categories:

Sentiment	Description
😊 Positive	The text expresses a positive opinion or emotion
😐 Neutral	The text has little or no strong sentiment
😞 Negative	The text expresses a negative opinion or emotion
🔐 Privacy

The application is designed as a local development project. Text entered into the application is processed by the Flask backend running on the local machine.

Microphone access is controlled by the browser and requires user permission.

🚀 Future Enhancements

The project can be extended with:

🎭 Emotion detection
🌐 Multi-language support
📁 Audio file upload
📊 Graphs and charts
📄 PDF report generation
👤 User authentication
🗄️ Database integration
☁️ Cloud deployment
🤖 Advanced AI/NLP models
📈 Historical analysis dashboard
🎓 Academic Project

Project Title:
AI-Based Text and Voice Analysis Platform

Project Type:
Application Development Project

Domain:
Artificial Intelligence / Natural Language Processing

👨‍💻 Author
NAIDU AMRUTHA

📄 License

This project is developed for educational and academic purposes.
