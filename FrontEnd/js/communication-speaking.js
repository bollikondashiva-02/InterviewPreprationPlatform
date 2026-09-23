
const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "index.html";
}

const API_BASE = API;


/* =====================================================
   SPEAKING TOPICS - 50
===================================================== */

const topics = [

    {
        title: "Introduce Yourself",
        description:
            "Introduce yourself as if you are speaking in a real job interview."
    },

    {
        title: "Tell Me About Your Education",
        description:
            "Explain your educational background, degree, and important subjects you studied."
    },

    {
        title: "Describe Yourself in Three Words",
        description:
            "Choose three words that describe your personality and explain each one."
    },

    {
        title: "Describe Your Strengths",
        description:
            "Talk about your strongest technical and personal qualities."
    },

    {
        title: "Describe Your Weakness",
        description:
            "Talk about one weakness you are working to improve."
    },

    {
        title: "What Motivates You?",
        description:
            "Explain what motivates you to learn, work, and achieve your goals."
    },

    {
        title: "Your Hobbies and Interests",
        description:
            "Talk about your hobbies and explain why you enjoy them."
    },

    {
        title: "Describe Your Daily Routine",
        description:
            "Explain how you normally spend your day."
    },

    {
        title: "Your Greatest Achievement",
        description:
            "Describe an achievement that you are proud of."
    },

    {
        title: "A Difficult Experience",
        description:
            "Describe a difficult experience and explain how you handled it."
    },

    {
        title: "Why Did You Choose Computer Science?",
        description:
            "Explain why you chose Computer Science as your field of study."
    },

    {
        title: "Why Software Development?",
        description:
            "Explain why you want to build a career in software development."
    },

    {
        title: "Why Are You Interested in Java?",
        description:
            "Explain why you like Java and where you want to use it."
    },

    {
        title: "Explain Your Favorite Programming Language",
        description:
            "Talk about your favorite programming language and its advantages."
    },

    {
        title: "Technology You Recently Learned",
        description:
            "Explain a technology you recently learned and what you learned from it."
    },

    {
        title: "Explain OOP Concepts",
        description:
            "Explain object-oriented programming concepts in simple language."
    },

    {
        title: "Importance of SQL",
        description:
            "Explain why SQL and databases are important in software development."
    },

    {
        title: "What Is a REST API?",
        description:
            "Explain REST APIs in simple terms and give an example of their use."
    },

    {
        title: "Frontend vs Backend",
        description:
            "Explain the difference between frontend and backend development."
    },

    {
        title: "Technology You Want to Learn",
        description:
            "Talk about a technology you want to learn next and explain why."
    },

    {
        title: "Explain Your Final-Year Project",
        description:
            "Explain your final-year project, its purpose, technologies, and features."
    },

    {
        title: "Your Role in Your Project",
        description:
            "Explain your responsibilities and contributions to your project."
    },

    {
        title: "Technologies Used in Your Project",
        description:
            "Explain the technologies used in your project and why you selected them."
    },

    {
        title: "Biggest Project Challenge",
        description:
            "Describe the biggest technical challenge you faced while working on a project."
    },

    {
        title: "How You Solved a Technical Problem",
        description:
            "Explain a technical problem you faced and the steps you took to solve it."
    },

    {
        title: "What Did You Learn From Your Project?",
        description:
            "Explain the technical and personal lessons you learned from your project."
    },

    {
        title: "Explain Your PrepConnect Project",
        description:
            "Explain your PrepConnect interview preparation platform and its main features."
    },

    {
        title: "How Would You Improve Your Project?",
        description:
            "Explain what features or improvements you would add to your project."
    },

    {
        title: "Describe Your Internship",
        description:
            "Explain your frontend development internship and the work you performed."
    },

    {
        title: "What Did You Learn During Your Internship?",
        description:
            "Explain the technical and professional skills you gained during your internship."
    },

    {
        title: "Why Is Teamwork Important?",
        description:
            "Explain why teamwork is important in software development."
    },

    {
        title: "Handling a Disagreement",
        description:
            "Explain how you would handle a disagreement with a teammate."
    },

    {
        title: "Explain a Technical Problem Simply",
        description:
            "Explain how you would communicate a technical problem to a non-technical person."
    },

    {
        title: "Handling a Mistake at Work",
        description:
            "Explain what you would do if you made a mistake at work."
    },

    {
        title: "Handling Criticism",
        description:
            "Explain how you would respond to constructive criticism from your manager."
    },

    {
        title: "Managing Multiple Tasks",
        description:
            "Explain how you would prioritize multiple tasks at work."
    },

    {
        title: "Asking a Teammate for Help",
        description:
            "Explain how you would professionally ask a teammate for help."
    },

    {
        title: "Handling a Missed Deadline",
        description:
            "Explain what you would do if you realized that you might miss a deadline."
    },

    {
        title: "What Makes a Good Team Member?",
        description:
            "Explain the qualities that make someone a good team member."
    },

    {
        title: "Working With a Difficult Colleague",
        description:
            "Explain how you would professionally handle a difficult colleague."
    },

    {
        title: "Why Should We Hire You?",
        description:
            "Give a professional answer explaining your strengths and suitability for the role."
    },

    {
        title: "Why Do You Want to Join Our Company?",
        description:
            "Explain why you are interested in joining a company as a fresher."
    },

    {
        title: "Where Do You See Yourself in Five Years?",
        description:
            "Explain your career goals and professional plans for the next five years."
    },

    {
        title: "Describe Your Career Goals",
        description:
            "Explain the type of career you want to build."
    },

    {
        title: "Your Preferred Work Environment",
        description:
            "Describe the type of work environment in which you perform well."
    },

    {
        title: "Expectations From Your First Job",
        description:
            "Explain what you expect to learn and achieve in your first job."
    },

    {
        title: "How Do You Stay Motivated?",
        description:
            "Explain how you stay motivated when learning difficult topics."
    },

    {
        title: "How Do You Handle Failure?",
        description:
            "Describe how you respond when something does not go as planned."
    },

    {
        title: "What Does Success Mean to You?",
        description:
            "Explain what success means to you personally and professionally."
    },

    {
        title: "Why Should We Give You an Opportunity?",
        description:
            "Explain why a company should give you an opportunity as a fresher."
    }
];


