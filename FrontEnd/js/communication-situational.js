const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "register.html";
}

let questions = [];
let currentQuestion = 0;
let answers = [];

const API_BASE = API;

const questionText = document.getElementById("questionText");
const questionNumber = document.getElementById("questionNumber");
const difficulty = document.getElementById("difficulty");

const totalQuestionsElement =
    document.getElementById("totalQuestions");

const progressText =
    document.getElementById("progressText");

const progressBar =
    document.getElementById("progressBar");

const transcript =
    document.getElementById("transcript");

const navigatorContainer =
    document.getElementById("navigator");

const previousBtn =
    document.getElementById("previousBtn");

const nextBtn =
    document.getElementById("nextBtn");

const startSpeakingBtn =
    document.getElementById("startSpeakingBtn");

const stopSpeakingBtn =
    document.getElementById("stopSpeakingBtn");

const analyzeBtn =
    document.getElementById("analyzeBtn");

const analysisResult =
    document.getElementById("analysisResult");

const saveResultBtn =
    document.getElementById("saveResultBtn");

let currentAnalysisResult = null;


/* =========================================================
   LOAD QUESTIONS
========================================================= */

async function loadQuestions() {

    try {

        const response = await fetch(
            `${API_BASE}/communication/questions/category/Situational`,
            {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        );

        if (!response.ok) {
            throw new Error("Failed to load questions");
        }

        questions = await response.json();

        if (questions.length === 0) {

            questionText.textContent =
                "No Situational questions found.";

            return;
        }

        answers =
            new Array(questions.length).fill("");

        totalQuestionsElement.textContent =
            questions.length;

        createNavigator();

        showQuestion();

    } catch (error) {

        console.error(error);

        questionText.textContent =
            "Unable to load questions.";
    }
}


/* =========================================================
   SHOW QUESTION
========================================================= */

function showQuestion() {

    const question =
        questions[currentQuestion];

    questionNumber.textContent =
        `Situation ${currentQuestion + 1}`;

    questionText.textContent =
        question.question;

    difficulty.textContent =
        question.difficulty;

    progressText.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    const progress =
        ((currentQuestion + 1) /
            questions.length) * 100;

    progressBar.style.width =
        `${progress}%`;

    transcript.textContent =
        answers[currentQuestion] ||
        "Your spoken response will appear here...";

    analysisResult.style.display =
        "none";

    saveResultBtn.style.display =
        "none";

    currentAnalysisResult = null;

    updateNavigator();

    previousBtn.disabled =
        currentQuestion === 0;

    nextBtn.disabled =
        currentQuestion === questions.length - 1;
}


/* =========================================================
   QUESTION NAVIGATOR
========================================================= */

function createNavigator() {

    navigatorContainer.innerHTML = "";

    questions.forEach((question, index) => {

        const button =
            document.createElement("button");

        button.className =
            "navigator-button";

        button.textContent =
            index + 1;

        button.addEventListener("click", () => {

            currentQuestion = index;

            showQuestion();

        });

        navigatorContainer.appendChild(button);

    });
}


function updateNavigator() {

    const buttons =
        navigatorContainer.querySelectorAll(
            ".navigator-button"
        );

    buttons.forEach((button, index) => {

        button.classList.remove("active");

        button.classList.remove("answered");

        if (index === currentQuestion) {

            button.classList.add("active");
        }

        if (
            answers[index] &&
            answers[index].trim() !== ""
        ) {

            button.classList.add("answered");
        }

    });
}


/* =========================================================
   PREVIOUS / NEXT
========================================================= */

previousBtn.addEventListener("click", () => {

    if (currentQuestion > 0) {

        currentQuestion--;

        showQuestion();
    }

});


nextBtn.addEventListener("click", () => {

    if (
        currentQuestion <
        questions.length - 1
    ) {

        currentQuestion++;

        showQuestion();
    }

});


/* =========================================================
   SPEECH RECOGNITION
========================================================= */

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

let recognition = null;

let finalTranscript = "";

let isListening = false;

let manuallyStopped = false;


if (SpeechRecognition) {

    recognition =
        new SpeechRecognition();

    recognition.continuous = true;

    recognition.interimResults = true;

    recognition.lang = "en-US";


    /* =====================================================
       START
    ===================================================== */

    recognition.onstart = () => {

        isListening = true;

        manuallyStopped = false;

        startSpeakingBtn.style.display =
            "none";

        stopSpeakingBtn.style.display =
            "inline-block";

        transcript.textContent =
            finalTranscript ||
            "Listening...";
    };


    /* =====================================================
       RESULT
    ===================================================== */

    recognition.onresult = (event) => {

        /*
            IMPORTANT:
            Read ALL recognition results from Chrome.
        */

        let completeTranscript = "";

        for (
            let i = 0;
            i < event.results.length;
            i++
        ) {

            completeTranscript +=
                event.results[i][0].transcript + " ";
        }


        completeTranscript =
            completeTranscript
                .replace(/\s+/g, " ")
                .trim();


        if (completeTranscript !== "") {

            finalTranscript =
                completeTranscript;

            transcript.textContent =
                finalTranscript;

            answers[currentQuestion] =
                finalTranscript;

            updateNavigator();
        }
    };


    /* =====================================================
       END
    ===================================================== */

    recognition.onend = () => {

        /*
            Save whatever Chrome recognized.
        */

        if (finalTranscript.trim() !== "") {

            answers[currentQuestion] =
                finalTranscript.trim();

            transcript.textContent =
                finalTranscript.trim();

            updateNavigator();
        }


        /*
            If the user did not press Stop,
            continue listening.
        */

        if (
            isListening &&
            !manuallyStopped
        ) {

            setTimeout(() => {

                try {

                    recognition.start();

                } catch (error) {

                    console.log(
                        "Recognition restart:",
                        error
                    );
                }

            }, 300);

            return;
        }


        isListening = false;

        startSpeakingBtn.style.display =
            "inline-block";

        stopSpeakingBtn.style.display =
            "none";
    };


    /* =====================================================
       ERROR
    ===================================================== */

    recognition.onerror = (event) => {

        console.error(
            "Speech recognition error:",
            event.error
        );

        if (
            event.error === "no-speech" ||
            event.error === "aborted"
        ) {

            return;
        }

        isListening = false;

        startSpeakingBtn.style.display =
            "inline-block";

        stopSpeakingBtn.style.display =
            "none";
    };


    /* =====================================================
       START SPEAKING BUTTON
    ===================================================== */

    startSpeakingBtn.addEventListener(
        "click",
        () => {

            if (isListening) {
                return;
            }


            /*
                Start a NEW response.
            */

            finalTranscript = "";

            answers[currentQuestion] =
                "";


            transcript.textContent =
                "Listening...";


            manuallyStopped = false;


            try {

                recognition.start();

            } catch (error) {

                console.error(
                    "Unable to start recognition:",
                    error
                );
            }
        }
    );


    /* =====================================================
       STOP SPEAKING BUTTON
    ===================================================== */

    stopSpeakingBtn.addEventListener(
        "click",
        () => {

            if (!isListening) {
                return;
            }


            manuallyStopped = true;

            isListening = false;

            recognition.stop();


            /*
                Immediately keep the text already
                recognized by Chrome.
            */

            if (finalTranscript.trim() !== "") {

                answers[currentQuestion] =
                    finalTranscript.trim();

                transcript.textContent =
                    finalTranscript.trim();

                updateNavigator();
            }
        }
    );


} else {

    startSpeakingBtn.disabled = true;

    startSpeakingBtn.textContent =
        "🎤 Speech Recognition Not Supported";

    transcript.textContent =
        "Your browser does not support speech recognition. Please use Google Chrome.";
}



/* =========================================================
   ANALYZE RESPONSE
========================================================= */

analyzeBtn.addEventListener(
    "click",
    () => {

        const response =
            (answers[currentQuestion] || "").trim();

        if (!response) {

            alert(
                "Please speak your response before analyzing."
            );

            return;
        }

        const result =
            analyzeResponse(response);

        currentAnalysisResult = result;

        analysisResult.innerHTML = `

            <h3>📊 Response Analysis</h3>

            <p>
                <strong>Relevance:</strong>
                ${result.relevance}/20
            </p>

            <p>
                <strong>Clarity:</strong>
                ${result.clarity}/20
            </p>

            <p>
                <strong>Grammar:</strong>
                ${result.grammar}/20
            </p>

            <p>
                <strong>Vocabulary:</strong>
                ${result.vocabulary}/20
            </p>

            <p>
                <strong>Professional Response:</strong>
                ${result.professional}/20
            </p>

            <hr>

            <div class="analysis-score">
                ${result.total}/100
            </div>

            <p>
                Overall Communication Score
            </p>

        `;

        analysisResult.style.display =
            "block";

        saveResultBtn.style.display =
            "inline-block";
    }
);


/* =========================================================
   RESPONSE ANALYSIS LOGIC
========================================================= */

function analyzeResponse(text) {

    const words =
        text.toLowerCase().split(/\s+/);

    const wordCount =
        words.length;


    /* -----------------------------------------
       RELEVANCE
    ----------------------------------------- */

    let relevance = 10;

    const relevantWords = [
        "manager",
        "team",
        "task",
        "problem",
        "work",
        "deadline",
        "complete",
        "help",
        "explain",
        "discuss",
        "customer",
        "project"
    ];

    relevantWords.forEach(word => {

        if (words.includes(word)) {

            relevance += 2;
        }
    });

    relevance =
        Math.min(relevance, 20);


    /* -----------------------------------------
       CLARITY
    ----------------------------------------- */

    let clarity = 10;

    if (wordCount >= 8) {

        clarity += 4;
    }

    if (wordCount >= 15) {

        clarity += 3;
    }

    if (text.includes(".")) {

        clarity += 3;
    }

    clarity =
        Math.min(clarity, 20);


    /* -----------------------------------------
       GRAMMAR
    ----------------------------------------- */

    let grammar = 10;

    const grammarWords = [
        "would",
        "could",
        "should",
        "will",
        "because",
        "and",
        "the",
        "with"
    ];

    grammarWords.forEach(word => {

        if (words.includes(word)) {

            grammar += 1;
        }
    });

    grammar =
        Math.min(grammar, 20);


    /* -----------------------------------------
       VOCABULARY
    ----------------------------------------- */

    let vocabulary = 10;

    const professionalWords = [
        "explain",
        "communicate",
        "complete",
        "support",
        "discuss",
        "understand",
        "responsibility",
        "priority",
        "solution",
        "deadline"
    ];

    professionalWords.forEach(word => {

        if (words.includes(word)) {

            vocabulary += 2;
        }
    });

    vocabulary =
        Math.min(vocabulary, 20);


    /* -----------------------------------------
       PROFESSIONAL RESPONSE
    ----------------------------------------- */

    let professional = 10;

    const professionalTerms = [
        "manager",
        "team",
        "respect",
        "responsibility",
        "solution",
        "help",
        "discuss",
        "communicate",
        "complete",
        "professional"
    ];

    professionalTerms.forEach(word => {

        if (words.includes(word)) {

            professional += 2;
        }
    });

    professional =
        Math.min(professional, 20);


    /* -----------------------------------------
       TOTAL
    ----------------------------------------- */

    const total =
        relevance +
        clarity +
        grammar +
        vocabulary +
        professional;


    return {
        relevance,
        clarity,
        grammar,
        vocabulary,
        professional,
        total
    };
}
/* =========================================================
   SAVE RESULT
========================================================= */

saveResultBtn.addEventListener(
    "click",
    async () => {

        if (!currentAnalysisResult) {

            alert(
                "Please analyze your response before saving."
            );

            return;
        }

        saveResultBtn.disabled = true;

        saveResultBtn.textContent =
            "Saving...";

        try {

            const response =
                await fetch(
                    `${API_BASE}/communication/results`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + token
                        },

                        body: JSON.stringify({

                            category: "Situational",

                            score:
                                currentAnalysisResult.total,

                            totalQuestions: 100,

                            percentage:
                                currentAnalysisResult.total
                        })
                    }
                );

            if (!response.ok) {

                throw new Error(
                    "Failed to save result"
                );
            }

            const savedResult =
                await response.json();

            console.log(
                "Situational result saved:",
                savedResult
            );

            alert(
                "Result saved successfully!"
            );

            saveResultBtn.textContent =
                "✅ Result Saved";

            saveResultBtn.disabled = true;

        } catch (error) {

            console.error(
                "Save result error:",
                error
            );

            alert(
                "Failed to save result. Please try again."
            );

            saveResultBtn.disabled = false;

            saveResultBtn.textContent =
                "💾 Save Result";
        }
    }
);


/* =========================================================
   LOGOUT
========================================================= */

function logout() {

    localStorage.removeItem("token");

    window.location.href =
        "register.html";
}


/* =========================================================
   START
========================================================= */

loadQuestions();