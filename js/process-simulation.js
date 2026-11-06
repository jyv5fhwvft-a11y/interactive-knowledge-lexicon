
/* =========================================================
   IKL — PROCESS LIFECYCLE SIMULATION
   Concept 002: Process — A Program in Execution

   Controls the interactive five-state process simulation.
   ========================================================= */

(function () {

    "use strict";

    // -----------------------------------------------------
    // 1. FIND THE SIMULATION ELEMENTS
    // -----------------------------------------------------

    const simulation = document.querySelector(".process-sim-panel");

    if (!simulation) {
        return;
    }

    const stateDisplay = document.getElementById("processSimState");
    const cpuDisplay = document.getElementById("processSimCPU");

    const headingDisplay = document.getElementById("processSimHeading");
    const explanationDisplay = document.getElementById("processSimExplanation");

    const historyDisplay = document.getElementById("processSimHistory");

    const stateElements = simulation.querySelectorAll(".process-sim-state");
    const buttons = simulation.querySelectorAll("[data-action]");

    // -----------------------------------------------------
    // 2. INITIAL SIMULATION STATE
    // -----------------------------------------------------

    let currentState = "new";
    let processCreated = false;

    // -----------------------------------------------------
    // 3. EXPLANATIONS FOR EACH STATE
    // -----------------------------------------------------

    const explanations = {

        new: {
            heading: "The process has not been created yet.",
            text: "Select Create Process to ask the operating system to create Process A."
        },

        ready: {
            heading: "Process A is Ready.",
            text: "The operating system has prepared the process. It is waiting for the CPU scheduler to select it."
        },

        running: {
            heading: "Process A is Running.",
            text: "The dispatcher has given Process A control of the CPU. Its instructions are now being executed."
        },

        waiting: {
            heading: "Process A is Waiting.",
            text: "The process requested an I/O operation. It cannot continue until the required operation or event completes. The CPU is available for other work."
        },

        terminated: {
            heading: "Process A has Terminated.",
            text: "The process has finished its execution. The operating system can perform the necessary cleanup and release resources."
        }

    };

    // -----------------------------------------------------
    // 4. UPDATE THE SIMULATION DISPLAY
    // -----------------------------------------------------

    function updateDisplay() {

        stateDisplay.textContent =
            currentState.charAt(0).toUpperCase() + currentState.slice(1);

        cpuDisplay.textContent =
            currentState === "running" ? "Busy — Process A" : "Available";

        headingDisplay.textContent =
            explanations[currentState].heading;

        explanationDisplay.textContent =
            explanations[currentState].text;

        stateElements.forEach(function (element) {

            element.classList.toggle(
                "active",
                element.dataset.state === currentState
            );

        });

        updateButtons();
    }

    // -----------------------------------------------------
    // 5. ENABLE ONLY VALID ACTIONS
    // -----------------------------------------------------

    function updateButtons() {

        buttons.forEach(function (button) {

            const action = button.dataset.action;

            if (action === "reset") {
                button.disabled = false;
                return;
            }

            const validActions = {

                create: !processCreated,

                dispatch: currentState === "ready",

                "request-io": currentState === "running",

                "complete-io": currentState === "waiting",

                "time-slice": currentState === "running",

                terminate: currentState === "running"

            };

            button.disabled = !validActions[action];

        });
    }

    // -----------------------------------------------------
    // 6. RECORD SIMULATION EVENTS
    // -----------------------------------------------------

    function addHistory(message) {

        const item = document.createElement("li");

        item.textContent = message;

        historyDisplay.appendChild(item);
    }

    // -----------------------------------------------------
    // 7. CHANGE PROCESS STATE
    // -----------------------------------------------------

    function transition(newState, message) {

        const previousState = currentState;

        currentState = newState;

        updateDisplay();

        addHistory(
            previousState.toUpperCase() +
            " → " +
            newState.toUpperCase() +
            ": " +
            message
        );
    }

    // -----------------------------------------------------
    // 8. HANDLE LEARNER ACTIONS
    // -----------------------------------------------------

    function handleAction(action) {

        switch (action) {

            case "create":

                if (!processCreated) {

                    processCreated = true;

                    transition(
                        "ready",
                        "The operating system created Process A and prepared it for execution."
                    );
                }

                break;

            case "dispatch":

                if (currentState === "ready") {

                    transition(
                        "running",
                        "The scheduler selected Process A and the dispatcher gave it CPU control."
                    );
                }

                break;

            case "request-io":

                if (currentState === "running") {

                    transition(
                        "waiting",
                        "Process A requested an I/O operation and must wait for it to complete."
                    );
                }

                break;

            case "complete-io":

                if (currentState === "waiting") {

                    transition(
                        "ready",
                        "The I/O operation completed. Process A returned to the Ready state."
                    );
                }

                break;

            case "time-slice":

                if (currentState === "running") {

                    transition(
                        "ready",
                        "The CPU time slice expired. Process A returned to Ready so another process can be scheduled."
                    );
                }

                break;

            case "terminate":

                if (currentState === "running") {

                    transition(
                        "terminated",
                        "Process A completed its execution and entered the Terminated state."
                    );
                }

                break;

            case "reset":

                resetSimulation();

                break;
        }
    }

    // -----------------------------------------------------
    // 9. RESET THE SIMULATION
    // -----------------------------------------------------

    function resetSimulation() {

        currentState = "new";

        processCreated = false;

        historyDisplay.replaceChildren();

        addHistory(
            "Simulation reset. Process A has not yet been created."
        );

        updateDisplay();
    }

    // -----------------------------------------------------
    // 10. CONNECT THE BUTTONS
    // -----------------------------------------------------

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            if (button.disabled) {
                return;
            }

            handleAction(button.dataset.action);

        });

    });

    // -----------------------------------------------------
    // 11. INITIALISE THE SIMULATION
    // -----------------------------------------------------

    updateDisplay();

})();
