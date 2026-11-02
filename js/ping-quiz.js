// ==========================================
// INTERACTIVE KNOWLEDGE LEXICON
// PING KNOWLEDGE ASSESSMENT
// QUESTIONS 1–10
// ==========================================

const pingQuizQuestions = [
    {
        id: 1,
        correctIndex: 1,
        correctFeedback: "Correct! Ping tests whether a destination responds over a network. It uses ICMP Echo Request and Echo Reply messages to perform this test.",
        incorrectFeedback: "Not quite. The correct answer is B. Ping tests whether a destination responds over a network. It does not directly measure download speed, translate hostnames, or identify every router along a path."
    },
    {
        id: 2,
        correctIndex: 2,
        correctFeedback: "Correct! A successful Ping only confirms that the destination responds to ICMP messages. It does not guarantee that the website or its application is working correctly.",
        incorrectFeedback: "Not quite. The correct answer is C. Ping tests whether a destination responds to ICMP messages. A website can still experience application or server problems even when Ping succeeds."
    },
    {
        id: 3,
        correctIndex: 2,
        correctFeedback: "Correct! Request timed out means a Ping reply did not arrive within the allowed time. Could not find host means the computer could not resolve the hostname to an IP address.",
        incorrectFeedback: "Not quite. The correct answer is C. A timeout concerns a missing Ping reply. Could not find host concerns hostname resolution, usually involving DNS."
    },
    {
        id: 4,
        correctIndex: 1,
        correctFeedback: "Correct! DNS translates a hostname, such as google.com, into an IP address that computers use to communicate across an IP network.",
        incorrectFeedback: "Not quite. The correct answer is B. DNS helps translate hostnames into IP addresses. It does not measure latency, identify network routes, or measure network speed."
    },
    {
        id: 5,
        correctIndex: 2,
        correctFeedback: "Correct! Latency describes response delay, while bandwidth describes how much data a connection can carry over time. Ping measures round-trip time, not bandwidth.",
        incorrectFeedback: "Not quite. The correct answer is C. Latency describes delay, while bandwidth describes data-carrying capacity over time. Ping helps measure round-trip time, not download or upload capacity."
    },
    {
        id: 6,
        correctIndex: 3,
        correctFeedback: "Correct! Routers forward IP packets between networks, helping a Ping request travel toward a destination outside the local network.",
        incorrectFeedback: "Not quite. The correct answer is D. Routers forward IP packets toward their destinations. DNS translates hostnames, and Ping measures response time."
    },
    {
        id: 7,
        correctIndex: 2,
        correctFeedback: "Correct! A successful Ping means the destination responded with an ICMP Echo Reply. It does not guarantee that every application or website on that destination is working.",
        incorrectFeedback: "Not quite. The correct answer is C. A successful Ping confirms that the destination responded to the ICMP Echo Request. It does not prove that all applications work or that the network has unlimited bandwidth."
    },
    {
        id: 8,
        correctIndex: 2,
        correctFeedback: "Correct! Packet loss means that some packets do not reach their destination or their replies do not return. Ping can help identify possible packet loss by comparing requests sent with replies received.",
        incorrectFeedback: "Not quite. The correct answer is C. Ping can reveal possible packet loss when some requests receive no replies. However, firewalls or ICMP filtering can also cause missing replies."
    },
    {
        id: 9,
        correctIndex: 1,
        correctFeedback: "Correct! The successful Ping to 8.8.8.8 shows that an external IP destination responded. The 'Could not find host' message for google.com points to a hostname resolution problem, usually involving DNS.",
        incorrectFeedback: "Not quite. The correct answer is B. Since 8.8.8.8 responded, the computer can reach that external IP destination. The hostname error points toward a DNS resolution problem."
    },
    {
        id: 10,
        correctIndex: 3,
        correctFeedback: "Correct! Since the local router responds, the computer can communicate with its local gateway. The external timeout means we should investigate routing beyond the gateway, internet connectivity, and possible ICMP filtering.",
        incorrectFeedback: "Not quite. The correct answer is D. A successful Ping to the local router confirms local gateway communication, but an external timeout requires investigating routing, internet connectivity, or ICMP filtering. A timeout alone does not prove the destination is offline."
    }
];

// ==========================================
// SET UP EACH QUESTION
// ==========================================

pingQuizQuestions.forEach(function (quizItem) {

    const question = document.getElementById(
        "question-" + quizItem.id
    );

    if (!question) {
        return;
    }

    const options = question.querySelectorAll(".quiz-option");

    const feedback = document.getElementById(
        "question-" + quizItem.id + "-feedback"
    );

    if (options.length !== 4 || !feedback) {
        return;
    }

    options.forEach(function (button, index) {

        button.addEventListener("click", function () {

            // Do not allow another selection after answering.
            if (Array.from(options).some(option => option.disabled)) {
                return;
            }

            // Disable all four choices.
            options.forEach(function (option) {
                option.disabled = true;
            });

            // Identify whether the selected answer is correct.
            const isCorrect = index === quizItem.correctIndex;

            // Highlight the selected answer.
            button.classList.add(
                isCorrect ? "is-correct-option" : "is-incorrect-option"
            );

            // Display the appropriate feedback.
            feedback.textContent = isCorrect
                ? quizItem.correctFeedback
                : quizItem.incorrectFeedback;

            // Apply the feedback appearance.
            feedback.classList.add("quiz-feedback");

            feedback.classList.add(
                isCorrect ? "is-correct" : "is-incorrect"
            );

        });

    });

});
