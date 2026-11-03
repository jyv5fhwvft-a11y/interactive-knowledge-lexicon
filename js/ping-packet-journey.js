/* ========================================= */
/* SECTION 7 — INTERACTIVE PING PACKET JOURNEY */
/* ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const explorer = document.getElementById("ping-journey-explorer");

    if (!explorer) return;

    const stepNumber = document.getElementById("journey-step-number");
    const progressFill = document.getElementById("journey-progress-fill");

    const source = document.getElementById("journey-source");
    const network = document.getElementById("journey-network");
    const destination = document.getElementById("journey-destination");
    const packet = document.getElementById("journey-packet");

    const label = document.getElementById("journey-stage-label");
    const title = document.getElementById("journey-stage-title");
    const description = document.getElementById("journey-stage-description");
    const details = document.getElementById("journey-stage-details");
    const status = document.getElementById("journey-status");

    const previousButton = document.getElementById("journey-previous");
    const playButton = document.getElementById("journey-play");
    const nextButton = document.getElementById("journey-next");
    const resetButton = document.getElementById("journey-reset");

    const stages = [

        {
            title: "User Starts Ping",
            description: "The user enters a Ping command to begin testing communication with another device.",
            details: [
                "Example command: ping 8.8.8.8",
                "The source computer begins the test.",
                "The command identifies the intended destination."
            ],
            active: "source",
            packetPosition: null,
            status: "The Ping test has started."
        },

        {
            title: "Destination Address Is Identified",
            description: "The computer determines the IP address to which the test message must be sent.",
            details: [
                "An IP address can be used directly.",
                "A hostname may require a DNS lookup.",
                "The destination address guides packet delivery."
            ],
            active: "source",
            packetPosition: null,
            status: "The destination address is identified."
        },

        {
            title: "ICMP Echo Request Is Created",
            description: "The operating system prepares an ICMP Echo Request message.",
            details: [
                "The request asks the destination to respond.",
                "It contains information used to identify the message.",
                "The destination may or may not respond."
            ],
            active: "source",
            packetPosition: null,
            status: "The Echo Request has been created."
        },

        {
            title: "IP Packet Is Prepared",
            description: "The IP layer carries the ICMP Echo Request inside an IP packet.",
            details: [
                "The packet includes a source IP address.",
                "The packet includes a destination IP address.",
                "The packet is passed to the network interface."
            ],
            active: "source",
            packetPosition: null,
            status: "The IP packet is ready for transmission."
        },

        {
            title: "Request Travels Through the Network",
            description: "The packet moves through network links toward its destination.",
            details: [
                "Ethernet or Wi-Fi may carry the packet.",
                "Routers forward packets when necessary.",
                "The actual route depends on routing decisions."
            ],
            active: "network",
            packetPosition: 100,
            status: "The request is travelling toward the destination."
        },

        {
            title: "Destination Processes the Request",
            description: "The destination processes the incoming packet and may accept the ICMP Echo Request.",
            details: [
                "The destination examines the incoming packet.",
                "Its network configuration determines whether it responds.",
                "An Echo Reply may be prepared if permitted."
            ],
            active: "destination",
            packetPosition: 100,
            status: "The destination has received the request."
        },

        {
            title: "Echo Reply Travels Back",
            description: "If the destination responds, an ICMP Echo Reply travels toward the original source.",
            details: [
                "The reply is carried inside an IP packet.",
                "Routers forward it when necessary.",
                "The return route may differ from the request route."
            ],
            active: "network",
            packetPosition: 0,
            reply: true,
            status: "The Echo Reply is travelling back toward the source."
        },

        {
            title: "Source Calculates RTT",
            description: "The source receives the corresponding Echo Reply and calculates the Round-Trip Time.",
            details: [
                "Example: request sent at 0 ms.",
                "Example: reply received at 25 ms.",
                "Measured RTT: 25 ms."
            ],
            active: "source",
            packetPosition: null,
            reply: true,
            status: "The source has received the reply and calculated RTT."
        },

        {
            title: "What If No Reply Arrives?",
            description: "If no corresponding Echo Reply arrives within the waiting time, Ping may report a timeout.",
            details: [
                "The destination may be unavailable.",
                "A firewall may block ICMP messages.",
                "A network path may have a problem.",
                "No reply does not automatically mean the computer is switched off."
            ],
            active: null,
            packetPosition: null,
            timeout: true,
            status: "This is an alternative outcome: the request may receive no reply."
        }

    ];

    let currentStage = 0;
    let playTimer = null;

    function stopPlayback() {
        if (playTimer !== null) {
            clearInterval(playTimer);
            playTimer = null;
        }

        playButton.textContent = "Play";
    }

    function showStage(index) {

        currentStage = Math.max(0, Math.min(index, stages.length - 1));

        const stage = stages[currentStage];

        stepNumber.textContent =
            "Stage " + (currentStage + 1) + " of " + stages.length;

        progressFill.style.width =
            ((currentStage + 1) / stages.length * 100) + "%";

        label.textContent =
            "STAGE " + (currentStage + 1);

        title.textContent = stage.title;
        description.textContent = stage.description;
        status.textContent = stage.status;

        const list = document.createElement("ul");

        stage.details.forEach(function (detail) {
            const item = document.createElement("li");
            item.textContent = detail;
            list.appendChild(item);
        });

        details.replaceChildren(list);

        [source, network, destination].forEach(function (node) {
            node.classList.remove("is-active", "is-reply-active");
        });

        if (stage.active === "source") {
            source.classList.add("is-active");
        }

        if (stage.active === "network") {
            network.classList.add("is-active");
        }

        if (stage.active === "destination") {
            destination.classList.add("is-active");
        }

        if (stage.reply) {
            source.classList.add("is-reply-active");
        }

        if (stage.timeout) {
            explorer.classList.add("journey-timeout");
        } else {
            explorer.classList.remove("journey-timeout");
        }

        if (stage.packetPosition === null) {
            packet.classList.remove("is-visible");
        } else {
            packet.classList.add("is-visible");
            packet.style.left = stage.packetPosition + "%";
        }

        packet.classList.toggle("is-reply", Boolean(stage.reply));

        previousButton.disabled = currentStage === 0;
        nextButton.disabled = currentStage === stages.length - 1;
    }

    previousButton.addEventListener("click", function () {
        stopPlayback();
        showStage(currentStage - 1);
    });

    nextButton.addEventListener("click", function () {
        stopPlayback();
        showStage(currentStage + 1);
    });

    playButton.addEventListener("click", function () {

        if (playTimer !== null) {
            stopPlayback();
            status.textContent = "Journey paused.";
            return;
        }

        if (currentStage === stages.length - 1) {
            showStage(0);
        }

        playButton.textContent = "Pause";
        status.textContent = "Playing the Ping journey.";

        playTimer = setInterval(function () {

            if (currentStage >= stages.length - 1) {
                stopPlayback();
                status.textContent = "Journey completed.";
                return;
            }

            showStage(currentStage + 1);

        }, 3500);

    });

    resetButton.addEventListener("click", function () {
        stopPlayback();
        showStage(0);
        status.textContent = "Journey reset. Ready to begin.";
    });

    showStage(0);

});

/* END SECTION 7 — INTERACTIVE PING PACKET JOURNEY */