/* =====================================================
   VARIABLES
===================================================== */

let currentTopic = 0;

let recognition = null;

let isListening = false;

let finalTranscript = "";

let currentInterimTranscript = "";

let currentAnalysisResult = null;


/* =====================================================
   DOM ELEMENTS
===================================================== */

const topicTitle =
    document.getElementById("topicTitle");

const topicDescription =
    document.getElementById("topicDescription");

const topicNumber =
    document.getElementById("topicNumber");

const progressFill =
    document.getElementById("progressFill");

const startBtn =
    document.getElementById("startSpeaking");

const stopBtn =
    document.getElementById("stopSpeaking");

const speechStatus =
    document.getElementById("speechStatus");

const transcriptBox =
    document.getElementById("transcript");

const analyzeBtn =
    document.getElementById("analyzeResponse");

const analysisResult =
    document.getElementById("analysisResult");

const saveBtn =
    document.getElementById("saveResult");

const previousBtn =
    document.getElementById("previousTopic");

const nextBtn =
    document.getElementById("nextTopic");

const topicNavigator =
    document.getElementById("topicNavigator");


/* =====================================================
   CHECK BROWSER SUPPORT
===================================================== */

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;


if (!SpeechRecognition) {

    speechStatus.textContent =
        "❌ Speech recognition is not supported. Please use Google Chrome.";

    startBtn.disabled = true;
    stopBtn.disabled = true;

}


/* =====================================================
   CREATE SPEECH RECOGNITION
===================================================== */

