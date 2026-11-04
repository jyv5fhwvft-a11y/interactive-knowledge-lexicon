
/* =========================================
   INTERACTIVE KNOWLEDGE LEXICON
   PING QUIZ — SCORE AND PROGRESS TRACKER
   ========================================= */

(function initializePingQuizScore() {

    const assessment = document.getElementById("knowledge-assessment");

    if (!assessment) {
        return;
    }

    const questions = Array.from(
        assessment.querySelectorAll(".quiz-question")
    );

    const totalQuestions = questions.length;

    const answeredCountElement =
        document.getElementById("quiz-answered-count");

    const correctCountElement =
        document.getElementById("quiz-correct-count");

    const progressTrack =
        document.getElementById("quiz-progress-track");

    const progressFill =
        document.getElementById("quiz-progress-fill");

    const finalSummary =
        document.getElementById("quiz-final-summary");

    const finalScore =
        document.getElementById("quiz-final-score");

    const performanceMessage =
        document.getElementById("quiz-performance-message");

    const restartButton =
        document.getElementById("quiz-restart-button");

    // Store only the latest answer for each question.
    const recordedAnswers = new Map();


    // ==========================================
    // UPDATE PROGRESS AND SCORE
    // ==========================================

    function updateDashboard() {

        const answeredCount = recordedAnswers.size;

        const correctCount = Array.from(
            recordedAnswers.values()
        ).filter(Boolean).length;

        const progressPercentage = totalQuestions > 0
            ? (answeredCount / totalQuestions) * 100
            : 0;

        if (answeredCountElement) {
            answeredCountElement.textContent = answeredCount;
        }

        if (correctCountElement) {
            correctCountElement.textContent = correctCount;
        }

        if (progressFill) {
            progressFill.style.width =
                progressPercentage + "%";
        }

        if (progressTrack) {
            progressTrack.setAttribute(
                "aria-valuenow",
                answeredCount
            );
        }

        // Show the final summary only after all questions
        // have received an answer.

        if (answeredCount === totalQuestions && totalQuestions > 0) {

            const percentage = Math.round(
                (correctCount / totalQuestions) * 100
            );

            if (finalScore) {
                finalScore.textContent =
                    "Your score: " + correctCount +
                    " out of " + totalQuestions +
                    " (" + percentage + "%)";
            }

            if (performanceMessage) {

                if (percentage === 100) {
                    performanceMessage.textContent =
                        "Outstanding! You answered every question correctly.";
                } else if (percentage >= 80) {
                    performanceMessage.textContent =
                        "Excellent work! You have a strong understanding of Ping.";
                } else if (percentage >= 60) {
                    performanceMessage.textContent =
                        "Good effort! Review a few concepts to strengthen your understanding.";
                } else if (percentage >= 40) {
                    performanceMessage.textContent =
                        "You're making progress. Revisit the lesson and try again.";
                } else {
                    performanceMessage.textContent =
                        "Keep learning! Review the lesson sections before attempting the assessment again.";
                }

            }

            if (finalSummary) {
                finalSummary.hidden = false;
            }

        } else if (finalSummary) {

            finalSummary.hidden = true;

        }

    }


    // ==========================================
    // RECORD AN ANSWER
    // ==========================================

    document.addEventListener("click", function (event) {

        const selectedOption = event.target.closest(".quiz-option");

        if (!selectedOption) {
            return;
        }

        const question = selectedOption.closest(".quiz-question");

        if (!question || !assessment.contains(question)) {
            return;
        }

        // The existing quiz script disables the choices
        // and highlights the selected answer first.

        if (!selectedOption.disabled) {
            return;
        }

        const isCorrect =
            selectedOption.classList.contains("is-correct-option");

        const isIncorrect =
            selectedOption.classList.contains("is-incorrect-option");

        if (!isCorrect && !isIncorrect) {
            return;
        }

        // Record one result for this question.
        recordedAnswers.set(question.id, isCorrect);

        updateDashboard();

    });


    // ==========================================
    // REMOVE A RESULT WHEN A QUESTION IS RETRIED
    // ==========================================

    // Capture the retry click before the existing retry
    // script clears the feedback area and removes its button.

    document.addEventListener("click", function (event) {

        const retryButton = event.target.closest(
            ".quiz-retry-button"
        );

        if (!retryButton) {
            return;
        }

        const question = retryButton.closest(".quiz-question");

        if (!question || !assessment.contains(question)) {
            return;
        }

        recordedAnswers.delete(question.id);

        updateDashboard();

    }, true);


    // ==========================================
    // RESTART THE COMPLETE ASSESSMENT
    // ==========================================

    if (restartButton) {

        restartButton.addEventListener("click", function () {

            questions.forEach(function (question) {

                const options = question.querySelectorAll(
                    ".quiz-option"
                );

                const feedback = question.querySelector(
                    '[id$="-feedback"]'
                );

                options.forEach(function (option) {

                    option.disabled = false;

                    option.classList.remove(
                        "is-correct-option",
                        "is-incorrect-option"
                    );

                });

                if (feedback) {

                    feedback.textContent = "";

                    feedback.classList.remove(
                        "quiz-feedback",
                        "is-correct",
                        "is-incorrect"
                    );

                }

            });

            recordedAnswers.clear();

            updateDashboard();

            // Return the learner to the first question.
            if (questions.length > 0) {

                const firstOption = questions[0].querySelector(
                    ".quiz-option"
                );

                if (firstOption) {
                    firstOption.focus();
                }

            }

        });

    }


    // Initialize the dashboard.
    updateDashboard();

})();
