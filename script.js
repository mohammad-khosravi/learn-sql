document.addEventListener("DOMContentLoaded", function () {
    let currentQuestionIndex = 0;
    let questions = [];

    function loadQuestions() {
        fetch("/questions")
            .then(response => response.json())
            .then(data => {
                questions = data;
                displayQuestion();
            });
    }

    function displayQuestion() {
        if (currentQuestionIndex < questions.length) {
            document.getElementById("question").innerText = questions[currentQuestionIndex].question;
        } else {
            document.getElementById("question").innerText = "You have completed all questions!";
        }
    }

    document.getElementById("runQuery").addEventListener("click", function () {
        const query = document.getElementById("sqlQuery").value;
        fetch("/run_query", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query, index: currentQuestionIndex })
        })
            .then(response => response.json())
            .then(data => {
                document.getElementById("result").innerText = data.message;
                if (data.correct) {
                    currentQuestionIndex++;
                    displayQuestion();
                }
            });
    });

    loadQuestions();
});
