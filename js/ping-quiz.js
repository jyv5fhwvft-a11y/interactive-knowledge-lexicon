
// ==========================================
// PING KNOWLEDGE ASSESSMENT
// QUESTION 1: PRIMARY PURPOSE OF PING
// ==========================================

// Find the Question 1 container.
const question1 = document.getElementById("question-1");

// Find all four answer buttons.
const question1Options = question1.querySelectorAll(".quiz-option");

// Find the feedback area.
const question1Feedback = document.getElementById("question-1-feedback");

// The second answer is the correct answer.
const correctAnswerIndex = 1;

// Check the student's selected answer.
question1Options.forEach((button, index) => {

    button.addEventListener("click", function () {

        // Prevent another answer from being selected.
        question1Options.forEach(option => {
            option.disabled = true;
        });

        // Check whether the selected answer is correct.
        if (index === correctAnswerIndex) {

            question1Feedback.textContent =
                "Correct! Ping tests whether a destination responds over a network. It uses ICMP Echo Request and Echo Reply messages to perform this test.";

        } else {

            question1Feedback.textContent =
                "Not quite. The correct answer is B. Ping tests whether a destination responds over a network. It does not directly measure download speed, translate hostnames, or identify every router along a path.";

        }

    });

});
