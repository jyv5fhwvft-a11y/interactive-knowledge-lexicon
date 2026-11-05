/* ==========================================
   SECTION 15 — QUICK REVISION INTERACTIONS
   ========================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* --------------------------------------
       1. FIVE-STEP PING GUIDE
    -------------------------------------- */

    const stepper = document.getElementById("qr-stepper");

    if (stepper) {

        const steps = [
            {
                title: "Identify the destination",
                description: "The user enters the IP address or hostname of the device they want to test.",
                example: "Example: ping google.com"
            },
            {
                title: "Resolve the hostname",
                description: "If a hostname is entered, the computer may use DNS, its hosts file or cached information to find an IP address.",
                example: "Example: google.com → destination IP address"
            },
            {
                title: "Send an ICMP Echo Request",
                description: "The source computer sends an ICMP Echo Request toward the destination.",
                example: "The request travels through the network."
            },
            {
                title: "Receive an ICMP Echo Reply",
                description: "If the destination responds to the request, it sends an ICMP Echo Reply back.",
                example: "A reply indicates that the destination responded to this Ping exchange."
            },
            {
                title: "Calculate the round-trip time",
                description: "Ping measures how long the request and reply take to complete their round trip.",
                example: "Example: Round-trip time = 25 ms"
            }
        ];

        const tabs = stepper.querySelectorAll(".qr-step-tab");
        const count = document.getElementById("qr-step-count");
        const title = document.getElementById("qr-step-title");
        const description = document.getElementById("qr-step-description");
        const example = document.getElementById("qr-step-example");
        const previous = document.getElementById("qr-step-previous");
        const next = document.getElementById("qr-step-next");

        let currentStep = 0;

        function showStep(index) {

            if (index < 0 || index >= steps.length) {
                return;
            }

            currentStep = index;

            const step = steps[currentStep];

            count.textContent =
                "STEP " + (currentStep + 1) + " OF " + steps.length;

            title.textContent = step.title;
            description.textContent = step.description;
            example.textContent = step.example;

            tabs.forEach(function (tab, tabIndex) {

                const isActive = tabIndex === currentStep;

                tab.classList.toggle("is-active", isActive);

                tab.setAttribute(
                    "aria-pressed",
                    isActive ? "true" : "false"
                );

            });

            previous.disabled = currentStep === 0;
            next.disabled = currentStep === steps.length - 1;

            next.textContent =
                currentStep === steps.length - 1
                    ? "Last Step"
                    : "Next Step →";

        }

        tabs.forEach(function (tab) {

            tab.addEventListener("click", function () {

                const index = Number(tab.dataset.step);

                showStep(index);

            });

        });

        previous.addEventListener("click", function () {
            showStep(currentStep - 1);
        });

        next.addEventListener("click", function () {
            showStep(currentStep + 1);
        });

        showStep(0);

    }


    /* --------------------------------------
       2. COPY PING COMMANDS
    -------------------------------------- */

    const copyButtons = document.querySelectorAll(
        "#quick-revision .qr-copy-button"
    );

    copyButtons.forEach(function (button) {

        button.addEventListener("click", async function () {

            const targetId = button.dataset.copyTarget;
            const commandElement = document.getElementById(targetId);

            if (!commandElement) {
                return;
            }

            const command = commandElement.textContent.trim();
            const originalText = button.textContent;

            try {

                if (
                    navigator.clipboard &&
                    window.isSecureContext
                ) {

                    await navigator.clipboard.writeText(command);

                } else {

                    const temporaryInput =
                        document.createElement("textarea");

                    temporaryInput.value = command;
                    temporaryInput.setAttribute("readonly", "");

                    temporaryInput.style.position = "fixed";
                    temporaryInput.style.opacity = "0";

                    document.body.appendChild(temporaryInput);

                    temporaryInput.select();
                    temporaryInput.setSelectionRange(
                        0,
                        temporaryInput.value.length
                    );

                    const copied = document.execCommand("copy");

                    temporaryInput.remove();

                    if (!copied) {
                        throw new Error("Copy operation was unsuccessful.");
                    }

                }

                button.textContent = "Copied ✓";

            } catch (error) {

                button.textContent = "Copy unavailable";

                console.error("Could not copy command:", error);

            }

            window.setTimeout(function () {

                button.textContent = originalText;

            }, 1800);

        });

    });


    /* --------------------------------------
       3. REVISION CHECKLIST AND PROGRESS
    -------------------------------------- */

    const checklist = document.getElementById("qr-checklist");

    if (checklist) {

        const checkboxes = checklist.querySelectorAll(
            ".qr-check-item input[type='checkbox']"
        );

        const progressCount =
            document.getElementById("qr-progress-count");

        const progressBar =
            document.getElementById("qr-progress-bar");

        const progressFill =
            document.getElementById("qr-progress-fill");

        const completionMessage =
            document.getElementById("qr-checklist-complete");

        const totalItems = checkboxes.length;

        function updateProgress() {

            const completedItems =
                checklist.querySelectorAll(
                    ".qr-check-item input[type='checkbox']:checked"
                ).length;

            const percentage =
                totalItems === 0
                    ? 0
                    : (completedItems / totalItems) * 100;

            progressCount.textContent =
                completedItems + " of " + totalItems + " completed";

            progressFill.style.width = percentage + "%";

            progressBar.setAttribute(
                "aria-valuenow",
                completedItems
            );

            completionMessage.hidden =
                completedItems !== totalItems;

        }

        checkboxes.forEach(function (checkbox) {

            checkbox.addEventListener("change", updateProgress);

        });

        updateProgress();

    }

});
