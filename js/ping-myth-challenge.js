// ==========================================
// INTERACTIVE KNOWLEDGE LEXICON
// SECTION 11 — MYTH VS FACT CHALLENGE
// ==========================================

(function () {
    function initializeMythChallenge() {
        const container = document.getElementById("ping-myth-challenge");

        if (!container) {
            return;
        }

        const buttons = container.querySelectorAll(".ping-myth-button");

        const number = document.getElementById("ping-myth-number");
        const title = document.getElementById("ping-myth-title");
        const statement = document.getElementById("ping-myth-statement");
        const verdict = document.getElementById("ping-myth-verdict");
        const explanation = document.getElementById("ping-myth-explanation");
        const takeaway = document.getElementById("ping-myth-takeaway");
        const status = document.getElementById("ping-myth-status");

        if (
            !number ||
            !title ||
            !statement ||
            !verdict ||
            !explanation ||
            !takeaway ||
            !status
        ) {
            return;
        }

        const challenges = {
            website: {
                title: "A Successful Ping Means the Website Works",
                statement:
                    "If a server responds to Ping, its website must be working correctly.",
                verdict: "MYTH — This statement is incorrect.",
                explanation:
                    "A successful Ping confirms that an ICMP Echo Reply was received. It does not prove that the website's web application or web service is working.",
                takeaway:
                    "Ping tests ICMP communication. A website needs its separate web services to work too."
            },

            timeout: {
                title: "A Ping Timeout Means the Device Is Offline",
                statement:
                    "If Ping displays Request timed out, the destination device must be switched off.",
                verdict: "MYTH — This statement is incorrect.",
                explanation:
                    "A timeout means that an Echo Reply did not arrive within the waiting time. The device might still be online but blocking ICMP traffic, or a firewall or routing problem might be involved.",
                takeaway:
                    "A timeout means no timely reply was received. It does not prove that the device is offline."
            },

            speed: {
                title: "Ping Measures Internet Speed",
                statement:
                    "A Ping result of 20 milliseconds means the internet connection has a fast download speed.",
                verdict: "MYTH — This statement is incorrect.",
                explanation:
                    "Ping measures the round-trip time of test messages. Download speed and upload speed measure how quickly data can be transferred. They are different measurements.",
                takeaway:
                    "RTT measures response time. Download and upload tests measure data-transfer speed."
            },

            traceroute: {
                title: "Ping and Traceroute Do the Same Thing",
                statement:
                    "Ping and Traceroute are interchangeable commands that provide identical network information.",
                verdict: "MYTH — This statement is incorrect.",
                explanation:
                    "Ping tests whether a destination responds to ICMP Echo messages. Traceroute investigates the network path toward a destination and can reveal intermediate network hops.",
                takeaway:
                    "Ping tests destination responses. Traceroute investigates the route toward the destination."
            },

            firewall: {
                title: "Every Network Must Respond to Ping",
                statement:
                    "Every computer and network must respond to ICMP Echo Requests.",
                verdict: "MYTH — This statement is incorrect.",
                explanation:
                    "Firewalls, devices, and network administrators can block ICMP Echo Requests or Replies. A device may still provide other network services even when it does not respond to Ping.",
                takeaway:
                    "Not every reachable device must respond to Ping. ICMP traffic can be filtered."
            },

            hostname: {
                title: "A Hostname and an IP Address Are the Same Thing",
                statement:
                    "Entering google.com and entering an IP address are exactly the same operation.",
                verdict: "MYTH — This statement is incorrect.",
                explanation:
                    "A hostname is a human-readable name. An IP address identifies a network destination. DNS helps resolve a hostname into an IP address before Ping can attempt communication with that destination.",
                takeaway:
                    "A hostname is a name; an IP address identifies a network destination. DNS connects the two."
            }
        };

        function showChallenge(challengeName) {
            const challenge = challenges[challengeName];

            if (!challenge) {
                return;
            }

            const selectedIndex = Object.keys(challenges).indexOf(challengeName);

            number.textContent =
                "Challenge " + (selectedIndex + 1) + " of 6";

            title.textContent = challenge.title;
            statement.textContent = challenge.statement;
            verdict.textContent = challenge.verdict;
            explanation.textContent = challenge.explanation;
            takeaway.textContent = challenge.takeaway;

            verdict.classList.remove("myth-correct", "fact-correct");
            verdict.classList.add("myth-correct");

            buttons.forEach(function (button) {
                const isActive = button.dataset.myth === challengeName;

                button.classList.toggle("active", isActive);
                button.setAttribute("aria-pressed", String(isActive));
            });

            status.textContent =
                "Showing challenge " + (selectedIndex + 1) + " of 6.";
        }

        buttons.forEach(function (button) {
            button.setAttribute("aria-pressed", "false");

            button.addEventListener("click", function () {
                showChallenge(button.dataset.myth);
            });
        });

        // Display the first challenge when the activity loads.
        showChallenge("website");
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializeMythChallenge);
    } else {
        initializeMythChallenge();
    }
})();