else {

    recognition = new SpeechRecognition();

    recognition.continuous = true;

    recognition.interimResults = true;

    recognition.lang = "en-IN";

    recognition.maxAlternatives = 1;


    /* =================================================
       ON START
    ================================================= */

    recognition.onstart = function () {

        isListening = true;

        speechStatus.textContent =
            "🎤 Listening... Speak clearly.";

        startBtn.disabled = true;

        stopBtn.disabled = false;

    };


    /* =================================================
       ON RESULT
    ================================================= */

    recognition.onresult = function (event) {

        currentInterimTranscript = "";


        for (
            let i = event.resultIndex;
            i < event.results.length;
            i++
        ) {

            const result =
                event.results[i];

            const text =
                result[0].transcript;


            if (result.isFinal) {

                finalTranscript +=
                    text.trim() + " ";

            }

            else {

                currentInterimTranscript +=
                    text;

            }

        }


        transcriptBox.value =
            (
                finalTranscript +
                currentInterimTranscript
            ).trim();

    };


    /* =================================================
       ON ERROR
    ================================================= */

    recognition.onerror = function (event) {

        console.log(
            "Speech recognition error:",
            event.error
        );


        if (event.error === "no-speech") {

            speechStatus.textContent =
                "🎤 No speech detected. Continue speaking...";

        }


        else if (event.error === "not-allowed") {

            speechStatus.textContent =
                "❌ Microphone permission denied. Allow microphone access in Chrome.";

            isListening = false;

            startBtn.disabled = false;

            stopBtn.disabled = true;

        }


        else if (event.error === "network") {

            speechStatus.textContent =
                "❌ Network error. Check your internet connection.";

        }


        else {

            speechStatus.textContent =
                "⚠️ Speech recognition error: " +
                event.error;

        }

    };


    /* =================================================
       ON END
    ================================================= */

    recognition.onend = function () {

        if (isListening) {

            speechStatus.textContent =
                "🎤 Reconnecting microphone...";


            setTimeout(function () {

                if (!isListening) {
                    return;
                }


                try {

                    recognition.start();

                }

                catch (error) {

                    console.log(
                        "Recognition restart:",
                        error
                    );

                }

            }, 500);

        }

        else {

            startBtn.disabled = false;

            stopBtn.disabled = true;

            speechStatus.textContent =
                "⏹️ Speaking stopped.";

        }

    };

}


/* =====================================================
   START SPEAKING
===================================================== */

startBtn.addEventListener(
    "click",
    function () {

        if (!recognition) {
            return;
        }


        finalTranscript = "";

        currentInterimTranscript = "";

        transcriptBox.value = "";

        currentAnalysisResult = null;

        analysisResult.style.display = "none";

        saveBtn.style.display = "none";

        saveBtn.disabled = false;


        const oldFeedback =
            document.getElementById(
                "speakingFeedback"
            );

        if (oldFeedback) {
            oldFeedback.remove();
        }


        isListening = true;


        speechStatus.textContent =
            "🎤 Starting microphone...";


        try {

            recognition.start();

        }

        catch (error) {

            console.log(
                "Recognition start:",
                error
            );

        }

    }
);


/* =====================================================
   STOP SPEAKING
===================================================== */

stopBtn.addEventListener(
    "click",
    function () {

        if (!recognition) {
            return;
        }


        isListening = false;


        try {

            recognition.stop();

        }

        catch (error) {

            console.log(error);

        }


        startBtn.disabled = false;

        stopBtn.disabled = true;

        speechStatus.textContent =
            "⏹️ Speaking stopped.";

    }
);


/* =====================================================
   ANALYZE RESPONSE
===================================================== */

