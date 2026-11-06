
/* =========================================================
   IKL — PROCESS DIAGRAM ANIMATIONS
   Concept 002: Process — A Program in Execution

   Section 9:
   - Interactive process lifecycle flowchart
   - Integrated time-slice alternative route
   - Guided 12-step sequence diagram
   - Orange highlighting for I/O messages (steps 5–9)

   Section 8 is not modified.
   ========================================================= */

(function () {
    "use strict";

    const section = document.getElementById("process-diagrams");

    if (!section) {
        return;
    }

    /* -----------------------------------------------------
       1. ACCESSIBILITY AND MOTION PREFERENCES
       ----------------------------------------------------- */

    const reducedMotionQuery = window.matchMedia
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;

    const prefersReducedMotion = Boolean(
        reducedMotionQuery && reducedMotionQuery.matches
    );

    /* -----------------------------------------------------
       2. INJECT SCOPED ANIMATION STYLES
       ----------------------------------------------------- */

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
            filter: drop-shadow(
                0 0 5px rgba(13, 148, 136, 0.35)
            );
        }

        .process-lifecycle-svg .ikl-transition-active {
            stroke-width: 6 !important;
            filter: drop-shadow(
                0 0 4px rgba(37, 99, 235, 0.35)
            );
            animation: ikl-flow-pulse 900ms ease-in-out 2;
        }

        @keyframes ikl-flow-pulse {
            from {
                opacity: 0.55;
            }

            to {
                opacity: 1;
            }
        }

        .process-sequence-svg .sequence-message {
            transition:
                opacity 250ms ease,
                stroke-width 250ms ease,
                stroke-dashoffset 900ms ease;
        }

        .process-sequence-svg .sequence-label {
            transition:
                opacity 250ms ease,
                font-weight 250ms ease;
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

    /* -----------------------------------------------------
       3. REUSABLE HTML ELEMENT CREATOR
       ----------------------------------------------------- */

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

    /* -----------------------------------------------------
       4. REUSABLE ANIMATION PANEL
       ----------------------------------------------------- */

    function createAnimationPanel(config) {
        const panel = makeElement(
            "div",
            "process-animation-panel"
        );

        const status = makeElement(
            "p",
            "process-animation-status"
        );

        const explanation = makeElement(
            "p",
            "process-animation-explanation"
        );

        const progress = document.createElement("progress");

        const controls = makeElement(
            "div",
            "process-animation-controls"
        );

        status.setAttribute("aria-live", "polite");
        status.setAttribute("aria-atomic", "true");

        explanation.setAttribute("aria-live", "polite");
        explanation.setAttribute("aria-atomic", "true");

        progress.className = "process-animation-progress";
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

        let steps = config.steps.slice();
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

            buttons.next.disabled =
                currentIndex === steps.length - 1;

            buttons.reset.disabled = false;

            buttons.play.disabled = playbackTimer !== null;

            buttons.pause.disabled = playbackTimer === null;
        }

        function showStep(index) {
            if (!steps.length) {
                return;
            }

            currentIndex = Math.max(
                0,
                Math.min(index, steps.length - 1)
            );

            const step = steps[currentIndex];

            status.textContent =
                config.title +
                " — Step " +
                (currentIndex + 1) +
                " of " +
                steps.length +
                ": " +
                step.title;

            explanation.textContent = step.explanation;

            progress.max = steps.length;
            progress.value = currentIndex + 1;

            config.renderStep(
                currentIndex,
                step,
                steps
            );

            updateControls();
        }

        function setSteps(newSteps, startIndex) {
            stopPlayback();

            steps = newSteps.slice();

            progress.max = steps.length;

            showStep(
                typeof startIndex === "number"
                    ? startIndex
                    : 0
            );
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

            if (currentIndex === steps.length - 1) {
                showStep(0);
            }

            buttons.play.disabled = true;
            buttons.pause.disabled = false;

            playbackTimer = window.setInterval(function () {
                if (currentIndex >= steps.length - 1) {
                    stopPlayback();
                    return;
                }

                showStep(currentIndex + 1);
            }, prefersReducedMotion ? 3200 : 2400);
        });

        buttons.pause.addEventListener("click", stopPlayback);

        buttons.reset.addEventListener("click", function () {
            stopPlayback();

            if (typeof config.onReset === "function") {
                const resetSteps = config.onReset();

                if (Array.isArray(resetSteps)) {
                    steps = resetSteps.slice();
                }
            }

            showStep(0);
        });

        panel._stopPlayback = stopPlayback;
        panel._showStep = showStep;
        panel._setSteps = setSteps;

        showStep(0);

        return panel;
    }

    /* =====================================================
       5. FLOWCHART — PROCESS LIFECYCLE
       ===================================================== */

    const lifecycleSvg = section.querySelector(
        ".process-lifecycle-svg"
    );

    if (lifecycleSvg) {

        const flowPaths = {
            create: lifecycleSvg.querySelector(
                'path[d="M180 105 H300"]'
            ),

            dispatch: lifecycleSvg.querySelector(
                'path[d="M450 105 H570"]'
            ),

            requestIO: lifecycleSvg.querySelector(
                'path[d="M645 150 V270"]'
            ),

            completeIO: lifecycleSvg.querySelector(
                'path[d="M570 310 H375 V150"]'
            ),

            timeSlice: lifecycleSvg.querySelector(
                'path[d="M645 65 V40 H375 V65"]'
            ),

            finish: lifecycleSvg.querySelector(
                'path[d="M720 105 H750"]'
            )
        };

        const stateRects = {
            new: lifecycleSvg.querySelector(
                'rect[x="30"][y="65"]'
            ),

            ready: lifecycleSvg.querySelector(
                'rect[x="300"][y="65"]'
            ),

            running: lifecycleSvg.querySelector(
                'rect[x="570"][y="65"]'
            ),

            waiting: lifecycleSvg.querySelector(
                'rect[x="570"][y="270"]'
            ),

            terminated: lifecycleSvg.querySelector(
                'rect[x="750"][y="65"]'
            )
        };

        /* -------------------------------------------------
           5A. NORMAL I/O ROUTE
           ------------------------------------------------- */

        const normalFlowSteps = [
            {
                title: "New → Ready",
                from: "new",
                to: "ready",
                path: "create",
                explanation:
                    "The operating system creates the process and prepares it to compete for CPU time. It enters the Ready state."
            },

            {
                title: "Ready → Running",
                from: "ready",
                to: "running",
                path: "dispatch",
                explanation:
                    "The CPU scheduler selects this Ready process. The dispatcher performs the context switch and gives it CPU control."
            },

            {
                title: "Running → Waiting",
                from: "running",
                to: "waiting",
                path: "requestIO",
                explanation:
                    "The process requests an I/O operation. It cannot continue until the required event or operation completes, so it enters Waiting."
            },

            {
                title: "Waiting → Ready",
                from: "waiting",
                to: "ready",
                path: "completeIO",
                explanation:
                    "The I/O operation completes. The process becomes Ready again; it does not automatically become Running."
            },

            {
                title: "Ready → Running again",
                from: "ready",
                to: "running",
                path: "dispatch",
                explanation:
                    "The scheduler selects the process again, and the dispatcher returns CPU control to it."
            },

            {
                title: "Running → Terminated",
                from: "running",
                to: "terminated",
                path: "finish",
                explanation:
                    "The process finishes execution. The operating system can perform cleanup and release resources."
            }
        ];

        /* -------------------------------------------------
           5B. ALTERNATIVE TIME-SLICE ROUTE
           ------------------------------------------------- */

        const timeSliceFlowSteps = [
            {
                title: "New → Ready",
                from: "new",
                to: "ready",
                path: "create",
                explanation:
                    "The operating system creates the process and prepares it to compete for CPU time. It enters the Ready state."
            },

            {
                title: "Ready → Running",
                from: "ready",
                to: "running",
                path: "dispatch",
                explanation:
                    "The CPU scheduler selects the process. The dispatcher gives it control of the CPU."
            },

            {
                title: "Running → Ready: Time slice expires",
                from: "running",
                to: "ready",
                path: "timeSlice",
                explanation:
                    "The process has used its allocated CPU time slice. The operating system pre-empts it and returns it to the Ready queue so another process can receive CPU time."
            },

            {
                title: "Ready → Running again",
                from: "ready",
                to: "running",
                path: "dispatch",
                explanation:
                    "When the scheduler selects the process again, the dispatcher gives it CPU control. The process resumes execution."
            },

            {
                title: "Running → Terminated",
                from: "running",
                to: "terminated",
                path: "finish",
                explanation:
                    "The process eventually completes its execution. The operating system can perform cleanup and release its resources."
            }
        ];

        /* -------------------------------------------------
           5C. ROUTE SWITCH CONTROL
           ------------------------------------------------- */

        let activeRoute = "normal";

        const branchButton = makeElement(
            "button",
            "process-animation-button",
            "Explore time-slice alternative"
        );

        branchButton.type = "button";

        branchButton.setAttribute(
            "aria-label",
            "Switch between the normal I/O route and the alternative time-slice route"
        );

        const branchWrap = makeElement(
            "div",
            "process-animation-controls"
        );

        branchWrap.style.marginTop = "10px";
        branchWrap.appendChild(branchButton);

        /* -------------------------------------------------
           5D. RENDER THE CURRENT FLOWCHART STEP
           ------------------------------------------------- */

        function renderFlowStep(index, step) {

            Object.keys(stateRects).forEach(function (stateName) {
                const rectangle = stateRects[stateName];

                if (rectangle) {
                    rectangle.classList.toggle(
                        "ikl-state-active",
                        stateName === step.from ||
                        stateName === step.to
                    );
                }
            });

            Object.keys(flowPaths).forEach(function (pathName) {
                const path = flowPaths[pathName];

                if (path) {
                    path.classList.toggle(
                        "ikl-transition-active",
                        pathName === step.path
                    );
                }
            });
        }

        /* -------------------------------------------------
           5E. CHECK REQUIRED SVG ELEMENTS
           ------------------------------------------------- */

        const requiredFlowElements =
            Object.values(flowPaths).every(Boolean) &&
            Object.values(stateRects).every(Boolean);

        if (requiredFlowElements) {

            const flowPanel = createAnimationPanel({
                title: "Lifecycle journey",

                progressLabel:
                    "Lifecycle journey progress",

                steps: normalFlowSteps,

                extraControl: branchWrap,

                renderStep: renderFlowStep,

                onReset: function () {
                    activeRoute = "normal";

                    branchButton.textContent =
                        "Explore time-slice alternative";

                    return normalFlowSteps;
                }
            });

            /* ---------------------------------------------
               5F. SWITCH BETWEEN THE TWO COMPLETE ROUTES
               --------------------------------------------- */

            branchButton.addEventListener("click", function () {

                flowPanel._stopPlayback();

                if (activeRoute === "normal") {

                    activeRoute = "time-slice";

                    branchButton.textContent =
                        "Return to normal I/O route";

                    flowPanel._setSteps(
                        timeSliceFlowSteps,
                        0
                    );

                } else {

                    activeRoute = "normal";

                    branchButton.textContent =
                        "Explore time-slice alternative";

                    flowPanel._setSteps(
                        normalFlowSteps,
                        0
                    );
                }
            });

            const flowScroll = lifecycleSvg.closest(
                ".process-diagram-scroll"
            );

            if (flowScroll) {
                flowScroll.insertAdjacentElement(
                    "afterend",
                    flowPanel
                );
            }

        } else {

            console.warn(
                "IKL Process diagrams: lifecycle SVG elements did not match the expected structure."
            );
        }
    }

    /* =====================================================
       6. SEQUENCE DIAGRAM — 12 GUIDED MESSAGES
       ===================================================== */

    const sequenceSvg = section.querySelector(
        ".process-sequence-svg"
    );

    if (sequenceSvg) {

        const messagePaths = Array.from(
            sequenceSvg.querySelectorAll(
                "path.sequence-message"
            )
        );

        /* -------------------------------------------------
           6A. CREATE ORANGE ARROWHEAD FOR I/O MESSAGES

           Message steps 5–9 are the I/O-related messages.
           Their lines and arrowheads will be orange.

           The remaining messages keep their original colour.
           ------------------------------------------------- */

        const svgNamespace =
            "http://www.w3.org/2000/svg";

        const sequenceDefs = sequenceSvg.querySelector("defs");

        if (sequenceDefs && messagePaths.length >= 9) {

            let orangeMarker = sequenceSvg.querySelector(
                "#iklSequenceArrowOrange"
            );

            if (!orangeMarker) {

                orangeMarker = document.createElementNS(
                    svgNamespace,
                    "marker"
                );

                orangeMarker.setAttribute(
                    "id",
                    "iklSequenceArrowOrange"
                );

                orangeMarker.setAttribute("markerWidth", "9");
                orangeMarker.setAttribute("markerHeight", "9");

                orangeMarker.setAttribute(
                    "viewBox",
                    "0 0 9 8"
                );

                orangeMarker.setAttribute("refX", "8");
                orangeMarker.setAttribute("refY", "4");
                orangeMarker.setAttribute("orient", "auto");

                orangeMarker.setAttribute(
                    "markerUnits",
                    "strokeWidth"
                );

                const arrowHead = document.createElementNS(
                    svgNamespace,
                    "path"
                );

                arrowHead.setAttribute(
                    "d",
                    "M0,0 L9,4 L0,8 Z"
                );

                arrowHead.setAttribute(
                    "fill",
                    "#D97706"
                );

                orangeMarker.appendChild(arrowHead);
                sequenceDefs.appendChild(orangeMarker);
            }

            /* Array positions 4–8 represent steps 5–9. */

            messagePaths.slice(4, 9).forEach(function (path) {

                path.style.setProperty(
                    "stroke",
                    "#D97706",
                    "important"
                );

                path.setAttribute(
                    "marker-end",
                    "url(#iklSequenceArrowOrange)"
                );
            });
        }

        const sequenceSteps = [
            {
                title: "Place process in Ready queue",
                explanation:
                    "The operating-system kernel places the newly prepared process in the Ready queue. The process is prepared to run but is not using the CPU yet."
            },

            {
                title: "Scheduler selects the process",
                explanation:
                    "The CPU scheduler chooses this process from the Ready queue. The scheduler decides which eligible process should receive CPU time."
            },

            {
                title: "Dispatcher performs the context switch",
                explanation:
                    "The dispatcher performs the required context switch and transfers CPU control to the selected process."
            },

            {
                title: "CPU begins execution",
                explanation:
                    "The CPU starts executing the selected process's instructions. The process is now in the Running state."
            },

            {
                title: "Process requests I/O",
                explanation:
                    "The running process requests an input/output operation, such as reading data from a device."
            },

            {
                title: "Kernel records the Waiting state",
                explanation:
                    "The kernel coordinates the state change. The process enters Waiting because it cannot continue until the requested I/O operation completes."
            },

            {
                title: "I/O operation begins",
                explanation:
                    "The kernel initiates or coordinates the I/O operation with the device. Meanwhile, the CPU can execute another Ready process."
            },

            {
                title: "I/O completion interrupt",
                explanation:
                    "When the I/O operation finishes, the device signals completion. The kernel receives and handles the completion interrupt."
            },

            {
                title: "Process returns to Ready",
                explanation:
                    "The kernel marks the process Ready and places it in the Ready queue. It must wait for the scheduler before running again."
            },

            {
                title: "Scheduler selects it again",
                explanation:
                    "When the process is eligible, the scheduler may select it again from the Ready queue."
            },

            {
                title: "Dispatcher dispatches again",
                explanation:
                    "The dispatcher performs another context switch and gives the selected process CPU control."
            },

            {
                title: "Process execution resumes",
                explanation:
                    "The CPU resumes executing the process. The process has returned to the Running state and can continue its work."
            }
        ];

        const messageLabels = messagePaths.map(function (path) {

            const nextElement = path.nextElementSibling;

            return nextElement &&
                nextElement.classList.contains("sequence-label")
                ? nextElement
                : null;
        });

        /* -------------------------------------------------
           6B. REVEAL MESSAGES AND LABELS
           ------------------------------------------------- */

        function renderSequenceStep(index) {

            messagePaths.forEach(function (path, messageIndex) {

                const isCurrent = messageIndex === index;
                const isRevealed = messageIndex <= index;

                path.style.opacity = isRevealed ? "1" : "0.12";

                path.classList.toggle(
                    "ikl-message-current",
                    isCurrent
                );

                if (!isRevealed) {

                    path.style.strokeDasharray = "none";
                    path.style.strokeDashoffset = "0";

                    delete path.dataset.iklDrawn;

                } else if (!path.dataset.iklDrawn) {

                    try {

                        const length = path.getTotalLength();

                        path.style.strokeDasharray =
                            String(length);

                        path.style.strokeDashoffset =
                            prefersReducedMotion
                                ? "0"
                                : String(length);

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

                label.style.opacity =
                    labelIndex <= index ? "1" : "0.12";

                label.classList.toggle(
                    "ikl-label-current",
                    labelIndex === index
                );
            });
        }

        /* -------------------------------------------------
           6C. CREATE SEQUENCE ANIMATION PANEL
           ------------------------------------------------- */

        const validSequence =
            messagePaths.length === sequenceSteps.length &&
            messageLabels.every(Boolean);

        if (validSequence) {

            const sequencePanel = createAnimationPanel({
                title: "Execution sequence",

                progressLabel:
                    "Execution sequence progress",

                steps: sequenceSteps,

                renderStep: renderSequenceStep
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

        } else {

            console.warn(
                "IKL Process diagrams: sequence diagram did not contain the expected 12 message paths and labels."
            );
        }
    }

})();
