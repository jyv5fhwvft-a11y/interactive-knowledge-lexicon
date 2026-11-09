
/* =========================================================
   IKL — PROCESS WORKING MECHANISM ANIMATIONS
   File: js/process-working-mechanism.js

   Section 7: Five interactive teaching animations.

   Existing diagrams and educational content are preserved.
   ========================================================= */

(function () {
    "use strict";

    function initialiseProcessMechanismAnimations() {
        const section = document.querySelector("#working-mechanism");

        if (!section) return;

        if (section.dataset.mechanismAnimationsReady === "true") {
            return;
        }

        section.dataset.mechanismAnimationsReady = "true";

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

        const animationDefinitions = [
            {
                id: "lifecycle",
                title: "Explore the Process Lifecycle",
                description: "Follow a process through its possible states.",
                target: ".s7-lifecycle-track",
                items: [
                    {
                        selector: ".s7-state",
                        index: 0,
                        title: "New",
                        explanation: "The operating system is creating the process and preparing its required information."
                    },
                    {
                        selector: ".s7-state",
                        index: 1,
                        title: "Ready",
                        explanation: "The process is prepared to execute and waits for CPU time."
                    },
                    {
                        selector: ".s7-state",
                        index: 2,
                        title: "Running",
                        explanation: "The CPU is currently executing instructions belonging to this process."
                    },
                    {
                        selector: ".s7-state",
                        index: 3,
                        title: "Waiting",
                        explanation: "The process cannot continue until an event, such as an I/O operation, completes."
                    },
                    {
                        selector: ".s7-state",
                        index: 1,
                        title: "Ready again",
                        explanation: "After the event completes, the process can become ready for CPU time again."
                    },
                    {
                        selector: ".s7-state",
                        index: 2,
                        title: "Running again",
                        explanation: "The scheduler can select the ready process to execute again."
                    },
                    {
                        selector: ".s7-state",
                        index: 4,
                        title: "Terminated",
                        explanation: "The process has finished execution or has been ended by the operating system."
                    }
                ]
            },
            {
                id: "ready-queue",
                title: "Explore Ready Queue and CPU Scheduling",
                description: "See how a ready process is selected for execution.",
                target: ".s7-queue",
                items: [
                    {
                        selector: ".s7-queue-item",
                        index: 0,
                        title: "Processes enter the queue",
                        explanation: "Runnable processes wait in the ready queue for an opportunity to use the CPU."
                    },
                    {
                        selector: ".s7-queue-item",
                        index: 1,
                        title: "The scheduler selects",
                        explanation: "The CPU scheduler chooses a process according to the scheduling policy."
                    },
                    {
                        selector: ".s7-queue-output",
                        index: 0,
                        title: "A process is selected",
                        explanation: "The selected process becomes the candidate for CPU execution."
                    }
                ]
            },
            {
                id: "context-switch",
                title: "Explore a Context Switch",
                description: "Follow the change from Thread A to Thread B.",
                target: ".s7-switch-flow",
                items: [
                    {
                        selector: ".s7-switch-thread",
                        index: 0,
                        title: "Thread A is running",
                        explanation: "The CPU is executing Thread A."
                    },
                    {
                        selector: ".s7-switch-action",
                        index: 0,
                        title: "Save Thread A's context",
                        explanation: "The operating system preserves the execution information needed for Thread A to resume later."
                    },
                    {
                        selector: ".s7-switch-action",
                        index: 1,
                        title: "Restore Thread B's context",
                        explanation: "The saved execution information for Thread B is restored."
                    },
                    {
                        selector: ".s7-switch-thread",
                        index: 1,
                        title: "Thread B is running",
                        explanation: "The CPU can now continue executing Thread B."
                    }
                ]
            },
            {
                id: "waiting-ready",
                title: "Explore Waiting to Ready",
                description: "See what happens when a waiting event completes.",
                target: ".s7-resume-flow",
                items: [
                    {
                        selector: ".s7-resume-state",
                        index: 0,
                        title: "Waiting",
                        explanation: "The process is waiting for an event and is not currently eligible for CPU execution."
                    },
                    {
                        selector: ".s7-resume-event",
                        index: 0,
                        title: "The event completes",
                        explanation: "The required event, such as an I/O operation, finishes."
                    },
                    {
                        selector: ".s7-resume-state",
                        index: 1,
                        title: "Ready",
                        explanation: "The process becomes eligible to compete for CPU time."
                    },
                    {
                        selector: ".s7-resume-state",
                        index: 2,
                        title: "Running",
                        explanation: "When selected by the scheduler, the process can execute on the CPU."
                    }
                ]
            },
            {
                id: "termination",
                title: "Explore Process Termination",
                description: "Follow the main steps when a process ends.",
                target: ".s7-termination-grid",
                items: [
                    {
                        selector: ".s7-termination-grid > div",
                        index: 0,
                        title: "Execution ends",
                        explanation: "The process finishes its work or is stopped."
                    },
                    {
                        selector: ".s7-termination-grid > div",
                        index: 1,
                        title: "Status is recorded",
                        explanation: "The operating system records the process's termination information."
                    },
                    {
                        selector: ".s7-termination-grid > div",
                        index: 2,
                        title: "Resources are released",
                        explanation: "Resources associated with the process can be reclaimed when appropriate."
                    },
                    {
                        selector: ".s7-termination-grid > div",
                        index: 3,
                        title: "Cleanup is completed",
                        explanation: "The operating system completes the remaining process-management cleanup."
                    },
                    {
                        selector: ".s7-termination-result",
                        index: 0,
                        title: "Termination complete",
                        explanation: "The process is no longer executing. The operating system has completed the relevant cleanup."
                    }
                ]
            }
        ];

        function createElement(tag, className, text) {
            const element = document.createElement(tag);

            if (className) {
                element.className = className;
            }

            if (text !== undefined) {
                element.textContent = text;
            }

            return element;
        }

        function createAnimationPanel(definition) {
            const target = section.querySelector(definition.target);

            if (!target) return;

            const card = target.closest(".s7-visual-card");

            if (!card) return;

            if (card.dataset.animationPanelAdded === "true") {
                return;
            }

            card.dataset.animationPanelAdded = "true";

            const panel = createElement("div", "s7-animation-panel");
            panel.dataset.animationId = definition.id;

            const heading = createElement(
                "h4",
                "s7-animation-heading",
                definition.title
            );

            const introduction = createElement(
                "p",
                "s7-animation-intro",
                definition.description
            );

            const status = createElement(
                "p",
                "s7-animation-status",
                "Ready to explore. Press Play or Next to begin."
            );

            status.setAttribute("aria-live", "polite");
            status.setAttribute("aria-atomic", "true");

            const progressLabel = createElement(
                "p",
                "s7-animation-progress-label",
                "Step 0 of " + definition.items.length
            );

            const progress = createElement(
                "div",
                "s7-animation-progress"
            );

            progress.setAttribute("role", "progressbar");
            progress.setAttribute("aria-label", definition.title);
            progress.setAttribute("aria-valuemin", "0");
            progress.setAttribute(
                "aria-valuemax",
                String(definition.items.length)
            );
            progress.setAttribute("aria-valuenow", "0");

            const progressFill = createElement(
                "div",
                "s7-animation-progress-fill"
            );

            progress.appendChild(progressFill);

            const explanation = createElement(
                "p",
                "s7-animation-explanation",
                "Choose Play or Next to explore this mechanism."
            );

            const controls = createElement(
                "div",
                "s7-animation-controls"
            );

            function createButton(label, action, extraClass) {
                const button = createElement(
                    "button",
                    "s7-animation-button " + (extraClass || ""),
                    label
                );

                button.type = "button";
                button.addEventListener("click", action);

                return button;
            }

            const previousButton = createButton(
                "Previous",
                () => showStep(currentStep - 1),
                "s7-animation-secondary"
            );

            const playButton = createButton(
                "Play",
                play,
                "s7-animation-primary"
            );

            const pauseButton = createButton(
                "Pause",
                pause,
                "s7-animation-secondary"
            );

            const nextButton = createButton(
                "Next",
                () => showStep(currentStep + 1),
                "s7-animation-secondary"
            );

            const resetButton = createButton(
                "Reset",
                reset,
                "s7-animation-secondary"
            );

            controls.append(
                previousButton,
                playButton,
                pauseButton,
                nextButton,
                resetButton
            );

            panel.append(
                heading,
                introduction,
                progressLabel,
                progress,
                status,
                explanation,
                controls
            );

            card.insertAdjacentElement("afterend", panel);

            let currentStep = -1;
            let timer = null;

            function clearHighlights() {
                const selectors = [
                    ".s7-state",
                    ".s7-queue-item",
                    ".s7-queue-output",
                    ".s7-switch-thread",
                    ".s7-switch-action",
                    ".s7-resume-state",
                    ".s7-resume-event",
                    ".s7-termination-grid > div",
                    ".s7-termination-result"
                ];

                selectors.forEach((selector) => {
                    target.querySelectorAll(selector).forEach((element) => {
                        element.classList.remove(
                            "s7-animation-active",
                            "s7-animation-complete"
                        );
                    });
                });
            }

            function showStep(step, keepPlaying) {
                if (!keepPlaying) {
                    pause();
                }

                if (step < 0 || step >= definition.items.length) {
                    return;
                }

                clearHighlights();

                currentStep = step;

                for (let i = 0; i < currentStep; i++) {
                    const previousItem = definition.items[i];

                    const previousElements = target.querySelectorAll(
                        previousItem.selector
                    );

                    const previousElement =
                        previousElements[previousItem.index];

                    if (previousElement) {
                        previousElement.classList.add(
                            "s7-animation-complete"
                        );
                    }
                }

                const item = definition.items[currentStep];

                const elements = target.querySelectorAll(item.selector);

                const activeElement = elements[item.index];

                if (activeElement) {
                    activeElement.classList.add(
                        "s7-animation-active"
                    );
                }

                const percentage =
                    ((currentStep + 1) / definition.items.length) * 100;

                progressFill.style.width = percentage + "%";

                progress.setAttribute(
                    "aria-valuenow",
                    String(currentStep + 1)
                );

                progressLabel.textContent =
                    "Step " +
                    (currentStep + 1) +
                    " of " +
                    definition.items.length;

                status.textContent = item.title;

                explanation.textContent = item.explanation;

                previousButton.disabled = currentStep === 0;

                nextButton.disabled =
                    currentStep === definition.items.length - 1;

                if (currentStep === definition.items.length - 1) {
                    status.textContent += " — Final step";
                }
            }

            function play() {
                if (timer) return;

                if (currentStep >= definition.items.length - 1) {
                    currentStep = -1;
                }

                if (currentStep === -1) {
                    showStep(0, true);
                }

                playButton.disabled = true;
                pauseButton.disabled = false;

                const delay = reducedMotion.matches ? 4000 : 2400;

                timer = window.setInterval(() => {
                    if (currentStep >= definition.items.length - 1) {
                        pause();
                        return;
                    }

                    showStep(currentStep + 1, true);

                    if (currentStep >= definition.items.length - 1) {
                        pause();
                    }
                }, delay);
            }

            function pause() {
                if (timer) {
                    window.clearInterval(timer);
                    timer = null;
                }

                playButton.disabled = false;
                pauseButton.disabled = true;
            }

            function reset() {
                pause();
                clearHighlights();

                currentStep = -1;

                progressFill.style.width = "0%";

                progress.setAttribute("aria-valuenow", "0");

                progressLabel.textContent =
                    "Step 0 of " + definition.items.length;

                status.textContent =
                    "Ready to explore. Press Play or Next to begin.";

                explanation.textContent =
                    "Choose Play or Next to explore this mechanism.";

                previousButton.disabled = true;
                nextButton.disabled = false;
            }

            pauseButton.disabled = true;
            previousButton.disabled = true;

            resetButton.addEventListener("click", reset);
        }

        animationDefinitions.forEach(createAnimationPanel);
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initialiseProcessMechanismAnimations
        );
    } else {
        initialiseProcessMechanismAnimations();
    }
})();
