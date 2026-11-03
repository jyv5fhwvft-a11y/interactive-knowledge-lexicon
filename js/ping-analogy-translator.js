/* =========================================
   SECTION 3 — ANALOGY-TO-NETWORK TRANSLATOR
   ========================================= */

(function () {
    const container = document.getElementById("analogy-translator");

    if (!container) {
        return;
    }

    const buttons = container.querySelectorAll(".analogy-map-button");

    const stepNumber = document.getElementById("analogy-map-step");
    const title = document.getElementById("analogy-map-title");
    const description = document.getElementById("analogy-map-description");
    const status = document.getElementById("analogy-map-status");

    const mappings = [
        {
            title: "ICMP Echo Request",
            description:
                "When you shout Hello, you are checking whether " +
                "your friend can hear you. In networking, the " +
                "sending computer transmits an ICMP Echo Request " +
                "to ask the destination device for a response.",
            status: "You selected the ICMP Echo Request."
        },
        {
            title: "Destination Receives the Request",
            description:
                "Your friend hears your message. Similarly, the " +
                "destination device receives the ICMP Echo Request. " +
                "However, receiving a request does not guarantee " +
                "that the device will send a reply.",
            status: "You selected destination request reception."
        },
        {
            title: "ICMP Echo Reply",
            description:
                "Your friend shouts back to you. In networking, " +
                "a responding destination sends an ICMP Echo Reply " +
                "towards the computer that sent the request.",
            status: "You selected the ICMP Echo Reply."
        },
        {
            title: "Waiting for the Response",
            description:
                "After sending the request, your computer waits " +
                "for a response. It also measures how long the " +
                "exchange takes. If no response arrives before " +
                "the timeout, Ping reports that no reply was received.",
            status: "You selected the waiting period."
        },
        {
            title: "The Reply Reaches the Source",
            description:
                "Your friend’s reply reaches your house. Likewise, " +
                "the ICMP Echo Reply returns to the original " +
                "sending computer. This confirms that a response " +
                "made the round trip.",
            status: "You selected the returning response."
        },
        {
            title: "Round-Trip Time (RTT)",
            description:
                "Think about how long you waited between shouting " +
                "and receiving your friend's reply. In Ping, " +
                "Round-Trip Time measures the elapsed time between " +
                "sending an Echo Request and receiving its matching " +
                "Echo Reply. It is commonly reported in milliseconds (ms).",
            status: "You selected Round-Trip Time (RTT)."
        }
    ];

    function selectMapping(index) {
        const mapping = mappings[index];

        if (!mapping) {
            return;
        }

        buttons.forEach(function (button, buttonIndex) {
            const isSelected = buttonIndex === index;

            button.classList.toggle("is-selected", isSelected);
            button.setAttribute("aria-pressed", String(isSelected));
        });

        stepNumber.textContent =
            "Connection " + (index + 1) + " of " + mappings.length;

        title.textContent = mapping.title;
        description.textContent = mapping.description;
        status.textContent = mapping.status;
    }

    buttons.forEach(function (button, index) {
        button.setAttribute("aria-pressed", "false");

        button.addEventListener("click", function () {
            selectMapping(index);
        });
    });

    status.textContent = "Ready to explore.";

})();
