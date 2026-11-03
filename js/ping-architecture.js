
/* =========================================
   SECTION 6.3 — INTERACTIVE PING ARCHITECTURE
   ========================================= */

(function () {
    "use strict";

    // Find the architecture diagram on the Ping page.
    const architecture = document.getElementById("ping-architecture");

    // Stop safely if the diagram is not on this page.
    if (!architecture) return;

    // Find all six architecture stages.
    const stages = architecture.querySelectorAll(".architecture-stage");

    // Find the explanation elements.
    const stepCount = document.getElementById("architecture-step-count");
    const stepTitle = document.getElementById("architecture-step-title");
    const stepDescription = document.getElementById("architecture-step-description");
    const status = document.getElementById("architecture-status");

    // Find the navigation buttons.
    const previousButton = document.getElementById("architecture-previous");
    const playButton = document.getElementById("architecture-play");
    const nextButton = document.getElementById("architecture-next");
    const resetButton = document.getElementById("architecture-reset");

    // Detailed explanations for the six stages.
    const explanations = [
        {
            title: "Source Computer",
            description: "The source computer starts the Ping command and creates an ICMP Echo Request."
        },
        {
            title: "IP Layer",
            description: "The IP layer places the ICMP message inside an IP packet and prepares it for delivery."
        },
        {
            title: "Network and Routers",
            description: "The packet travels across the network. Routers forward it when routing is required."
        },
        {
            title: "Destination Computer",
            description: "The destination receives the request. If it is permitted to respond, it creates an ICMP Echo Reply."
        },
        {
            title: "Reply Returns",
            description: "The Echo Reply travels back towards the source. Its return path may differ from the outgoing path."
        },
        {
            title: "Source Calculates RTT",
            description: "The source measures the elapsed time for the request and reply journey. This is the round-trip time (RTT)."
        }
    ];

    // Track the currently selected stage.
    let currentStage = 0;

    // Track automatic playback.
    let playTimer = null;

    // Display the selected stage.
    function showStage(index) {
        currentStage = Math.max(0, Math.min(index, stages.length - 1));

        stages.forEach(function (stage, stageIndex) {
            stage.classList.toggle("active", stageIndex === currentStage);
        });

        stepCount.textContent = "Step " + (currentStage + 1) + " of " + stages.length;
        stepTitle.textContent = explanations[currentStage].title;
        stepDescription.textContent = explanations[currentStage].description;
       
        // Move the packet marker along the network route.
        const routePacket = architecture.querySelector(
            "#architecture-route-packet"
        );

        const routeDirection = architecture.querySelector(
            "#architecture-route-direction"
        );

        // Packet positions for the six learning stages.
        const routePositions = [10, 10, 50, 90, 50, 10];

        // Explanation displayed above the packet route.
        const routeMessages = [
            "Source is preparing the Echo Request.",
            "ICMP Echo Request is placed inside an IP packet.",
            "Echo Request is travelling through the network.",
            "Destination has received the Echo Request.",
            "Echo Reply is travelling back towards the source.",
            "Echo Reply has returned. The source calculates RTT."
        ];

        if (routePacket) {
            routePacket.style.left =
                routePositions[currentStage] + "%";
        }

        if (routeDirection) {
            routeDirection.textContent =
                routeMessages[currentStage];
        }


        previousButton.disabled = currentStage === 0;
        nextButton.disabled = currentStage === stages.length - 1;

        status.textContent = "Now viewing Step " + (currentStage + 1) + ": " + explanations[currentStage].title + ".";
    }

    // Stop automatic playback.
    function stopPlayback() {
        if (playTimer !== null) {
            window.clearInterval(playTimer);
            playTimer = null;
        }

        playButton.textContent = "▶ Play";
    }

    // Move to the previous stage.
    previousButton.addEventListener("click", function () {
        stopPlayback();
        showStage(currentStage - 1);
    });

    // Move to the next stage.
    nextButton.addEventListener("click", function () {
        stopPlayback();
        showStage(currentStage + 1);
    });

    // Start or pause automatic playback.
    playButton.addEventListener("click", function () {
        if (playTimer !== null) {
            stopPlayback();
            status.textContent = "Playback paused.";
            return;
        }

        if (currentStage === stages.length - 1) {
            showStage(0);
        }

        playButton.textContent = "Ⅱ Pause";
        status.textContent = "Playing the Ping communication process.";

        playTimer = window.setInterval(function () {
            if (currentStage < stages.length - 1) {
                showStage(currentStage + 1);
            } else {
                stopPlayback();
                status.textContent = "The Ping communication process is complete.";
            }
        }, 2500);
    });

    // Return to the first stage.
    resetButton.addEventListener("click", function () {
        stopPlayback();
        showStage(0);
        status.textContent = "The architecture diagram has been reset.";
    });

    // Set up the initial display.
    showStage(0);

})();
