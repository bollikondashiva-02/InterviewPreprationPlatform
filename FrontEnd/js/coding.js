
console.log("CODING.JS LOADED");

const token = localStorage.getItem("token");
const API_BASE = API;

let allQuestions = [];
let currentIndex = 0;
let selectedAnswers = {};
let currentLanguage = "";

// ========================================
// START TEST
// ========================================

async function startTest(language) {

    if (!token) {
        alert("Please login first.");
        window.location.href = "index.html";
        return;
    }

    currentLanguage = language;
    currentIndex = 0;
    selectedAnswers = {};

    try {

        const response = await fetch(
            `${API_BASE}/coding/questions/category/${encodeURIComponent(language)}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (!response.ok) {
            throw new Error("Unable to load coding questions.");
        }

        allQuestions = await response.json();

        if (!Array.isArray(allQuestions) || allQuestions.length === 0) {
            alert(`No ${language} questions available.`);
            return;
        }

        // ========================================
        // SHOW TEST SECTION
        // ========================================

        document
            .getElementById("languageSection")
            .classList.add("hidden");

        document
            .getElementById("testSection")
            .classList.remove("hidden");

        // ========================================
        // TEST HEADING
        // ========================================

        document.getElementById("testTitle").textContent =
            `${language} Coding Assessment`;

        document.getElementById("testLanguage").textContent =
            language;

        // ========================================
        // TOTAL QUESTIONS
        // ========================================

        document.getElementById("totalQuestions").textContent =
            allQuestions.length;

        document.getElementById("answeredQuestions").textContent =
            "0";

        // ========================================
        // BACK TO CODING BUTTON
        // ========================================

        const testHeader =
            document.querySelector(".test-header");

        // Remove old Back to Coding button if it exists
        const oldBackButton =
            testHeader.querySelector(".back-btn");

        if (oldBackButton) {
            oldBackButton.remove();
        }

        // Create Back to Coding button
        const backButton =
            document.createElement("button");

        backButton.type = "button";

        backButton.className = "back-btn";

        backButton.textContent =
            "← Back to Coding";

        backButton.onclick = function () {
            window.location.href = "coding.html";
        };

        testHeader.appendChild(backButton);

        // ========================================
        // BUILD TEST
        // ========================================

        buildNavigator();

        displayQuestion();

    } catch (error) {

        console.error("Start test error:", error);

        alert("Unable to start coding test.");
    }
}


// ========================================
// DISPLAY QUESTION
// ========================================

function displayQuestion() {

    const question =
        allQuestions[currentIndex];

    if (!question) {
        return;
    }

    const questionsBox =
        document.getElementById("questions");

    questionsBox.innerHTML = `
        <div class="question-card">

            <h2>
                Question ${currentIndex + 1}
            </h2>

            <p class="question-text">
                ${escapeHTML(question.question)}
            </p>

            <p>
                <strong>Difficulty:</strong>
                ${escapeHTML(question.difficulty || "Medium")}
            </p>

        </div>
    `;

    displayOptions(question);

    updateNavigation();

    buildNavigator();

    updateAnsweredCount();
}


// ========================================
// DISPLAY OPTIONS
// ========================================

function displayOptions(question) {

    const optionsBox =
        document.getElementById("options");

    optionsBox.innerHTML = "";

    const options = [
        {
            letter: "A",
            text: question.optionA
        },
        {
            letter: "B",
            text: question.optionB
        },
        {
            letter: "C",
            text: question.optionC
        },
        {
            letter: "D",
            text: question.optionD
        }
    ];

    options.forEach(option => {

        const label =
            document.createElement("label");

        label.className = "option";

        const isSelected =
            selectedAnswers[question.id] === option.letter;

        if (isSelected) {
            label.classList.add("selected");
        }

        label.innerHTML = `
            <input
                type="radio"
                name="answer"
                value="${option.letter}"
                ${isSelected ? "checked" : ""}
            >

            <span class="option-letter">
                ${option.letter}
            </span>

            <span>
                ${escapeHTML(option.text)}
            </span>
        `;

        const input =
            label.querySelector("input");

        input.addEventListener("change", function () {

            selectedAnswers[question.id] =
                option.letter;

            document
                .querySelectorAll(".option")
                .forEach(item => {
                    item.classList.remove("selected");
                });

            label.classList.add("selected");

            updateAnsweredCount();

            buildNavigator();
        });

        optionsBox.appendChild(label);
    });
}


// ========================================
// UPDATE ANSWERED COUNT
// ========================================

function updateAnsweredCount() {

    const answeredCount =
        Object.keys(selectedAnswers).length;

    document
        .getElementById("answeredQuestions")
        .textContent =
        answeredCount;
}


// ========================================
// NEXT QUESTION
// ========================================

function nextQuestion() {

    if (
        currentIndex <
        allQuestions.length - 1
    ) {

        currentIndex++;

        displayQuestion();
    }
}


// ========================================
// PREVIOUS QUESTION
// ========================================

function previousQuestion() {

    if (currentIndex > 0) {

        currentIndex--;

        displayQuestion();
    }
}


// ========================================
// QUESTION NAVIGATION
// ========================================

function updateNavigation() {

    const previousBtn =
        document.getElementById("previousBtn");

    const nextBtn =
        document.getElementById("nextBtn");

    previousBtn.disabled =
        currentIndex === 0;

    if (
        currentIndex ===
        allQuestions.length - 1
    ) {

        nextBtn.style.display = "none";

    } else {

        nextBtn.style.display = "block";
    }
}


// ========================================
// BUILD QUESTION NAVIGATOR
// ========================================

function buildNavigator() {

    const navigator =
        document.getElementById(
            "questionNavigator"
        );

    navigator.innerHTML = "";

    allQuestions.forEach(
        (question, index) => {

            const button =
                document.createElement("button");

            button.type = "button";

            button.className = "nav-btn";

            button.textContent =
                index + 1;

            if (index === currentIndex) {
                button.classList.add("active");
            }

            if (
                selectedAnswers[question.id]
            ) {
                button.classList.add("answered");
            }

            button.onclick = function () {

                currentIndex = index;

                displayQuestion();
            };

            navigator.appendChild(button);
        }
    );
}


// ========================================
// SUBMIT TEST
// ========================================

async function submitTest() {

    const unanswered =
        allQuestions.filter(
            question =>
                !selectedAnswers[question.id]
        );

    if (unanswered.length > 0) {

        const confirmSubmit = confirm(
            `You have ${unanswered.length} unanswered question(s).\n\nDo you want to submit anyway?`
        );

        if (!confirmSubmit) {
            return;
        }
    }

    let correct = 0;

    allQuestions.forEach(question => {

        const selected =
            selectedAnswers[question.id];

        const answer =
            question.answer;

        if (
            selected &&
            answer &&
            selected.toUpperCase() ===
            answer.toUpperCase()
        ) {
            correct++;
        }
    });

    const total =
        allQuestions.length;

    const wrong =
        total - correct;

    const percentage =
        total === 0
            ? 0
            : Math.round(
                (correct / total) * 100
            );

    // ========================================
    // SAVE RESULT
    // ========================================

    try {

        await saveTestResult(
            total,
            correct,
            wrong,
            percentage
        );

    } catch (error) {

        console.error(
            "Result save error:",
            error
        );

        alert(
            "Test result could not be saved."
        );

        return;
    }

    // ========================================
    // SHOW RESULT
    // ========================================

    showResult(
        total,
        correct,
        wrong,
        percentage
    );
}


// ========================================
// SAVE TEST RESULT
// ========================================

async function saveTestResult(
    total,
    correct,
    wrong,
    percentage
) {

    const response =
        await fetch(
            `${API_BASE}/coding/test-result`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json",

                    Authorization:
                        `Bearer ${token}`
                },

                body: JSON.stringify({

                    language:
                        currentLanguage,

                    totalQuestions:
                        total,

                    correctAnswers:
                        correct,

                    wrongAnswers:
                        wrong,

                    score:
                        percentage
                })
            }
        );

    if (!response.ok) {

        const errorText =
            await response.text();

        throw new Error(
            `Failed to save test result: ${response.status} ${errorText}`
        );
    }

    return response.json();
}


// ========================================
// SHOW RESULT
// ========================================

function showResult(
    total,
    correct,
    wrong,
    percentage
) {

    document
        .getElementById("testSection")
        .classList.add("hidden");

    document
        .getElementById("resultSection")
        .classList.remove("hidden");

    document
        .getElementById("resultLanguage")
        .textContent =
        `${currentLanguage} Assessment`;

    document
        .getElementById("resultScore")
        .textContent =
        percentage;

    document
        .getElementById("resultTotal")
        .textContent =
        total;

    document
        .getElementById("resultCorrect")
        .textContent =
        correct;

    document
        .getElementById("resultWrong")
        .textContent =
        wrong;

    document
        .getElementById("resultPercentage")
        .textContent =
        `${percentage}%`;

    let message;

    if (percentage >= 80) {

        message =
            "Excellent performance! 🚀";

    } else if (percentage >= 60) {

        message =
            "Good job! Keep practicing. 👍";

    } else if (percentage >= 40) {

        message =
            "Nice attempt. More practice will help. 💪";

    } else {

        message =
            "Keep practicing and try again. 📚";
    }

    document
        .getElementById("resultMessage")
        .textContent =
        message;
}


// ========================================
// BACK TO DASHBOARD
// ========================================

function goToDashboard() {

    window.location.href =
        "dashboard.html";
}


// ========================================
// RESTART TEST
// ========================================

function restartTest() {

    document
        .getElementById("resultSection")
        .classList.add("hidden");

    document
        .getElementById("testSection")
        .classList.add("hidden");

    document
        .getElementById("languageSection")
        .classList.remove("hidden");

    allQuestions = [];

    currentIndex = 0;

    selectedAnswers = {};

    currentLanguage = "";

    document
        .getElementById("questionNavigator")
        .innerHTML = "";

    document
        .getElementById("questions")
        .innerHTML = `
            <div class="question-card">
                <h2>
                    Loading question...
                </h2>
            </div>
        `;

    document
        .getElementById("options")
        .innerHTML = "";

    document
        .getElementById("answeredQuestions")
        .textContent = "0";

    document
        .getElementById("totalQuestions")
        .textContent = "0";
}


// ========================================
// LOGOUT
// ========================================

function logout() {

    localStorage.removeItem("token");

    alert("Logged out successfully!");

    window.location.href =
        "coding.html";
}


// ========================================
// ESCAPE HTML
// ========================================

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