analyzeBtn.addEventListener(
    "click",
    function () {

        const transcript =
            transcriptBox.value.trim();


        if (!transcript) {

            alert(
                "Please speak something before analyzing."
            );

            return;

        }


        /* =================================================
           BASIC TEXT PROCESSING
        ================================================= */

        const lowerText =
            transcript.toLowerCase();


        const words =
            lowerText
                .replace(/[^\w\s]/g, "")
                .split(/\s+/)
                .filter(
                    word => word.length > 0
                );


        const wordCount =
            words.length;


        const uniqueWords =
            new Set(words);


        const uniqueWordCount =
            uniqueWords.size;


        const sentences =
            transcript
                .split(/[.!?]+/)
                .map(
                    sentence =>
                        sentence.trim()
                )
                .filter(
                    sentence =>
                        sentence.length > 0
                );


        const sentenceCount =
            sentences.length;


        /* =================================================
           TOPIC-SPECIFIC KEYWORDS
        ================================================= */

        const topicKeywords = [

            [
                "introduce",
                "name",
                "education",
                "graduate",
                "degree",
                "skills",
                "developer",
                "project",
                "experience",
                "java",
                "python",
                "sql"
            ],

            [
                "education",
                "degree",
                "college",
                "university",
                "computer",
                "science",
                "btech",
                "engineering",
                "study",
                "graduate"
            ],

            [
                "personality",
                "learning",
                "communication",
                "hardworking",
                "creative",
                "team",
                "responsible",
                "positive"
            ],

            [
                "strength",
                "skills",
                "communication",
                "learning",
                "team",
                "problem",
                "solution",
                "technical",
                "responsibility"
            ],

            [
                "weakness",
                "improve",
                "learning",
                "practice",
                "communication",
                "confidence",
                "development"
            ],

            [
                "motivation",
                "goal",
                "learning",
                "success",
                "career",
                "achievement",
                "improve"
            ],

            [
                "hobby",
                "music",
                "chess",
                "reading",
                "sports",
                "interest",
                "enjoy"
            ],

            [
                "daily",
                "routine",
                "morning",
                "study",
                "work",
                "learning",
                "exercise",
                "practice"
            ],

            [
                "achievement",
                "success",
                "project",
                "award",
                "goal",
                "completed",
                "proud"
            ],

            [
                "difficult",
                "challenge",
                "problem",
                "solution",
                "experience",
                "learned",
                "overcome"
            ],

            [
                "computer",
                "science",
                "technology",
                "programming",
                "software",
                "career",
                "development"
            ],

            [
                "software",
                "developer",
                "programming",
                "coding",
                "technology",
                "career",
                "application"
            ],

            [
                "java",
                "programming",
                "object",
                "oriented",
                "spring",
                "backend",
                "software"
            ],

            [
                "programming",
                "language",
                "java",
                "python",
                "javascript",
                "features",
                "advantages"
            ],

            [
                "technology",
                "learned",
                "course",
                "practice",
                "project",
                "skills",
                "knowledge"
            ],

            [
                "object",
                "class",
                "inheritance",
                "polymorphism",
                "encapsulation",
                "abstraction",
                "oops"
            ],

            [
                "sql",
                "database",
                "query",
                "table",
                "data",
                "mysql",
                "postgresql"
            ],

            [
                "rest",
                "api",
                "http",
                "request",
                "response",
                "backend",
                "endpoint"
            ],

            [
                "frontend",
                "backend",
                "html",
                "css",
                "javascript",
                "server",
                "database"
            ],

            [
                "learn",
                "technology",
                "react",
                "spring",
                "python",
                "docker",
                "cloud",
                "development"
            ],

            [
                "project",
                "final",
                "year",
                "developed",
                "built",
                "technology",
                "java",
                "python",
                "database",
                "backend",
                "frontend"
            ],

            [
                "role",
                "responsibility",
                "developed",
                "coding",
                "testing",
                "database",
                "frontend",
                "backend",
                "team"
            ],

            [
                "technology",
                "java",
                "python",
                "sql",
                "html",
                "css",
                "javascript",
                "spring",
                "mysql",
                "react"
            ],

            [
                "challenge",
                "problem",
                "error",
                "debug",
                "solution",
                "testing",
                "learned",
                "project"
            ],

            [
                "problem",
                "debug",
                "error",
                "solution",
                "research",
                "testing",
                "documentation",
                "learn"
            ],

            [
                "project",
                "learning",
                "skills",
                "knowledge",
                "experience",
                "development",
                "team"
            ],

            [
                "prepconnect",
                "project",
                "interview",
                "aptitude",
                "coding",
                "communication",
                "spring",
                "mysql",
                "javascript"
            ],

            [
                "improve",
                "feature",
                "security",
                "performance",
                "database",
                "user",
                "interface",
                "testing"
            ],

            [
                "internship",
                "codsoft",
                "frontend",
                "html",
                "css",
                "javascript",
                "development",
                "project"
            ],

            [
                "internship",
                "learning",
                "frontend",
                "html",
                "css",
                "javascript",
                "communication",
                "team"
            ],

            [
                "team",
                "teamwork",
                "communication",
                "collaboration",
                "project",
                "support",
                "responsibility"
            ],

            [
                "disagreement",
                "communication",
                "listen",
                "understand",
                "solution",
                "respect",
                "team"
            ],

            [
                "technical",
                "problem",
                "simple",
                "explain",
                "communication",
                "example",
                "understand"
            ],

            [
                "mistake",
                "responsibility",
                "accept",
                "learn",
                "correct",
                "improve",
                "manager"
            ],

            [
                "criticism",
                "feedback",
                "learn",
                "improve",
                "manager",
                "professional",
                "communication"
            ],

            [
                "task",
                "priority",
                "deadline",
                "important",
                "planning",
                "time",
                "organize"
            ],

            [
                "help",
                "teammate",
                "problem",
                "explain",
                "support",
                "communication",
                "team"
            ],

            [
                "deadline",
                "task",
                "manager",
                "communication",
                "priority",
                "complete",
                "plan"
            ],

            [
                "team",
                "communication",
                "responsibility",
                "support",
                "respect",
                "collaboration",
                "reliable"
            ],

            [
                "difficult",
                "colleague",
                "communication",
                "professional",
                "respect",
                "understand",
                "solution"
            ],

            [
                "hire",
                "skills",
                "strength",
                "developer",
                "team",
                "learning",
                "problem",
                "solution",
                "communication",
                "responsibility"
            ],

            [
                "company",
                "role",
                "career",
                "learning",
                "growth",
                "technology",
                "opportunity"
            ],

            [
                "future",
                "five",
                "years",
                "career",
                "goal",
                "developer",
                "skills",
                "learning",
                "growth"
            ],

            [
                "career",
                "goal",
                "developer",
                "software",
                "skills",
                "learning",
                "growth",
                "technology"
            ],

            [
                "environment",
                "team",
                "office",
                "communication",
                "collaboration",
                "learning",
                "professional"
            ],

            [
                "first",
                "job",
                "learning",
                "experience",
                "skills",
                "career",
                "growth",
                "technology"
            ],

            [
                "motivation",
                "learning",
                "goal",
                "practice",
                "discipline",
                "success",
                "improve"
            ],

            [
                "failure",
                "mistake",
                "learn",
                "improve",
                "experience",
                "solution",
                "retry"
            ],

            [
                "success",
                "goal",
                "career",
                "achievement",
                "learning",
                "growth",
                "happiness"
            ],

            [
                "opportunity",
                "fresher",
                "skills",
                "learning",
                "developer",
                "team",
                "career",
                "company"
            ]

        ];


        const keywords =
            topicKeywords[currentTopic] || [];


        let matchedKeywords = 0;


        keywords.forEach(
            function (keyword) {

                if (
                    lowerText.includes(keyword)
                ) {

                    matchedKeywords++;

                }

            }
        );


        /* =================================================
           RELEVANCE / 20
        ================================================= */

        let relevance = 5;


        if (matchedKeywords >= 2) {
            relevance = 10;
        }


        if (matchedKeywords >= 4) {
            relevance = 14;
        }


        if (matchedKeywords >= 6) {
            relevance = 17;
        }


        if (matchedKeywords >= 8) {
            relevance = 20;
        }


        if (wordCount < 10) {

            relevance =
                Math.min(
                    relevance,
                    8
                );

        }


        /* =================================================
           CLARITY / 20
        ================================================= */

        let clarity = 8;


        if (wordCount >= 20) {
            clarity += 2;
        }


        if (wordCount >= 40) {
            clarity += 2;
        }


        if (wordCount >= 60) {
            clarity += 2;
        }


        if (sentenceCount >= 2) {
            clarity += 2;
        }


        if (sentenceCount >= 4) {
            clarity += 2;
        }


        const repetitionRatio =
            wordCount > 0
                ? uniqueWordCount / wordCount
                : 0;


        if (repetitionRatio >= 0.60) {
            clarity += 1;
        }


        if (repetitionRatio >= 0.75) {
            clarity += 1;
        }


        clarity =
            Math.min(
                clarity,
                20
            );


        /* =================================================
           GRAMMAR / 20
        ================================================= */

        let grammar = 20;


        const grammarErrors = [

            /\bi am have\b/gi,
            /\bi has\b/gi,
            /\bi is\b/gi,
            /\bi are\b/gi,
            /\bhe are\b/gi,
            /\bshe are\b/gi,
            /\bthey is\b/gi,
            /\bwe is\b/gi,
            /\byou is\b/gi,
            /\bwas went\b/gi,
            /\bdid went\b/gi,
            /\bdid not went\b/gi,
            /\bmore better\b/gi,
            /\bvery best\b/gi,
            /\bdiscuss about\b/gi,
            /\breturn back\b/gi,
            /\brevert back\b/gi,
            /\bmyself [a-z]+\b/gi

        ];


        let grammarErrorCount = 0;


        grammarErrors.forEach(
            function (pattern) {

                const matches =
                    lowerText.match(pattern);


                if (matches) {

                    grammarErrorCount +=
                        matches.length;

                }

            }
        );


        grammar -=
            grammarErrorCount * 3;


        if (wordCount < 15) {
            grammar -= 3;
        }


        if (
            wordCount >= 40 &&
            grammarErrorCount === 0
        ) {

            grammar += 1;

        }


        grammar =
            Math.max(
                0,
                Math.min(
                    grammar,
                    20
                )
            );


        /* =================================================
           VOCABULARY / 20
        ================================================= */

        let vocabulary = 6;


        if (uniqueWordCount >= 15) {
            vocabulary += 2;
        }


        if (uniqueWordCount >= 25) {
            vocabulary += 2;
        }


        if (uniqueWordCount >= 35) {
            vocabulary += 2;
        }


        if (uniqueWordCount >= 50) {
            vocabulary += 2;
        }


        const professionalWords = [

            "project",
            "technology",
            "developer",
            "software",
            "team",
            "experience",
            "learning",
            "skills",
            "database",
            "backend",
            "frontend",
            "java",
            "python",
            "spring",
            "api",
            "problem",
            "solution",
            "communication",
            "leadership",
            "responsibility",
            "development",
            "application",
            "programming",
            "testing",
            "debugging",
            "sql",
            "mysql",
            "javascript",
            "react",
            "github"

        ];


        let professionalCount = 0;


        professionalWords.forEach(
            function (word) {

                if (
                    lowerText.includes(word)
                ) {

                    professionalCount++;

                }

            }
        );


        vocabulary +=
            Math.min(
                professionalCount,
                6
            );


        vocabulary =
            Math.min(
                vocabulary,
                20
            );


        /* =================================================
           FLUENCY / 20
        ================================================= */

        let fluency = 8;


        if (wordCount >= 20) {
            fluency += 2;
        }


        if (wordCount >= 40) {
            fluency += 2;
        }


        if (wordCount >= 60) {
            fluency += 2;
        }


        if (wordCount >= 90) {
            fluency += 2;
        }


        if (wordCount >= 120) {
            fluency += 2;
        }


        /* =================================================
           FILLER WORD ANALYSIS
        ================================================= */

        const fillerWords = [

            "um",
            "uh",
            "hmm",
            "like",
            "actually",
            "basically",
            "you know",
            "sort of",
            "kind of"

        ];


        let fillerCount = 0;


        fillerWords.forEach(
            function (filler) {

                const escaped =
                    filler.replace(
                        /[-\/\\^$*+?.()|[\]{}]/g,
                        "\\$&"
                    );


                const regex =
                    new RegExp(
                        "\\b" +
                        escaped +
                        "\\b",
                        "gi"
                    );


                const matches =
                    lowerText.match(regex);


                if (matches) {

                    fillerCount +=
                        matches.length;

                }

            }
        );


        if (fillerCount === 0) {

            fluency += 4;

        }

        else if (fillerCount <= 2) {

            fluency += 2;

        }

        else if (fillerCount >= 6) {

            fluency -= 3;

        }


        if (repetitionRatio < 0.45) {

            fluency -= 2;

        }


        fluency =
            Math.max(
                0,
                Math.min(
                    fluency,
                    20
                )
            );


        /* =================================================
           TOTAL SCORE
        ================================================= */

        const total =
            relevance +
            clarity +
            grammar +
            vocabulary +
            fluency;


        /* =================================================
           FEEDBACK
        ================================================= */

        const feedback = [];


        if (relevance < 14) {

            feedback.push(
                "Stay more closely focused on the given topic."
            );

        }

        else {

            feedback.push(
                "Your response is relevant to the topic."
            );

        }


        if (clarity < 14) {

            feedback.push(
                "Try using shorter and more organized sentences."
            );

        }

        else {

            feedback.push(
                "Your response has a reasonably clear structure."
            );

        }


        if (grammar < 14) {

            feedback.push(
                "Review basic sentence structure and common grammar patterns."
            );

        }

        else {

            feedback.push(
                "Your grammar is generally understandable."
            );

        }


        if (vocabulary < 14) {

            feedback.push(
                "Use more varied and professional vocabulary."
            );

        }

        else {

            feedback.push(
                "You used a useful range of professional vocabulary."
            );

        }


        if (fluency < 14) {

            feedback.push(
                "Speak in complete thoughts and reduce pauses or filler words."
            );

        }

        else {

            feedback.push(
                "Your response shows reasonable speaking flow."
            );

        }


        if (wordCount < 30) {

            feedback.push(
                "Try giving a longer answer with specific examples."
            );

        }


        if (wordCount >= 80) {

            feedback.push(
                "Good response length. Continue maintaining a natural pace."
            );

        }


        if (fillerCount >= 3) {

            feedback.push(
                "Try to reduce filler words such as 'um', 'like', and 'basically'."
            );

        }


        if (matchedKeywords < 3) {

            feedback.push(
                "Include more details directly related to the question."
            );

        }


        /* =================================================
           SAVE ANALYSIS RESULT
        ================================================= */

        currentAnalysisResult = {

            relevance: relevance,

            clarity: clarity,

            grammar: grammar,

            vocabulary: vocabulary,

            fluency: fluency,

            total: total,

            feedback: feedback

        };


        /* =================================================
           DISPLAY SCORES
        ================================================= */

        analysisResult.style.display =
            "block";


        document.getElementById(
            "relevanceScore"
        ).textContent =
            relevance + "/20";


        document.getElementById(
            "clarityScore"
        ).textContent =
            clarity + "/20";


        document.getElementById(
            "grammarScore"
        ).textContent =
            grammar + "/20";


        document.getElementById(
            "vocabularyScore"
        ).textContent =
            vocabulary + "/20";


        document.getElementById(
            "fluencyScore"
        ).textContent =
            fluency + "/20";


        document.getElementById(
            "totalScore"
        ).textContent =
            total + "/100";


        /* =================================================
           DISPLAY FEEDBACK
        ================================================= */

        let feedbackElement =
            document.getElementById(
                "speakingFeedback"
            );


        if (!feedbackElement) {

            feedbackElement =
                document.createElement("div");

            feedbackElement.id =
                "speakingFeedback";

            feedbackElement.style.marginTop =
                "20px";

            feedbackElement.style.padding =
                "16px";

            feedbackElement.style.borderRadius =
                "10px";

            feedbackElement.style.background =
                "#f5f7fa";

            feedbackElement.style.lineHeight =
                "1.7";

            analysisResult.appendChild(
                feedbackElement
            );

        }


        feedbackElement.innerHTML =
            "<strong>💡 Feedback</strong>" +
            "<ul>" +
            feedback
                .map(
                    item =>
                        "<li>" +
                        item +
                        "</li>"
                )
                .join("") +
            "</ul>";


        saveBtn.style.display =
            "inline-block";

    }
);


