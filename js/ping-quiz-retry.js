
// ==========================================
// PING QUIZ: TRY AGAIN FUNCTIONALITY
// ==========================================

// Listen for clicks on quiz answer buttons.
document.addEventListener("click", function (event) {

    // Identify the selected answer button.
    const selectedOption = event.target.closest(".quiz-option");

    if (!selectedOption) {
        return;
    }

    // Find the question containing the selected answer.
    const question = selectedOption.closest(".quiz-question");

    if (!question) {
        return;
    }

    // Find all answer buttons in this question.
    const options = question.querySelectorAll(".quiz-option");

    // Find the question's feedback area.
    const feedback = question.querySelector('[id$="-feedback"]');

    // Continue only after an answer has been checked.
    const allDisabled = Array.from(options).every(option => option.disabled);

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

    // Add the button below the feedback.
    feedback.appendChild(retryButton);

    // Reset this question when the student taps Try Again.
    retryButton.addEventListener("click", function () {

        // Enable all four answer choices again.
        options.forEach(option => {
            option.disabled = false;
        });

        // Clear the previous feedback and retry button.
        feedback.textContent = "";

        // Return focus to the first answer.
        options[0].focus();

    });

});
