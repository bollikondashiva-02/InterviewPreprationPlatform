
let questions = [];
let current = 0;
let answers = {};
let score = 0;

let time = 10800; // 3 hours
let timer = null;

let submitted = false;


// ==========================================
// LOAD QUESTIONS
// ==========================================

async function loadQuestions() {

    try {

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first.");
            window.location.href = "index.html";
            return;
        }

        const res = await fetch(
            `${API}/aptitude/questions`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (!res.ok) {
            throw new Error(
                `Failed to load questions: ${res.status}`
            );
        }

        questions = await res.json();

        console.log(
            "Questions Loaded:",
            questions.length
        );

        if (!Array.isArray(questions) || questions.length === 0) {

            document.getElementById("questionBox").innerHTML = `
                <h3>No questions found.</h3>
            `;

            return;
        }

        // Create question navigator
        updateQuestionNavigator();

        // Display first question
        showQuestion();

        // Start timer
        startTimer();

    } catch (error) {

        console.error(error);

        alert("Unable to load questions.");
    }
}


// ==========================================
// SHOW QUESTION
// ==========================================

function showQuestion() {

    const q = questions[current];

    if (!q) {
        return;
    }


    // ======================================
    // QUESTION NUMBER
    // ======================================

    document.getElementById(
        "questionNumber"
    ).innerText =
        `Question ${current + 1} of ${questions.length}`;


    // ======================================
    // ANSWERED COUNT
    // ======================================

    updateAnsweredCount();


    // ======================================
    // PROGRESS BAR
    // ======================================

    updateProgress();


    // ======================================
    // BUTTON STATES
    // ======================================

    document.getElementById(
        "previousBtn"
    ).disabled = current === 0;


    document.getElementById(
        "nextBtn"
    ).disabled =
        current === questions.length - 1;


    // ======================================
    // QUESTION
    // ======================================

    let html = `

        <div class="question-meta">

            <span class="question-category">
                ${escapeHtml(q.category || "Aptitude")}
            </span>

            <span class="question-difficulty">
                ${escapeHtml(q.difficulty || "General")}
            </span>

        </div>

        <h2 class="question-title">
            ${current + 1}. ${escapeHtml(q.question)}
        </h2>

    `;


    // ======================================
    // OPTIONS
    // ======================================

    const options = [
        {
            label: "A",
            value: q.optionA
        },
        {
            label: "B",
            value: q.optionB
        },
        {
            label: "C",
            value: q.optionC
        },
        {
            label: "D",
            value: q.optionD
        }
    ];


    options.forEach((option) => {

        // Skip empty options
        if (
            option.value === null ||
            option.value === undefined
        ) {
            return;
        }


        const checked =
            answers[current] === option.value
                ? "checked"
                : "";


        html += `

            <div class="option">

                <label>

                    <input
                        type="radio"
                        name="option"
                        value="${escapeHtml(option.value)}"
                        ${checked}
                    >

                    <span class="option-text">

                        <strong>
                            ${option.label}.
                        </strong>

                        ${escapeHtml(option.value)}

                    </span>

                </label>

            </div>

        `;

    });


    // ======================================
    // DISPLAY QUESTION
    // ======================================

    document.getElementById(
        "questionBox"
    ).innerHTML = html;


    // ======================================
    // ADD RADIO EVENTS
    // ======================================

    const radioButtons =
        document.querySelectorAll(
            'input[name="option"]'
        );


    radioButtons.forEach((radio) => {

        radio.addEventListener(
            "change",
            function () {

                saveAnswer(this.value);

            }
        );

    });


    // ======================================
    // UPDATE NAVIGATOR
    // ======================================

    updateQuestionNavigator();
}


// ==========================================
// SAVE ANSWER
// ==========================================

function saveAnswer(answer) {

    answers[current] = answer;

    updateAnsweredCount();

    updateProgress();

    updateQuestionNavigator();

}


// ==========================================
// ANSWERED COUNT
// ==========================================

function updateAnsweredCount() {

    const answered =
        Object.keys(answers).length;


    const element =
        document.getElementById(
            "answeredCount"
        );


    if (element) {

        element.innerText =
            `Answered: ${answered}`;

    }

}


// ==========================================
// PROGRESS BAR
// ==========================================

function updateProgress() {

    if (
        questions.length === 0
    ) {
        return;
    }


    const percentage =
        ((current + 1) /
            questions.length) *
        100;


    const progressBar =
        document.getElementById(
            "progressBar"
        );


    if (progressBar) {

        progressBar.style.width =
            `${percentage}%`;

    }

}


// ==========================================
// QUESTION NAVIGATOR
// ==========================================