/* =====================================================
   SAVE RESULT
===================================================== */

saveBtn.addEventListener(
    "click",
    async function () {

        if (!currentAnalysisResult) {

            alert(
                "Please analyze your response first."
            );

            return;

        }


        try {

            const response =
                await fetch(
                    `${API_BASE}/communication/results`,
                    {
                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "Authorization":
                                "Bearer " + token

                        },

                        body: JSON.stringify({

                            category: "Speaking",

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


            alert(
                "Speaking Practice result saved successfully!"
            );


            saveBtn.disabled = true;


        }

        catch (error) {

            console.error(error);

            alert(
                "Speaking result could not be saved."
            );

        }

    }
);


/* =====================================================
   SHOW TOPIC
===================================================== */

function showTopic() {

    const topic =
        topics[currentTopic];


    topicTitle.textContent =
        topic.title;


    topicDescription.textContent =
        topic.description;


    topicNumber.textContent =
        `Topic ${currentTopic + 1} / ${topics.length}`;


    progressFill.style.width =
        `${((currentTopic + 1) / topics.length) * 100}%`;


    previousBtn.disabled =
        currentTopic === 0;


    nextBtn.disabled =
        currentTopic === topics.length - 1;


    createTopicNavigator();

}


/* =====================================================
   TOPIC NAVIGATOR
===================================================== */

function createTopicNavigator() {

    topicNavigator.innerHTML = "";


    topics.forEach(
        function (topic, index) {

            const button =
                document.createElement("button");


            button.textContent =
                index + 1;


            button.className =
                index === currentTopic
                    ? "active"
                    : "";


            button.addEventListener(
                "click",
                function () {

                    currentTopic = index;

                    resetSpeaking();

                    showTopic();

                }
            );


            topicNavigator.appendChild(
                button
            );

        }
    );

}


/* =====================================================
   RESET SPEAKING
===================================================== */

function resetSpeaking() {

    isListening = false;

    finalTranscript = "";

    currentInterimTranscript = "";

    transcriptBox.value = "";

    analysisResult.style.display =
        "none";


    const feedbackElement =
        document.getElementById(
            "speakingFeedback"
        );


    if (feedbackElement) {
        feedbackElement.remove();
    }


    saveBtn.style.display =
        "none";

    saveBtn.disabled = false;

    currentAnalysisResult = null;


    if (recognition) {

        try {

            recognition.stop();

        }

        catch (error) {

            console.log(error);

        }

    }


    startBtn.disabled = false;

    stopBtn.disabled = true;

    speechStatus.textContent =
        "Ready to speak.";

}


/* =====================================================
   PREVIOUS TOPIC
===================================================== */

previousBtn.addEventListener(
    "click",
    function () {

        if (currentTopic > 0) {

            currentTopic--;

            resetSpeaking();

            showTopic();

        }

    }
);


/* =====================================================
   NEXT TOPIC
===================================================== */

nextBtn.addEventListener(
    "click",
    function () {

        if (
            currentTopic <
            topics.length - 1
        ) {

            currentTopic++;

            resetSpeaking();

            showTopic();

        }

    }
);


/* =====================================================
   NAVIGATION
===================================================== */

function goToCommunication() {

    window.location.href =
        "communication.html";

}


function logout() {

    localStorage.removeItem("token");

    window.location.href =
        "register.html";

}


/* =====================================================
   INITIAL LOAD
===================================================== */

showTopic();

