/* =========================================
   SECTION 2 — INTERACTIVE FRIEND ANALOGY
   ========================================= */

(function () {
    const container = document.getElementById("friend-analogy");

    if (!container) {
        return;
    }

    const message = document.getElementById("friend-message");
    const reply = document.getElementById("friend-reply");
    const dot = document.getElementById("friend-message-dot");

    const stepNumber = document.getElementById("friend-step-number");
    const stepTitle = document.getElementById("friend-step-title");
    const stepDescription = document.getElementById("friend-step-description");
    const status = document.getElementById("friend-analogy-status");

    const previousButton = document.getElementById("friend-previous");
    const playButton = document.getElementById("friend-play");
    const nextButton = document.getElementById("friend-next");
    const resetButton = document.getElementById("friend-reset");

    const homes = container.querySelectorAll(".friend-home");

    const stages = [
        {
            title: "You send a message",
            description:
                "You call out to your friend: Hello! Can you hear me?",
            status: "The message is starting its journey."
        },
        {
            title: "Your friend receives it",
            description:
                "Your friend receives your message and can hear you.",
            status: "The message has reached your friend."
        },
        {
            title: "Your friend sends a reply",
            description:
                "Your friend calls back: Yes! I can hear you!",
            status: "Your friend is sending a reply."
        },
        {
            title: "You receive the reply",
            description:
                "The reply reaches you. You now know your message received a response.",
            status: "The communication test is complete."
        }
    ];

    let currentStage = 0;
    let playbackTimer = null;

    function stopPlayback() {
        if (playbackTimer !== null) {
            clearInterval(playbackTimer);
            playbackTimer = null;
        }

        playButton.textContent = "Play";
    }

    function showStage(index) {
        currentStage = Math.max(
            0,
            Math.min(index, stages.length - 1)
        );

        const stage = stages[currentStage];

        stepNumber.textContent =
            "Step " + (currentStage + 1) + " of " + stages.length;

        stepTitle.textContent = stage.title;
        stepDescription.textContent = stage.description;
        status.textContent = stage.status;

        // Highlight the message or reply.
        message.classList.toggle("is-active", currentStage <= 1);
        message.classList.toggle("is-inactive", currentStage >= 2);

        reply.classList.toggle("is-active", currentStage >= 2);
        reply.classList.toggle("is-inactive", currentStage <= 1);

        // Highlight the house involved in this stage.
        homes[0].classList.toggle(
            "is-active",
            currentStage === 0 || currentStage === 3
        );

        homes[1].classList.toggle(
            "is-active",
            currentStage === 1 || currentStage === 2
        );

        // Move the message dot along the route.
        const positions = [0, 100, 100, 0];

        dot.style.left = positions[currentStage] + "%";

        // Use blue for the request and green for the reply.
        const isReply = currentStage >= 2;

        dot.style.backgroundColor = isReply
            ? "#16A34A"
            : "#2563EB";

        dot.style.boxShadow = isReply
            ? "0 0 0 2px #16A34A"
            : "0 0 0 2px #2563EB";

        previousButton.disabled = currentStage === 0;
        nextButton.disabled = currentStage === stages.length - 1;
    }

    function nextStage() {
        stopPlayback();

        if (currentStage < stages.length - 1) {
            showStage(currentStage + 1);
        }
    }

    function previousStage() {
        stopPlayback();

        if (currentStage > 0) {
            showStage(currentStage - 1);
        }
    }

    function resetAnimation() {
        stopPlayback();
        showStage(0);
    }

    function startPlayback() {
        if (playbackTimer !== null) {
            stopPlayback();
            return;
        }

        if (currentStage === stages.length - 1) {
            showStage(0);
        }

        playButton.textContent = "Pause";

        playbackTimer = setInterval(function () {
            if (currentStage < stages.length - 1) {
                showStage(currentStage + 1);
            }

            if (currentStage === stages.length - 1) {
                stopPlayback();
            }
        }, 2200);
    }

    previousButton.addEventListener("click", previousStage);
    nextButton.addEventListener("click", nextStage);
    playButton.addEventListener("click", startPlayback);
    resetButton.addEventListener("click", resetAnimation);

    // Display the first stage when the lesson loads.
    showStage(0);

})();
