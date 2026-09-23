const token = localStorage.getItem("token");

const API_BASE = "http://localhost:3001";

let questions = [];

let currentQuestion = 0;

let answers = [];

/* =========================================
Check Login
========================================= */

if (!token) {


window.location.href = "register.html";


}

/* =========================================
Load Questions
========================================= */

async function loadQuestions() {


try {

    const response = await fetch(
        `${API_BASE}/api/communication/questions/category/Vocabulary`,
        {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
    );


    if (!response.ok) {

        throw new Error(
            "Failed to load vocabulary questions"
        );

    }


    questions = await response.json();


    if (!questions || questions.length === 0) {

        alert(
            "No Vocabulary questions available."
        );

        return;

    }


    answers = new Array(
        questions.length
    ).fill(null);


    createQuestionNavigator();

    displayQuestion();


} catch (error) {

    console.error(
        "Error loading Vocabulary questions:",
        error
    );

    alert(
        "Unable to load Vocabulary questions."
    );

}


}

/* =========================================
Display Question
========================================= */

function displayQuestion() {


const question =
    questions[currentQuestion];


document.getElementById(
    "questionNumber"
).textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;


document.getElementById(
    "answeredCount"
).textContent =
    `Answered: ${getAnsweredCount()} / ${questions.length}`;


document.getElementById(
    "questionText"
).textContent =
    question.question;


document.getElementById(
    "optionA"
).textContent =
    question.optionA;


document.getElementById(
    "optionB"
).textContent =
    question.optionB;


document.getElementById(
    "optionC"
).textContent =
    question.optionC;


document.getElementById(
    "optionD"
).textContent =
    question.optionD;


const radioButtons =
    document.querySelectorAll(
        'input[name="answer"]'
    );


radioButtons.forEach(
    radio => {

        radio.checked =
            answers[currentQuestion] ===
            radio.value;

    }
);


updateProgress();

updateNavigationButtons();

updateQuestionNavigator();


}

/* =========================================
Save Current Answer
========================================= */

function saveAnswer() {


const selected =
    document.querySelector(
        'input[name="answer"]:checked'
    );


if (selected) {

    answers[currentQuestion] =
        selected.value;

}


}

/* =========================================
Next Question
========================================= */

function nextQuestion() {


saveAnswer();


if (
    currentQuestion <
    questions.length - 1
) {

    currentQuestion++;

    displayQuestion();

}


}

/* =========================================
Previous Question
========================================= */

function previousQuestion() {


saveAnswer();


if (currentQuestion > 0) {

    currentQuestion--;

    displayQuestion();

}


}

/* =========================================
Question Navigator
========================================= */

function createQuestionNavigator() {


const container =
    document.getElementById(
        "questionNumbers"
    );


container.innerHTML = "";


questions.forEach(
    (question, index) => {

        const button =
            document.createElement(
                "button"
            );


        button.textContent =
            index + 1;


        button.type = "button";


        button.onclick = function () {

            saveAnswer();

            currentQuestion = index;

            displayQuestion();

        };


        container.appendChild(button);

    }
);


}

/* =========================================
Update Navigator
========================================= */

function updateQuestionNavigator() {


const buttons =
    document.querySelectorAll(
        "#questionNumbers button"
    );


buttons.forEach(
    (button, index) => {

        button.classList.remove(
            "current-question"
        );

        button.classList.remove(
            "answered-question"
        );


        if (
            index === currentQuestion
        ) {

            button.classList.add(
                "current-question"
            );

        }


        if (
            answers[index] !== null
        ) {

            button.classList.add(
                "answered-question"
            );

        }

    }
);


}

/* =========================================
Answer Count
========================================= */

function getAnsweredCount() {


return answers.filter(
    answer => answer !== null
).length;


}

/* =========================================
Progress Bar
========================================= */

function updateProgress() {


const answered =
    getAnsweredCount();


const percentage =
    questions.length === 0
        ? 0
        : (answered / questions.length) * 100;


document.getElementById(
    "progressFill"
).style.width =
    `${percentage}%`;


}

/* =========================================
Navigation Buttons
========================================= */

function updateNavigationButtons() {


const previousBtn =
    document.getElementById(
        "previousBtn"
    );

const nextBtn =
    document.getElementById(
        "nextBtn"
    );

const submitBtn =
    document.getElementById(
        "submitBtn"
    );


previousBtn.disabled =
    currentQuestion === 0;


if (
    currentQuestion ===
    questions.length - 1
) {

    nextBtn.style.display =
        "none";

    submitBtn.style.display =
        "inline-block";

} else {

    nextBtn.style.display =
        "inline-block";

    submitBtn.style.display =
        "none";

}


}

/* =========================================
Submit Test
========================================= */

async function submitTest() {


saveAnswer();


const unanswered =
    answers.filter(
        answer => answer === null
    ).length;


if (unanswered > 0) {

    const confirmSubmit =
        confirm(
            `You have ${unanswered} unanswered question(s).\n\nDo you want to submit the test?`
        );


    if (!confirmSubmit) {

        return;

    }

}


let score = 0;


questions.forEach(
    (question, index) => {

        if (
            answers[index] &&
            answers[index].toUpperCase() ===
            question.answer.toUpperCase()
        ) {

            score++;

        }

    }
);


const total =
    questions.length;


const percentage =
    Math.round(
        (score / total) * 100
    );


try {

    const response =
        await fetch(
            `${API_BASE}/api/communication/results`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json",

                    "Authorization":
                        "Bearer " + token
                },

                body: JSON.stringify({

                    category:
                        "Vocabulary",

                    score:
                        score,

                    totalQuestions:
                        total,

                    percentage:
                        percentage

                })
            }
        );


    if (!response.ok) {

        throw new Error(
            "Failed to save Vocabulary result"
        );

    }


    alert(
        `Vocabulary Test Completed!\n\n` +
        `Score: ${score} / ${total}\n` +
        `Percentage: ${percentage}%\n\n` +
        `Result saved successfully.`
    );


    window.location.href =
        "communication.html";


} catch (error) {

    console.error(
        "Error saving Vocabulary result:",
        error
    );


    alert(
        `Test completed.\n\n` +
        `Score: ${score} / ${total}\n` +
        `Percentage: ${percentage}%\n\n` +
        `Result could not be saved.`
    );

}


}

/* =========================================
Logout
========================================= */

function logout() {


localStorage.removeItem(
    "token"
);

window.location.href =
    "register.html";


}

/* =========================================
Start
========================================= */

loadQuestions();
