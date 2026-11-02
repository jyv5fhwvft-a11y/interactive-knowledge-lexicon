// ==========================================
// PING QUIZ: TRY AGAIN FUNCTIONALITY
// ==========================================

document.addEventListener("click", function (event) {

    // Identify the selected answer button.
    const selectedOption = event.target.closest(".quiz-option");

    if (!selectedOption) {
        return;
    }

    // Find the question containing the answer.
    const question = selectedOption.closest(".quiz-question");

    if (!question) {
        return;
    }

    const options = question.querySelectorAll(".quiz-option");

    const feedback = question.querySelector('[id$="-feedback"]');

    // Continue only after an answer has been checked.
    const allDisabled = Array.from(options).every(function (option) {
        return option.disabled;
    });

    if (!feedback || !allDisabled) {
        return;
    }

    // Avoid creating duplicate retry buttons.
    if (question.querySelector(".quiz-retry-button")) {
        return;
    }

    // Create the Try Again button.
    const retryButton = document.createElement("button");

    retryButton.type = "button";
    retryButton.className = "quiz-retry-button";
    retryButton.textContent = "Try Again";

    feedback.appendChild(retryButton);

    // Reset the question when Try Again is clicked.
    retryButton.addEventListener("click", function () {

        // Enable all answer choices.
        options.forEach(function (option) {
            option.disabled = false;

            option.classList.remove(
                "is-correct-option",
                "is-incorrect-option"
            );
        });

        // Clear the previous feedback.
        feedback.textContent = "";

        feedback.classList.remove(
            "quiz-feedback",
            "is-correct",
            "is-incorrect"
        );

        // Return focus to the first answer.
        options[0].focus();

    });

});
