console.log("PROGRESS.JS LOADED");

async function loadProgress() {

    try {

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first.");
            window.location.href = "index.html";
            return;
        }


        // =====================================================
        // GET CODING RESULTS
        // =====================================================

        const codingResponse = await fetch(
            `${API}/coding/test-results`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );


        if (!codingResponse.ok) {

            const errorText =
                await codingResponse.text();

            throw new Error(
                `Coding results failed: ${codingResponse.status} ${errorText}`
            );
        }


        const codingResults =
            await codingResponse.json();


        console.log(
            "Coding results:",
            codingResults
        );


        // =====================================================
        // GET APTITUDE RESULTS
        // =====================================================

        const aptitudeResponse = await fetch(
            `${API}/results`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );


        if (!aptitudeResponse.ok) {

            const errorText =
                await aptitudeResponse.text();

            throw new Error(
                `Aptitude results failed: ${aptitudeResponse.status} ${errorText}`
            );
        }


        const aptitudeResults =
            await aptitudeResponse.json();


        console.log(
            "Aptitude results:",
            aptitudeResults
        );


        // =====================================================
        // GET COMMUNICATION RESULTS
        // =====================================================

        const communicationResponse = await fetch(
            `${API}/communication/results`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );


        if (!communicationResponse.ok) {

            const errorText =
                await communicationResponse.text();

            throw new Error(
                `Communication results failed: ${communicationResponse.status} ${errorText}`
            );
        }


        const communicationResults =
            await communicationResponse.json();


        console.log(
            "Communication results:",
            communicationResults
        );


        // =====================================================
        // MAKE SURE ARRAYS
        // =====================================================

        const coding =
            Array.isArray(codingResults)
                ? codingResults
                : [];


        const aptitude =
            Array.isArray(aptitudeResults)
                ? aptitudeResults
                : [];


        const communication =
            Array.isArray(communicationResults)
                ? communicationResults
                : [];


        console.log(
            "Total Coding Tests:",
            coding.length
        );


        console.log(
            "Total Aptitude Tests:",
            aptitude.length
        );


        console.log(
            "Total Communication Tests:",
            communication.length
        );


        // =====================================================
        // OVERALL STATISTICS
        // =====================================================

        const totalTests =
            coding.length +
            aptitude.length +
            communication.length;


        const allScores = [];


        coding.forEach(result => {

            allScores.push(
                Number(result.score) || 0
            );

        });


        aptitude.forEach(result => {

            allScores.push(
                Number(result.percentage) || 0
            );

        });


        communication.forEach(result => {

            allScores.push(
                Number(result.percentage) || 0
            );

        });


        const highestScore =
            allScores.length > 0
                ? Math.max(...allScores)
                : 0;


        const averageScore =
            allScores.length > 0
                ? (
                    allScores.reduce(
                        (sum, score) =>
                            sum + score,
                        0
                    ) / allScores.length
                ).toFixed(2)
                : "0.00";


        const totalQuestions =
            coding.reduce(
                (sum, result) =>
                    sum +
                    (Number(result.totalQuestions) || 0),
                0
            )
            +
            aptitude.reduce(
                (sum, result) =>
                    sum +
                    (Number(result.totalQuestions) || 0),
                0
            )
            +
            communication.reduce(
                (sum, result) =>
                    sum +
                    (Number(result.totalQuestions) || 0),
                0
            );


        const totalCorrect =
            coding.reduce(
                (sum, result) =>
                    sum +
                    (Number(result.correctAnswers) || 0),
                0
            )
            +
            aptitude.reduce(
                (sum, result) =>
                    sum +
                    (Number(result.score) || 0),
                0
            )
            +
            communication.reduce(
                (sum, result) =>
                    sum +
                    (Number(result.score) || 0),
                0
            );


        const totalWrong =
            coding.reduce(
                (sum, result) =>
                    sum +
                    (Number(result.wrongAnswers) || 0),
                0
            )
            +
            aptitude.reduce(
                (sum, result) =>
                    sum +
                    (
                        (Number(result.totalQuestions) || 0)
                        -
                        (Number(result.score) || 0)
                    ),
                0
            )
            +
            communication.reduce(
                (sum, result) =>
                    sum +
                    (
                        (Number(result.totalQuestions) || 0)
                        -
                        (Number(result.score) || 0)
                    ),
                0
            );


        // =====================================================
        // DISPLAY STATISTICS
        // =====================================================

        document.getElementById("stats").innerHTML = `

            <div class="stat-card">

                <h3>Total Tests</h3>

                <p>
                    ${totalTests}
                </p>

            </div>


            <div class="stat-card">

                <h3>Highest Score</h3>

                <p>
                    ${highestScore}%
                </p>

            </div>


            <div class="stat-card">

                <h3>Average Score</h3>

                <p>
                    ${averageScore}%
                </p>

            </div>


            <div class="stat-card">

                <h3>Total Questions</h3>

                <p>
                    ${totalQuestions}
                </p>

            </div>


            <div class="stat-card">

                <h3>Correct Answers</h3>

                <p>
                    ${totalCorrect}
                </p>

            </div>


            <div class="stat-card">

                <h3>Wrong Answers</h3>

                <p>
                    ${totalWrong}
                </p>

            </div>

        `;


        // =====================================================
        // CODING LANGUAGE PROGRESS
        // =====================================================

        const languages = [

            {
                name: "Java",
                icon: "☕"
            },

            {
                name: "Python",
                icon: "🐍"
            },

            {
                name: "JavaScript",
                icon: "🟨"
            },

            {
                name: "HTML",
                icon: "🌐"
            },

            {
                name: "CSS",
                icon: "🎨"
            },

            {
                name: "SQL",
                icon: "🗄️"
            }

        ];


        let languageProgressHTML = "";


        languages.forEach(language => {

            const languageResults =
                coding.filter(
                    result =>
                        String(result.language).toLowerCase() ===
                        language.name.toLowerCase()
                );


            let bestScore = 0;


            if (languageResults.length > 0) {

                bestScore =
                    Math.max(
                        ...languageResults.map(
                            result =>
                                Number(result.score) || 0
                        )
                    );

            }


            const progress =
                Math.min(bestScore, 100);


            languageProgressHTML += `

                <div class="java-progress-card">

                    <div class="java-progress-header">

                        <div>

                            <h3>
                                ${language.icon}
                                ${language.name}
                                Progress
                            </h3>

                            <p>
                                Best ${language.name}
                                test score
                            </p>

                        </div>


                        <strong>
                            ${progress}%
                        </strong>

                    </div>


                    <div class="progress-bar">

                        <div
                            class="progress-fill"
                            style="width: ${progress}%">
                        </div>

                    </div>

                </div>

            `;

        });


        // =====================================================
        // APTITUDE PROGRESS
        // =====================================================

        let aptitudeBestScore = 0;


        if (aptitude.length > 0) {

            aptitudeBestScore =
                Math.max(
                    ...aptitude.map(
                        result =>
                            Number(result.percentage) || 0
                    )
                );

        }


        languageProgressHTML += `

            <div class="java-progress-card">

                <div class="java-progress-header">

                    <div>

                        <h3>
                            🧠 Aptitude Progress
                        </h3>

                        <p>
                            Best Aptitude test score
                        </p>

                    </div>


                    <strong>
                        ${aptitudeBestScore}%
                    </strong>

                </div>


                <div class="progress-bar">

                    <div
                        class="progress-fill"
                        style="width: ${Math.min(
                            aptitudeBestScore,
                            100
                        )}%">
                    </div>

                </div>

            </div>

        `;


        // =====================================================
        // COMMUNICATION PROGRESS
        // =====================================================

        const communicationCategories = [

            {
                name: "Reading",
                icon: "📖"
            },

            {
                name: "Vocabulary",
                icon: "📚"
            },

            {
                name: "Interview",
                icon: "💼"
            },

            {
                name: "Situational",
                icon: "🗣️"
            },

            {
                name: "Speaking",
                icon: "🎤"
            }

        ];


        communicationCategories.forEach(category => {

            const categoryResults =
                communication.filter(
                    result =>
                        String(result.category).toLowerCase() ===
                        category.name.toLowerCase()
                );


            let bestScore = 0;


            if (categoryResults.length > 0) {

                bestScore =
                    Math.max(
                        ...categoryResults.map(
                            result =>
                                Number(result.percentage) || 0
                        )
                    );

            }


            const progress =
                Math.min(bestScore, 100);


            languageProgressHTML += `

                <div class="java-progress-card">

                    <div class="java-progress-header">

                        <div>

                            <h3>
                                ${category.icon}
                                ${category.name}
                                Communication Progress
                            </h3>

                            <p>
                                Best ${category.name}
                                test score
                            </p>

                        </div>


                        <strong>
                            ${progress}%
                        </strong>

                    </div>


                    <div class="progress-bar">

                        <div
                            class="progress-fill"
                            style="width: ${progress}%">
                        </div>

                    </div>

                </div>

            `;

        });


        // =====================================================
        // DISPLAY PROGRESS CARDS
        // =====================================================

        const historyElement =
            document.getElementById("history");


        historyElement.innerHTML = "";


        historyElement.insertAdjacentHTML(
            "beforebegin",
            languageProgressHTML
        );


        // =====================================================
        // TEST HISTORY
        // =====================================================

        let historyHTML = "";


        // =====================================================
        // APTITUDE HISTORY
        // =====================================================

        aptitude
            .slice()
            .reverse()
            .forEach((result, index) => {

                const score =
                    Number(result.score) || 0;


                const total =
                    Number(result.totalQuestions) || 0;


                const percentage =
                    Number(result.percentage) || 0;


                const testDate =
                    result.testDate
                        ? new Date(
                            result.testDate
                        ).toLocaleString()
                        : "Date not available";


                historyHTML += `

                    <div class="history-card">

                        <h3>
                            🧠 Aptitude Test ${index + 1}
                        </h3>


                        <p>

                            <strong>
                                Score:
                            </strong>

                            ${score}/${total}

                        </p>


                        <p>

                            <strong>
                                Correct:
                            </strong>

                            ${score}

                        </p>


                        <p>

                            <strong>
                                Wrong:
                            </strong>

                            ${total - score}

                        </p>


                        <p>

                            <strong>
                                Percentage:
                            </strong>

                            ${percentage}%

                        </p>


                        <p>

                            <strong>
                                Date:
                            </strong>

                            ${escapeHTML(testDate)}

                        </p>

                    </div>

                `;

            });


        // =====================================================
        // CODING HISTORY
        // =====================================================

        coding
            .slice()
            .reverse()
            .forEach((result, index) => {

                const score =
                    Number(result.score) || 0;


                historyHTML += `

                    <div class="history-card">

                        <h3>

                            💻 Coding Test -
                            ${escapeHTML(
                                result.language || "Unknown"
                            )}

                        </h3>


                        <p>

                            <strong>
                                Score:
                            </strong>

                            ${result.correctAnswers || 0}/
                            ${result.totalQuestions || 0}

                        </p>


                        <p>

                            <strong>
                                Correct:
                            </strong>

                            ${result.correctAnswers || 0}

                        </p>


                        <p>

                            <strong>
                                Wrong:
                            </strong>

                            ${result.wrongAnswers || 0}

                        </p>


                        <p>

                            <strong>
                                Percentage:
                            </strong>

                            ${score}%

                        </p>

                    </div>

                `;

            });


        // =====================================================
        // COMMUNICATION HISTORY
        // =====================================================

        communication
            .slice()
            .reverse()
            .forEach((result, index) => {

                const score =
                    Number(result.score) || 0;


                const total =
                    Number(result.totalQuestions) || 0;


                const percentage =
                    Number(result.percentage) || 0;


                const testDate =
                    result.testDate
                        ? new Date(
                            result.testDate
                        ).toLocaleString()
                        : "Date not available";


                historyHTML += `

                    <div class="history-card">

                        <h3>

                            🗣️ Communication Test -
                            ${escapeHTML(
                                result.category || "Unknown"
                            )}

                        </h3>


                        <p>

                            <strong>
                                Score:
                            </strong>

                            ${score}/${total}

                        </p>


                        <p>

                            <strong>
                                Correct:
                            </strong>

                            ${score}

                        </p>


                        <p>

                            <strong>
                                Wrong:
                            </strong>

                            ${total - score}

                        </p>


                        <p>

                            <strong>
                                Percentage:
                            </strong>

                            ${percentage}%

                        </p>


                        <p>

                            <strong>
                                Date:
                            </strong>

                            ${escapeHTML(testDate)}

                        </p>

                    </div>

                `;

            });


        // =====================================================
        // NO HISTORY
        // =====================================================

        if (
            historyHTML.trim() === ""
        ) {

            historyHTML =
                "<h3>No tests taken yet.</h3>";

        }


        document.getElementById(
            "history"
        ).innerHTML =
            historyHTML;


        // =====================================================
        // SCORE CHART
        // =====================================================

        const canvas =
            document.getElementById(
                "scoreChart"
            );


        if (
            canvas &&
            typeof Chart !== "undefined"
        ) {

            const labels = [];
            const scores = [];


            // =================================================
            // APTITUDE
            // =================================================

            aptitude.forEach(
                (result, index) => {

                    labels.push(
                        `Aptitude Test ${index + 1}`
                    );


                    scores.push(
                        Number(
                            result.percentage
                        ) || 0
                    );

                }
            );


            // =================================================
            // CODING
            // =================================================

            coding.forEach(
                (result, index) => {

                    labels.push(
                        `${result.language || "Coding"} Test ${index + 1}`
                    );


                    scores.push(
                        Number(
                            result.score
                        ) || 0
                    );

                }
            );


            // =================================================
            // COMMUNICATION
            // =================================================

            communication.forEach(
                (result, index) => {

                    labels.push(
                        `Communication - ${
                            result.category || "Unknown"
                        } ${index + 1}`
                    );


                    scores.push(
                        Number(
                            result.percentage
                        ) || 0
                    );

                }
            );


            // =================================================
            // DEBUG CHART DATA
            // =================================================

            console.log(
                "Chart Labels:",
                labels
            );


            console.log(
                "Chart Scores:",
                scores
            );


            // =================================================
            // DESTROY OLD CHART
            // =================================================

            const existingChart =
                Chart.getChart(canvas);


            if (existingChart) {

                existingChart.destroy();

            }


            // =================================================
            // CREATE CHART
            // =================================================

            new Chart(
                canvas.getContext("2d"),
                {

                    type: "bar",

                    data: {

                        labels: labels,

                        datasets: [

                            {

                                label:
                                    "Score (%)",

                                data:
                                    scores,

                                borderWidth:
                                    1

                            }

                        ]

                    },

                    options: {

                        responsive: true,

                        maintainAspectRatio:
                            false,

                        scales: {

                            y: {

                                beginAtZero:
                                    true,

                                max:
                                    100

                            }

                        },

                        plugins: {

                            legend: {

                                display:
                                    true

                            }

                        }

                    }

                }
            );

        }

    }
    catch (error) {

        console.error(
            "Progress loading error:",
            error
        );


        alert(
            "Unable to load progress."
        );

    }

}


// =====================================================
// HTML ESCAPE
// =====================================================

function escapeHTML(value) {

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


// =====================================================
// LOAD PROGRESS
// =====================================================

loadProgress();