function updateQuestionNavigator() {

    const navigator =
        document.getElementById(
            "questionNavigator"
        );


    if (!navigator) {
        return;
    }


    // Clear old buttons
    navigator.innerHTML = "";


    // Create buttons
    questions.forEach(
        (question, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "question-number";


            button.innerText =
                index + 1;


            // ==================================
            // CURRENT QUESTION
            // ==================================

            if (
                index === current
            ) {

                button.classList.add(
                    "current"
                );

            }


            // ==================================
            // ANSWERED QUESTION
            // ==================================

            if (
                answers[index] !== undefined
            ) {

                button.classList.add(
                    "answered"
                );

            }


            // ==================================
            // CLICK QUESTION
            // ==================================

            button.addEventListener(
                "click",
                function () {

                    current = index;

                    showQuestion();

                    // Scroll to question
                    document
                        .querySelector(
                            ".question-card"
                        )
                        ?.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                }
            );


            navigator.appendChild(
                button
            );

        }
    );

}


// ==========================================
// NEXT QUESTION
// ==========================================

function nextQuestion() {

    if (
        current <
        questions.length - 1
    ) {

        current++;

        showQuestion();

    }

}


// ==========================================
// PREVIOUS QUESTION
// ==========================================

function previousQuestion() {

    if (
        current > 0
    ) {

        current--;

        showQuestion();

    }

}


// ==========================================
// SUBMIT TEST
// ==========================================

function submitTest() {

    if (submitted) {
        return;
    }


    const answered =
        Object.keys(answers).length;


    document.getElementById(
        "modalAnswered"
    ).innerText =
        `You have answered ${answered} of ${questions.length} questions.`;


    document.getElementById(
        "submitModal"
    ).style.display =
        "flex";

}


// ==========================================
// CLOSE SUBMIT MODAL
// ==========================================

function closeSubmitModal() {

    document.getElementById(
        "submitModal"
    ).style.display =
        "none";

}


// ==========================================
// CONFIRM SUBMIT
// ==========================================

async function confirmSubmit() {

    if (submitted) {
        return;
    }


    // ======================================
    // GET TOKEN
    // ======================================

    const token =
        localStorage.getItem("token");


    if (!token) {

        alert(
            "Session expired. Please login again."
        );

        window.location.href =
            "index.html";

        return;
    }


    submitted = true;


    // Stop timer
    if (timer) {
        clearInterval(timer);
    }


    // ======================================
    // CALCULATE SCORE
    // ======================================

    score = 0;


    questions.forEach(
        (q, index) => {

            const selectedAnswer =
                answers[index];


            const correctAnswer =
                q.answer;


            if (
                selectedAnswer !== undefined &&
                String(selectedAnswer).trim() ===
                String(correctAnswer).trim()
            ) {

                score++;

            }

        }
    );


    // ======================================
    // CALCULATE PERCENTAGE
    // ======================================

    const percentage =
        (
            (score / questions.length) *
            100
        ).toFixed(2);


    console.log(
        "================================="
    );

    console.log(
        "APTITUDE TEST RESULT"
    );

    console.log(
        "Score:",
        score
    );

    console.log(
        "Total Questions:",
        questions.length
    );

    console.log(
        "Percentage:",
        percentage
    );

    console.log(
        "================================="
    );


    // ======================================
    // SAVE RESULT TO DATABASE
    // ======================================

    try {

        const res =
            await fetch(
                `${API}/results`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        "Authorization":
                            `Bearer ${token}`
                    },

                    body:
                        JSON.stringify({

                            score:
                                score,

                            totalQuestions:
                                questions.length,

                            percentage:
                                Number(
                                    percentage
                                )

                        })
                }
            );


        if (!res.ok) {

            const errorText =
                await res.text();

            console.error(
                "Server response:",
                errorText
            );

            throw new Error(
                `Failed to save result: ${res.status}`
            );

        }


        console.log(
            "Result saved successfully."
        );


        // ==================================
        // CLOSE MODAL
        // ==================================

        closeSubmitModal();


        // ==================================
        // SHOW RESULT
        // ==================================

        alert(
            `Test Completed!\n\n` +
            `Score: ${score}/${questions.length}\n` +
            `Percentage: ${percentage}%`
        );


        // ==================================
        // REDIRECT DASHBOARD
        // ==================================

        window.location.href =
            "dashboard.html";


    } catch (error) {

        console.error(error);


        submitted = false;


        alert(
            "Unable to save your result. Please try again."
        );

    }

}


// ==========================================
// TIMER
// ==========================================

function startTimer() {

    updateTimer();


    timer =
        setInterval(
            () => {

                time--;

                updateTimer();


                if (time <= 0) {

                    clearInterval(timer);


                    alert(
                        "Time is up! Your test will be submitted."
                    );


                    confirmSubmit();

                }

            },
            1000
        );

}


// ==========================================
// DISPLAY TIMER
// ==========================================

function updateTimer() {

    const hours =
        Math.floor(
            time / 3600
        );


    const minutes =
        Math.floor(
            (time % 3600) / 60
        );


    const seconds =
        time % 60;


    const timerElement =
        document.getElementById(
            "timer"
        );


    if (timerElement) {

        timerElement.innerText =

            `${hours
                .toString()
                .padStart(2, "0")}:` +

            `${minutes
                .toString()
                .padStart(2, "0")}:` +

            `${seconds
                .toString()
                .padStart(2, "0")}`;

    }

}


// ==========================================
// ESCAPE HTML
// ==========================================

function escapeHtml(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


// ==========================================
// START APPLICATION
// ==========================================

loadQuestions();

