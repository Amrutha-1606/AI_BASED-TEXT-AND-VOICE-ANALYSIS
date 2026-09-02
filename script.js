// ==========================================
// GET HTML ELEMENTS
// ==========================================

const textInput =
    document.getElementById("textInput");

const analyzeButton =
    document.getElementById("analyzeButton");

const speechButton =
    document.getElementById("speechButton");

const clearButton =
    document.getElementById("clearButton");

const speechStatus =
    document.getElementById("speechStatus");


// ==========================================
// TEXT ANALYSIS
// ==========================================

analyzeButton.addEventListener(
    "click",
    async function () {

        const text =
            textInput.value.trim();


        // Check empty text

        if (!text) {

            alert(
                "Please enter some text first."
            );

            return;
        }


        // Disable button

        analyzeButton.disabled =
            true;

        analyzeButton.textContent =
            "⏳ Analyzing...";


        try {

            const response =
                await fetch(
                    "/analyze",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify({
                                text: text
                            })
                    }
                );


            const result =
                await response.json();


            if (result.error) {

                alert(
                    result.error
                );

                return;
            }


            displayResults(result);

        }

        catch (error) {

            console.error(error);

            alert(
                "An error occurred while analyzing the text."
            );

        }

        finally {

            analyzeButton.disabled =
                false;

            analyzeButton.textContent =
                "🔍 Analyze Text";
        }

    }
);


// ==========================================
// DISPLAY RESULTS
// ==========================================

function displayResults(result) {


    // Sentiment

    const sentimentElement =
        document.getElementById(
            "sentiment"
        );

    sentimentElement.textContent =
        result.sentiment;


    // Change sentiment color

    if (
        result.sentiment ===
        "Positive"
    ) {

        sentimentElement.style.color =
            "#16a34a";

    }
    else if (
        result.sentiment ===
        "Negative"
    ) {

        sentimentElement.style.color =
            "#dc2626";

    }
    else {

        sentimentElement.style.color =
            "#f59e0b";
    }


    // Polarity

    document.getElementById(
        "polarity"
    ).textContent =
        result.polarity;


    // Subjectivity

    document.getElementById(
        "subjectivity"
    ).textContent =
        result.subjectivity;


    // Word count

    document.getElementById(
        "wordCount"
    ).textContent =
        result.word_count;


    // Character count

    document.getElementById(
        "characterCount"
    ).textContent =
        result.character_count;


    // Sentence count

    document.getElementById(
        "sentenceCount"
    ).textContent =
        result.sentence_count;


    // ======================================
    // KEYWORDS
    // ======================================

    const keywordContainer =
        document.getElementById(
            "keywordContainer"
        );


    keywordContainer.innerHTML =
        "";


    if (
        !result.keywords ||
        result.keywords.length === 0
    ) {

        keywordContainer.innerHTML =
            '<span class="empty">' +
            'No keywords found.' +
            '</span>';

        return;
    }


    result.keywords.forEach(
        function (keyword) {

            const span =
                document.createElement(
                    "span"
                );

            span.className =
                "keyword";

            span.textContent =
                keyword;

            keywordContainer.appendChild(
                span
            );

        }
    );

}


// ==========================================
// SPEECH RECOGNITION
// ==========================================

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;


if (SpeechRecognition) {


    const recognition =
        new SpeechRecognition();


    recognition.continuous =
        false;


    recognition.interimResults =
        false;


    recognition.lang =
        "en-US";


    // ======================================
    // START VOICE
    // ======================================

    speechButton.addEventListener(
        "click",
        function () {

            try {

                recognition.start();

                speechStatus.textContent =
                    "🎤 Listening... Please speak now.";

                speechButton.textContent =
                    "🎙 Listening...";

                speechButton.disabled =
                    true;

            }
            catch (error) {

                console.log(error);

            }

        }
    );


    // ======================================
    // SPEECH RESULT
    // ======================================

    recognition.onresult =
        function (event) {


            const transcript =
                event.results[0][0]
                    .transcript;


            if (
                textInput.value.trim()
            ) {

                textInput.value +=
                    " " + transcript;

            }
            else {

                textInput.value =
                    transcript;
            }


            speechStatus.textContent =
                "✅ Speech converted to text successfully.";

        };


    // ======================================
    // SPEECH ERROR
    // ======================================

    recognition.onerror =
        function (event) {

            console.error(
                "Speech recognition error:",
                event.error
            );


            speechStatus.textContent =
                "❌ Speech error: " +
                event.error;

        };


    // ======================================
    // SPEECH END
    // ======================================

    recognition.onend =
        function () {

            speechButton.textContent =
                "🎤 Start Voice";

            speechButton.disabled =
                false;
        };

}
else {


    speechButton.disabled =
        true;


    speechStatus.textContent =
        "Speech recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge.";

}


// ==========================================
// CLEAR BUTTON
// ==========================================

clearButton.addEventListener(
    "click",
    function () {


        // Clear textarea

        textInput.value =
            "";


        // Reset results

        document.getElementById(
            "sentiment"
        ).textContent =
            "-";


        document.getElementById(
            "polarity"
        ).textContent =
            "-";


        document.getElementById(
            "subjectivity"
        ).textContent =
            "-";


        document.getElementById(
            "wordCount"
        ).textContent =
            "-";


        document.getElementById(
            "characterCount"
        ).textContent =
            "-";


        document.getElementById(
            "sentenceCount"
        ).textContent =
            "-";


        // Reset sentiment color

        document.getElementById(
            "sentiment"
        ).style.color =
            "#4f46e5";


        // Clear keywords

        document.getElementById(
            "keywordContainer"
        ).innerHTML =
            '<span class="empty">' +
            'No keywords yet' +
            '</span>';


        // Clear status

        speechStatus.textContent =
            "";

    }
);
