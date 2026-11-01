
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

// ==========================================
// QUESTION 2: WEBSITE AVAILABILITY
// ==========================================

// Find the Question 2 container.
const question2 = document.getElementById("question-2");

// Find all four answer buttons.
const question2Options = question2.querySelectorAll(".quiz-option");

// Find the feedback area.
const question2Feedback = document.getElementById("question-2-feedback");

// The third answer (C) is correct.
const correctAnswerIndex2 = 2;

// Check the student's selected answer.
question2Options.forEach((button, index) => {

    button.addEventListener("click", function () {

        // Prevent another answer from being selected.
        question2Options.forEach(option => {
            option.disabled = true;
        });

        // Check the selected answer.
        if (index === correctAnswerIndex2) {

            question2Feedback.textContent =
                "Correct! A successful Ping only confirms that the destination responds to ICMP messages. It does not guarantee that the website or its application is working correctly.";

        } else {

            question2Feedback.textContent =
                "Not quite. The correct answer is C. Ping tests whether a destination responds to ICMP messages. A website can still experience application or server problems even when Ping succeeds.";

        }

    });

});


// ==========================================
// QUESTION 3: PING TIMEOUT VS DNS FAILURE
// ==========================================

// Find the Question 3 container.
const question3 = document.getElementById("question-3");

// Find all four answer buttons.
const question3Options = question3.querySelectorAll(".quiz-option");

// Find the feedback area.
const question3Feedback = document.getElementById("question-3-feedback");

// The third answer (C) is correct.
const correctAnswerIndex3 = 2;

// Check the student's selected answer.
question3Options.forEach((button, index) => {

    button.addEventListener("click", function () {

        // Prevent another answer from being selected.
        question3Options.forEach(option => {
            option.disabled = true;
        });

        // Check the selected answer.
        if (index === correctAnswerIndex3) {

            question3Feedback.textContent =
                "Correct! Request timed out means a Ping reply did not arrive within the allowed time. Could not find host means the computer could not resolve the hostname to an IP address.";

        } else {

            question3Feedback.textContent =
                "Not quite. The correct answer is C. A timeout concerns a missing Ping reply. Could not find host concerns hostname resolution, usually involving DNS.";

        }

    });

});





