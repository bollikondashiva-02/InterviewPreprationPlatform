const token = localStorage.getItem("token");

const API_BASE = "http://localhost:3001";

let questions = [];
let currentQuestion = 0;
let answers = [];

// ===============================
// Load Questions
// ===============================

async function loadQuestions() {


if (!token) {
    alert("Session expired. Please login again.");
    window.location.href = "register.html";
    return;
}

try {

    const response = await fetch(
        `${API_BASE}/api/communication/questions/category/Reading`,
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
        document.getElementById("passageText").textContent =
            "No reading questions available.";

        document.getElementById("questionText").textContent =
            "No questions found.";

        return;
    }

    answers = new Array(questions.length).fill(null);

    createQuestionNavigator();

    displayQuestion();

} catch (error) {

    console.error(error);

    alert("Unable to load reading questions.");
}


}

// ===============================
// Display Question
// ===============================

function displayQuestion() {


const question = questions[currentQuestion];

document.getElementById("questionNumber").textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

document.getElementById("passageText").textContent =
    question.passage || "";

document.getElementById("questionText").textContent =
    question.question;

document.getElementById("optionA").textContent =
    question.optionA;

document.getElementById("optionB").textContent =
    question.optionB;

document.getElementById("optionC").textContent =
    question.optionC;

document.getElementById("optionD").textContent =
    question.optionD;


// Clear radio buttons

document.querySelectorAll(
    'input[name="answer"]'
).forEach(input => {

    input.checked = false;
});


// Restore previous answer

if (answers[currentQuestion]) {

    const selected = document.querySelector(
        `input[name="answer"][value="${answers[currentQuestion]}"]`
    );

    if (selected) {
        selected.checked = true;
    }
}


updateProgress();

updateNavigator();

updateButtons();


}

// ===============================
// Save Current Answer
// ===============================

function saveAnswer() {


const selected = document.querySelector(
    'input[name="answer"]:checked'
);

if (selected) {
    answers[currentQuestion] = selected.value;
}


}

// ===============================
// Next Question
// ===============================

function nextQuestion() {


saveAnswer();

if (currentQuestion < questions.length - 1) {

    currentQuestion++;

    displayQuestion();

} else {

    document.getElementById("submitBtn").style.display =
        "block";
}


}

// ===============================
// Previous Question
// ===============================

function previousQuestion() {


saveAnswer();

if (currentQuestion > 0) {

    currentQuestion--;

    displayQuestion();
}


}

// ===============================
// Question Navigator
// ===============================

function createQuestionNavigator() {


const container =
    document.getElementById("questionNumbers");

container.innerHTML = "";

questions.forEach((question, index) => {

    const button = document.createElement("button");

    button.className = "question-number";

    button.textContent = index + 1;

    button.addEventListener("click", function () {

        saveAnswer();

        currentQuestion = index;

        displayQuestion();

    });

    container.appendChild(button);
});


}

// ===============================
// Update Navigator
// ===============================

function updateNavigator() {


const buttons =
    document.querySelectorAll(".question-number");

buttons.forEach((button, index) => {

    button.classList.remove("active");
    button.classList.remove("answered");

    if (index === currentQuestion) {
        button.classList.add("active");
    }

    if (answers[index]) {
        button.classList.add("answered");
    }
});


}

// ===============================
// Update Progress
// ===============================

function updateProgress() {


const answered =
    answers.filter(answer => answer !== null).length;

document.getElementById("answeredCount").textContent =
    `Answered: ${answered} / ${questions.length}`;

const percentage =
    ((currentQuestion + 1) / questions.length) * 100;

document.getElementById("progressFill").style.width =
    `${percentage}%`;


}

// ===============================
// Update Navigation Buttons
// ===============================

function updateButtons() {


const previousBtn =
    document.getElementById("previousBtn");

const nextBtn =
    document.getElementById("nextBtn");

const submitBtn =
    document.getElementById("submitBtn");


previousBtn.disabled =
    currentQuestion === 0;


if (currentQuestion === questions.length - 1) {

    nextBtn.style.display = "none";

    submitBtn.style.display = "block";

} else {

    nextBtn.style.display = "block";

    submitBtn.style.display = "none";
}


}

// ===============================
// Submit Test
// ===============================

async function submitTest() {


saveAnswer();

const unanswered =
    answers.filter(answer => answer === null).length;


if (unanswered > 0) {

    const confirmSubmit = confirm(
        `You have ${unanswered} unanswered question(s).\n\nDo you want to submit the test?`
    );

    if (!confirmSubmit) {
        return;
    }
}


let score = 0;


questions.forEach((question, index) => {

    if (
        answers[index] &&
        answers[index].toUpperCase() ===
        question.answer.toUpperCase()
    ) {

        score++;
    }
});


const total = questions.length;

const percentage =
    Math.round((score / total) * 100);


// ==========================================
// SAVE RESULT TO DATABASE
// ==========================================

try {

    const response = await fetch(
        `${API_BASE}/api/communication/results`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },

            body: JSON.stringify({
                category: "Reading",
                score: score,
                totalQuestions: total,
                percentage: percentage
            })
        }
    );


    if (!response.ok) {

        throw new Error(
            "Failed to save communication result"
        );
    }


    alert(
        `Reading Comprehension Test Completed!\n\n` +
        `Score: ${score} / ${total}\n` +
        `Percentage: ${percentage}%\n\n` +
        `Result saved successfully.`
    );


    window.location.href =
        "communication.html";


} catch (error) {

    console.error(
        "Error saving communication result:",
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


// ===============================
// Logout
// ===============================

function logout() {


localStorage.removeItem("token");

window.location.href =
    "register.html";


}

// ===============================
// Start
// ===============================

loadQuestions();
