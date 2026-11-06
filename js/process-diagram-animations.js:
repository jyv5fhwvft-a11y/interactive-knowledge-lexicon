
/* =========================================================
   IKL — PROCESS DIAGRAM ANIMATIONS
   Concept 002: Process — A Program in Execution

   Adds guided controls to the existing Section 9 SVG diagrams.
   Does not modify Section 8 or replace either diagram.
   ========================================================= */

(function () {
    "use strict";

    const section = document.getElementById("process-diagrams");

    if (!section) {
        return;
    }

    const reducedMotionQuery = window.matchMedia
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;

    const prefersReducedMotion = Boolean(
        reducedMotionQuery && reducedMotionQuery.matches
    );

    const style = document.createElement("style");
    style.textContent = `
        .process-animation-panel {
            margin: 18px 0 4px;
            padding: 18px;
            background: #EFF6FF;
            border: 1px solid #BFDBFE;
            border-radius: 12px;
        }
        .process-animation-status {
            margin: 0 0 8px;
            color: #102A43;
            font-weight: 750;
        }
        .process-animation-explanation {
            min-height: 3.2em;
            margin: 0 0 14px;
            color: #243B53;
            line-height: 1.65;
        }
        .process-animation-progress {
            display: block;
            width: 100%;
            height: 9px;
            margin: 0 0 15px;
            accent-color: #2563EB;
        }
        .process-animation-controls {
            display: flex;
            flex-wrap: wrap;
            gap: 9px;
        }
        .process-animation-button {
            min-height: 44px;
            padding: 10px 15px;
            color: #102A43;
            background: #FFFFFF;
            border: 1px solid #CBD5E1;
            border-radius: 8px;
            font: inherit;
            font-size: 14px;
            font-weight: 700;
            cursor: pointer;
        }
        .process-animation-button.primary {
            color: #FFFFFF;
            background: #2563EB;
            border-color: #2563EB;
        }
        .process-animation-button:disabled {
            opacity: 0.45;
            cursor: not-allowed;
        }
        .process-animation-button:focus-visible {
            outline: 3px solid rgba(37, 99, 235, 0.35);
            outline-offset: 3px;
        }
        .process-lifecycle-svg .ikl-state-active {
            stroke: #0D9488 !important;
            stroke-width: 5 !important;
            filter: drop-shadow(0 0 5px rgba(13, 148, 136, 0.35));
        }
        .process-lifecycle-svg .ikl-transition-active {
            stroke-width: 6 !important;
            filter: drop-shadow(0 0 4px rgba(37, 99, 235, 0.35));
            animation: ikl-flow-pulse 900ms ease-in-out 2;
        }
        @keyframes ikl-flow-pulse {
            from { opacity: 0.55; }
            to { opacity: 1; }
        }
        .process-sequence-svg .sequence-message {
            transition: opacity 250ms ease, stroke-width 250ms ease,
                stroke-dashoffset 900ms ease;
        }
        .process-sequence-svg .sequence-label {
            transition: opacity 250ms ease, font-weight 250ms ease;
        }
        .process-sequence-svg .sequence-message.ikl-message-current {
            stroke: #0D9488 !important;
            stroke-width: 5 !important;
        }
        .process-sequence-svg .sequence-label.ikl-label-current {
            fill: #0D766E !important;
            font-weight: 800 !important;
        }
        @media (max-width: 600px) {
            .process-animation-panel {
                padding: 14px;
            }
            .process-animation-button {
                flex: 1 1 42%;
            }
        }
        @media (prefers-reduced-motion: reduce) {
            .process-lifecycle-svg .ikl-transition-active {
                animation: none !important;
            }
            .process-sequence-svg .sequence-message,
            .process-sequence-svg .sequence-label {
                transition: none !important;
            }
        }
    `;
    document.head.appendChild(style);

    function makeElement(tagName, className, text) {
        const element = document.createElement(tagName);

        if (className) {
            element.className = className;
        }

        if (typeof text === "string") {
            element.textContent = text;
        }

        return element;
    }

    function createAnimationPanel(config) {
        const panel = makeElement("div", "process-animation-panel");
        const status = makeElement("p", "process-animation-status");
        const explanation = makeElement(
            "p",
            "process-animation-explanation"
        );
        const progress = document.createElement("progress");
        const controls = makeElement("div", "process-animation-controls");

        status.setAttribute("aria-live", "polite");
        status.setAttribute("aria-atomic", "true");
        explanation.setAttribute("aria-live", "polite");
        explanation.setAttribute("aria-atomic", "true");

        progress.className = "process-animation-progress";
        progress.max = config.steps.length;
        progress.value = 1;
        progress.setAttribute("aria-label", config.progressLabel);

        const buttonDefinitions = [
            { action: "previous", label: "Previous" },
            { action: "play", label: "Play", primary: true },
            { action: "pause", label: "Pause" },
            { action: "next", label: "Next" },
            { action: "reset", label: "Reset" }
        ];

        const buttons = {};

        buttonDefinitions.forEach(function (definition) {
            const button = makeElement(
                "button",
                "process-animation-button" +
                    (definition.primary ? " primary" : ""),
                definition.label
            );

            button.type = "button";
            button.dataset.animationAction = definition.action;
            controls.appendChild(button);
            buttons[definition.action] = button;
        });

        panel.appendChild(status);
        panel.appendChild(explanation);
        panel.appendChild(progress);
        panel.appendChild(controls);

        if (config.extraControl) {
            panel.appendChild(config.extraControl);
        }

        let currentIndex = 0;
        let playbackTimer = null;

        function stopPlayback() {
            if (playbackTimer !== null) {
                window.clearInterval(playbackTimer);
                playbackTimer = null;
            }

            buttons.play.disabled = false;
            buttons.pause.disabled = true;
        }

        function updateControls() {
            buttons.previous.disabled = currentIndex === 0;
            buttons.next.disabled = currentIndex === config.steps.length - 1;
            buttons.reset.disabled = currentIndex === 0 && playbackTimer === null;
            buttons.play.disabled = playbackTimer !== null;
            buttons.pause.disabled = playbackTimer === null;
        }

        function showStep(index) {
            currentIndex = Math.max(
                0,
                Math.min(index, config.steps.length - 1)
            );

            const step = config.steps[currentIndex];

            status.textContent =
                config.title + " — Step " +
                (currentIndex + 1) + " of " + config.steps.length +
                ": " + step.title;

            explanation.textContent = step.explanation;
            progress.value = currentIndex + 1;

            config.renderStep(currentIndex);
            updateControls();
        }

        buttons.previous.addEventListener("click", function () {
            stopPlayback();
            showStep(currentIndex - 1);
        });

        buttons.next.addEventListener("click", function () {
            stopPlayback();
            showStep(currentIndex + 1);
        });

        buttons.play.addEventListener("click", function () {
            if (playbackTimer !== null) {
                return;
            }

            if (currentIndex === config.steps.length - 1) {
                showStep(0);
            }

            buttons.play.disabled = true;
            buttons.pause.disabled = false;

            playbackTimer = window.setInterval(function () {
                if (currentIndex >= config.steps.length - 1) {
                    stopPlayback();
                    return;
                }

                showStep(currentIndex + 1);
            }, prefersReducedMotion ? 3200 : 2400);
        });

        buttons.pause.addEventListener("click", stopPlayback);

        buttons.reset.addEventListener("click", function () {
            stopPlayback();
            showStep(0);
        });

        showStep(0);
        panel._stopPlayback = stopPlayback;

        return panel;
    }

    /* -----------------------------------------------------
       1. FLOWCHART: GUIDED PROCESS-STATE JOURNEY
       ----------------------------------------------------- */

    const lifecycleSvg = section.querySelector(".process-lifecycle-svg");

    if (lifecycleSvg) {
        const flowPaths = {
            create: lifecycleSvg.querySelector('path[d="M180 105 H300"]'),
            dispatch: lifecycleSvg.querySelector('path[d="M450 105 H570"]'),
            requestIO: lifecycleSvg.querySelector('path[d="M645 150 V270"]'),
            completeIO: lifecycleSvg.querySelector('path[d="M570 310 H375 V150"]'),
            timeSlice: lifecycleSvg.querySelector('path[d="M645 65 V40 H375 V65"]'),
            finish: lifecycleSvg.querySelector('path[d="M720 105 H750"]')
        };

        const stateRects = {
            new: lifecycleSvg.querySelector('rect[x="30"][y="65"]'),
            ready: lifecycleSvg.querySelector('rect[x="300"][y="65"]'),
            running: lifecycleSvg.querySelector('rect[x="570"][y="65"]'),
            waiting: lifecycleSvg.querySelector('rect[x="570"][y="270"]'),
            terminated: lifecycleSvg.querySelector('rect[x="750"][y="65"]')
        };

        const flowSteps = [
            {
                title: "New → Ready",
                from: "new",
                to: "ready",
                path: "create",
                explanation: "The operating system creates the process and prepares it to compete for CPU time. It enters the Ready state."
            },
            {
                title: "Ready → Running",
                from: "ready",
                to: "running",
                path: "dispatch",
                explanation: "The CPU scheduler selects this Ready process. The dispatcher performs the context switch and gives it CPU control."
            },
            {
                title: "Running → Waiting",
                from: "running",
                to: "waiting",
                path: "requestIO",
                explanation: "The process requests an I/O operation. It cannot continue until the required event or operation completes, so it enters Waiting."
            },
            {
                title: "Waiting → Ready",
                from: "waiting",
                to: "ready",
                path: "completeIO",
                explanation: "The I/O operation completes. The process becomes Ready again; it does not automatically become Running."
            },
            {
                title: "Ready → Running again",
                from: "ready",
                to: "running",
                path: "dispatch",
                explanation: "The scheduler selects the process again, and the dispatcher returns CPU control to it."
            },
            {
                title: "Running → Terminated",
                from: "running",
                to: "terminated",
                path: "finish",
                explanation: "The process finishes execution. The operating system can perform cleanup and release resources."
            }
        ];

        const branchButton = makeElement(
            "button",
            "process-animation-button",
            "Explore time-slice alternative"
        );
        branchButton.type = "button";
        branchButton.setAttribute(
            "aria-label",
            "Show the alternative transition from Running to Ready when the CPU time slice expires"
        );

        const branchWrap = makeElement("div", "process-animation-controls");
        branchWrap.style.marginTop = "10px";
        branchWrap.appendChild(branchButton);

        const flowPanel = createAnimationPanel({
            title: "Lifecycle journey",
            progressLabel: "Lifecycle journey progress",
            steps: flowSteps,
            extraControl: branchWrap,
            renderStep: function (index) {
                Object.keys(stateRects).forEach(function (stateName) {
                    const rectangle = stateRects[stateName];

                    if (rectangle) {
                        rectangle.classList.toggle(
                            "ikl-state-active",
                            stateName === flowSteps[index].from ||
                            stateName === flowSteps[index].to
                        );
                    }
                });

                Object.keys(flowPaths).forEach(function (pathName) {
                    const path = flowPaths[pathName];

                    if (path) {
                        path.classList.toggle(
                            "ikl-transition-active",
                            pathName === flowSteps[index].path
                        );
                    }
                });
            }
        });

        branchButton.addEventListener("click", function () {
            flowPanel._stopPlayback();

            Object.keys(stateRects).forEach(function (stateName) {
                const rectangle = stateRects[stateName];

                if (rectangle) {
                    rectangle.classList.toggle(
                        "ikl-state-active",
                        stateName === "running" || stateName === "ready"
                    );
                }
            });

            Object.keys(flowPaths).forEach(function (pathName) {
                const path = flowPaths[pathName];

                if (path) {
                    path.classList.toggle(
                        "ikl-transition-active",
                        pathName === "timeSlice"
                    );
                }
            });

            const status = flowPanel.querySelector(
                ".process-animation-status"
            );
            const explanation = flowPanel.querySelector(
                ".process-animation-explanation"
            );

            status.textContent = "Alternative transition: Running → Ready";
            explanation.textContent = "When the process uses up its CPU time slice, the operating system can move it from Running back to Ready. The scheduler can then choose another Ready process. This is an alternative to the I/O-waiting route, not the next step after Terminated.";
        });

        const flowScroll = lifecycleSvg.closest(".process-diagram-scroll");

        if (flowScroll) {
            flowScroll.insertAdjacentElement("afterend", flowPanel);
        }

        const requiredFlowElements = Object.values(flowPaths).every(Boolean) &&
            Object.values(stateRects).every(Boolean);

        if (!requiredFlowElements) {
            flowPanel.remove();
            console.warn(
                "IKL Process diagrams: lifecycle SVG elements did not match the expected structure."
            );
        }
    }

    /* -----------------------------------------------------
       2. SEQUENCE DIAGRAM: REVEAL MESSAGES STEP BY STEP
       ----------------------------------------------------- */

    const sequenceSvg = section.querySelector(".process-sequence-svg");

    if (sequenceSvg) {
        const messagePaths = Array.from(
            sequenceSvg.querySelectorAll("path.sequence-message")
        );

        const sequenceSteps = [
            {
                title: "Place process in Ready queue",
                explanation: "The operating-system kernel places the newly prepared process in the Ready queue. The process is prepared to run but is not using the CPU yet."
            },
            {
                title: "Scheduler selects the process",
                explanation: "The CPU scheduler chooses this process from the Ready queue. The scheduler decides which eligible process should receive CPU time."
            },
            {
                title: "Dispatcher performs the context switch",
                explanation: "The dispatcher performs the required context switch and transfers CPU control to the selected process."
            },
            {
                title: "CPU begins execution",
                explanation: "The CPU starts executing the selected process's instructions. The process is now in the Running state."
            },
            {
                title: "Process requests I/O",
                explanation: "The running process requests an input/output operation, such as reading data from a device."
            },
            {
                title: "Kernel records the Waiting state",
                explanation: "The kernel coordinates the state change. The process enters Waiting because it cannot continue until the requested I/O operation completes."
            },
            {
                title: "I/O operation begins",
                explanation: "The kernel initiates or coordinates the I/O operation with the device. Meanwhile, the CPU can execute another Ready process."
            },
            {
                title: "I/O completion interrupt",
                explanation: "When the I/O operation finishes, the device signals completion. The kernel receives and handles the completion interrupt."
            },
            {
                title: "Process returns to Ready",
                explanation: "The kernel marks the process Ready and places it in the Ready queue. It must wait for the scheduler before running again."
            },
            {
                title: "Scheduler selects it again",
                explanation: "When the process is eligible, the scheduler may select it again from the Ready queue."
            },
            {
                title: "Dispatcher dispatches again",
                explanation: "The dispatcher performs another context switch and gives the selected process CPU control."
            },
            {
                title: "Process execution resumes",
                explanation: "The CPU resumes executing the process. The process has returned to the Running state and can continue its work."
            }
        ];

        const messageLabels = messagePaths.map(function (path) {
            return path.nextElementSibling &&
                path.nextElementSibling.classList.contains("sequence-label")
                ? path.nextElementSibling
                : null;
        });

        messagePaths.forEach(function (path, index) {
            path.style.opacity = index === 0 ? "1" : "0.12";
        });

        messageLabels.forEach(function (label, index) {
            if (label) {
                label.style.opacity = index === 0 ? "1" : "0.12";
            }
        });

        const sequencePanel = createAnimationPanel({
            title: "Execution sequence",
            progressLabel: "Execution sequence progress",
            steps: sequenceSteps,
            renderStep: function (index) {
                messagePaths.forEach(function (path, messageIndex) {
                    const isCurrent = messageIndex === index;
                    const isRevealed = messageIndex <= index;

                    path.style.opacity = isRevealed ? "1" : "0.12";
                    path.classList.toggle("ikl-message-current", isCurrent);

                    if (!isRevealed) {
                        path.style.strokeDasharray = "none";
                        path.style.strokeDashoffset = "0";
                        delete path.dataset.iklDrawn;
                    }

                    if (isRevealed && !path.dataset.iklDrawn) {
                        try {
                            const length = path.getTotalLength();
                            path.style.strokeDasharray = String(length);
                            path.style.strokeDashoffset =
                                prefersReducedMotion ? "0" : String(length);
                            path.dataset.iklDrawn = "true";

                            if (!prefersReducedMotion) {
                                window.requestAnimationFrame(function () {
                                    path.style.strokeDashoffset = "0";
                                });
                            }
                        } catch (error) {
                            path.style.strokeDasharray = "none";
                            path.style.strokeDashoffset = "0";
                        }
                    }
                });

                messageLabels.forEach(function (label, labelIndex) {
                    if (!label) {
                        return;
                    }

                    label.style.opacity = labelIndex <= index ? "1" : "0.12";
                    label.classList.toggle(
                        "ikl-label-current",
                        labelIndex === index
                    );
                });
            }
        });

        const sequenceScroll = sequenceSvg.closest(
            ".process-diagram-scroll"
        );

        if (sequenceScroll) {
            sequenceScroll.insertAdjacentElement(
                "afterend",
                sequencePanel
            );
        }

        if (messagePaths.length !== sequenceSteps.length ||
            messageLabels.some(function (label) { return label === null; })) {
            sequencePanel.remove();
            console.warn(
                "IKL Process diagrams: sequence diagram did not contain the expected 12 message paths and labels."
            );
        }
    }

})();
