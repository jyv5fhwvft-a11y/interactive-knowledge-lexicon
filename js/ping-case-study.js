// ==========================================
// INTERACTIVE KNOWLEDGE LEXICON
// SECTION 10 — PING CASE STUDY
// ==========================================

(function () {
    function initializeCaseStudy() {
        const container = document.getElementById("ping-case-study");

        if (!container) {
            return;
        }

        const buttons = container.querySelectorAll(".ping-case-button");
        const title = document.getElementById("ping-case-title");
        const description = document.getElementById("ping-case-description");
        const terminal = document.getElementById("ping-case-output");
        const meaning = document.getElementById("ping-case-meaning");
        const nextStep = document.getElementById("ping-case-next");
        const status = document.getElementById("ping-case-status");

        if (
            !title ||
            !description ||
            !terminal ||
            !meaning ||
            !nextStep ||
            !status
        ) {
            return;
        }

        const cases = {
            success: {
                title: "Case 1 — Both Tests Succeed",
                description:
                    "Alex can reach both destinations using ICMP Echo Requests and Replies.",

                output:
`C:\\> ping 8.8.8.8

Reply from 8.8.8.8: bytes=32 time=25ms TTL=117
Reply from 8.8.8.8: bytes=32 time=27ms TTL=117

C:\\> ping google.com

Pinging google.com [142.250.72.14] with 32 bytes of data:

Reply from 142.250.72.14: bytes=32 time=30ms TTL=117
Reply from 142.250.72.14: bytes=32 time=28ms TTL=117`,

                meaning:
                    "Both IP-address and hostname-based Ping tests received replies. The hostname was also successfully resolved to an IP address. Basic ICMP communication worked with both destinations.",

                next:
                    "Alex should investigate the website separately. Check the browser, web address, HTTPS connection, and whether the website's web service is working. A successful Ping does not guarantee that the website itself is working."
            },

            dns: {
                title: "Case 2 — DNS Resolution Fails",
                description:
                    "Alex can reach an IP address, but the computer cannot resolve the website hostname.",

                output:
`C:\\> ping 8.8.8.8

Reply from 8.8.8.8: bytes=32 time=25ms TTL=117
Reply from 8.8.8.8: bytes=32 time=26ms TTL=117

C:\\> ping google.com

Ping request could not find host google.com.
Please check the name and try again.`,

                meaning:
                    "The IP-address test received replies, but the hostname could not be resolved. This points toward a possible DNS or name-resolution problem.",

                next:
                    "Alex should investigate DNS settings, the configured DNS server, and hostname resolution. The successful IP-address test shows that communication with that particular IP address worked, but it does not prove that every network service is working."
            },

            timeout: {
                title: "Case 3 — Both Tests Time Out",
                description:
                    "Alex receives no ICMP Echo Replies from either destination within the waiting time.",

                output:
`C:\\> ping 8.8.8.8

Request timed out.
Request timed out.

C:\\> ping google.com

Pinging google.com [142.250.72.14] with 32 bytes of data:

Request timed out.
Request timed out.`,

                meaning:
                    "The hostname resolved to an IP address, but neither test received an Echo Reply. The requests timed out. This does not prove that either destination is offline.",

                next:
                    "Alex should investigate the local network connection, default gateway, routing path, and possible firewall or ICMP filtering. Other tests are needed to identify the actual cause."
            }
        };

        function showCase(caseName) {
            const selectedCase = cases[caseName];

            if (!selectedCase) {
                return;
            }

            title.textContent = selectedCase.title;
            description.textContent = selectedCase.description;
            terminal.textContent = selectedCase.output;
            meaning.textContent = selectedCase.meaning;
            nextStep.textContent = selectedCase.next;

            buttons.forEach(function (button) {
                const isActive = button.dataset.case === caseName;

                button.classList.toggle("active", isActive);
                button.setAttribute("aria-pressed", String(isActive));
            });

            status.textContent =
                "Investigation selected: " + selectedCase.title;
        }

        buttons.forEach(function (button) {
            button.addEventListener("click", function () {
                showCase(button.dataset.case);
            });
        });

        // Show the first case when the learner opens the investigation.
        showCase("success");
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializeCaseStudy);
    } else {
        initializeCaseStudy();
    }
})();
