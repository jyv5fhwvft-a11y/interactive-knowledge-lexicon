
/* ===================================================== */
/* IKL PROCESS — TWO THREADS, ONE PROCESS SIMULATION     */
/* File: process-thread-simulation.js                    */
/* Concept: IKL-OS-002 — Process                         */
/* ===================================================== */

(function () {

    "use strict";

    /* ================================================= */
    /* 1. FIND THE SIMULATION                             */
    /* ================================================= */

    const simulation = document.getElementById("thread-simulation");

    if (!simulation) {
        return;
    }

    /* ================================================= */
    /* 2. INITIAL SIMULATION DATA                         */
    /* ================================================= */

    const initialState = {
        runningThread: "A",

        threads: {
            A: {
                state: "Running",
                pc: 120,
                registerR1: 25
            },

            B: {
                state: "Ready",
                pc: 450,
                registerR1: 80
            }
        }
    };

    let state = createInitialState();

    function createInitialState() {
        return {
            runningThread: initialState.runningThread,

            threads: {
                A: { ...initialState.threads.A },
                B: { ...initialState.threads.B }
            }
        };
    }

    /* ================================================= */
    /* 3. FIND THE DISPLAY ELEMENTS                       */
    /* ================================================= */

    const elements = {
        threadAState: simulation.querySelector("#thread-a-state"),
        threadAPC: simulation.querySelector("#thread-a-pc"),
        threadARegister: simulation.querySelector("#thread-a-register"),

        threadBState: simulation.querySelector("#thread-b-state"),
        threadBPC: simulation.querySelector("#thread-b-pc"),
        threadBRegister: simulation.querySelector("#thread-b-register"),

        cpuRunningThread: simulation.querySelector("#cpu-running-thread"),
        cpuActivePC: simulation.querySelector("#cpu-active-pc"),
        cpuActiveRegister: simulation.querySelector("#cpu-active-register"),

        threadAPanel: simulation.querySelector("#thread-a-panel"),
        threadBPanel: simulation.querySelector("#thread-b-panel"),

        message: simulation.querySelector("#thread-simulation-message"),

        examineA: simulation.querySelector("#examine-thread-a"),
        examineB: simulation.querySelector("#examine-thread-b"),
        switchThread: simulation.querySelector("#switch-thread"),
        reset: simulation.querySelector("#reset-thread-simulation")
    };

    /* ================================================= */
    /* 4. CHECK REQUIRED ELEMENTS                         */
    /* ================================================= */

    const requiredElements = Object.values(elements);

    if (requiredElements.some(element => !element)) {
        console.error(
            "Thread simulation: One or more required HTML elements are missing."
        );
        return;
    }

    /* ================================================= */
    /* 5. TRACK WHICH THREAD THE LEARNER EXAMINES         */
    /* ================================================= */

    let examinedThread = "A";

    /* ================================================= */
    /* 6. UPDATE THE SIMULATION DISPLAY                   */
    /* ================================================= */

    function render() {

        const threadA = state.threads.A;
        const threadB = state.threads.B;

        const runningThread = state.runningThread;

        const activeThread = state.threads[runningThread];

        elements.threadAState.textContent = threadA.state;
        elements.threadAPC.textContent = threadA.pc;
        elements.threadARegister.textContent = threadA.registerR1;

        elements.threadBState.textContent = threadB.state;
        elements.threadBPC.textContent = threadB.pc;
        elements.threadBRegister.textContent = threadB.registerR1;

        elements.cpuRunningThread.textContent =
            "Thread " + runningThread;

        elements.cpuActivePC.textContent = activeThread.pc;
        elements.cpuActiveRegister.textContent =
            activeThread.registerR1;

        elements.threadAPanel.classList.toggle(
            "is-running",
            runningThread === "A"
        );

        elements.threadBPanel.classList.toggle(
            "is-running",
            runningThread === "B"
        );

    }

    /* ================================================= */
    /* 7. EXAMINE THREAD A                                */
    /* ================================================= */

    function examineThreadA() {

        examinedThread = "A";

        elements.message.textContent =
            "You are examining Thread A. Its saved program counter is " +
            state.threads.A.pc +
            " and its saved R1 value is " +
            state.threads.A.registerR1 +
            ". Examining a thread does not change which thread is running.";

    }

    /* ================================================= */
    /* 8. EXAMINE THREAD B                                */
    /* ================================================= */

    function examineThreadB() {

        examinedThread = "B";

        elements.message.textContent =
            "You are examining Thread B. Its saved program counter is " +
            state.threads.B.pc +
            " and its saved R1 value is " +
            state.threads.B.registerR1 +
            ". Examining a thread does not change which thread is running.";

    }

    /* ================================================= */
    /* 9. SWITCH THE RUNNING THREAD                       */
    /* ================================================= */

    function switchThread() {

        const outgoingThread = state.runningThread;

        const incomingThread =
            outgoingThread === "A" ? "B" : "A";

        /*
         * In this simplified model, the outgoing thread's
         * execution context is preserved in its thread record.
         *
         * The incoming thread's saved context is then restored
         * into the simulated CPU's active registers.
         *
         * The shared process address space does not change.
         */

        state.threads[outgoingThread].state = "Ready";

        state.threads[incomingThread].state = "Running";

        state.runningThread = incomingThread;

        render();

        elements.message.textContent =
            "Context switch complete. Thread " +
            outgoingThread +
            " was saved, and Thread " +
            incomingThread +
            " is now running. Its saved program counter and register " +
            "values are restored. Both threads still share Process 2048's address space.";

    }

    /* ================================================= */
    /* 10. RESET THE SIMULATION                           */
    /* ================================================= */

    function resetSimulation() {

        state = createInitialState();

        examinedThread = "A";

        render();

        elements.message.textContent =
            "Simulation reset. Thread A is running, Thread B is ready, " +
            "and both threads share Process 2048's address space.";

    }

    /* ================================================= */
    /* 11. CONNECT THE BUTTONS                            */
    /* ================================================= */

    elements.examineA.addEventListener(
        "click",
        examineThreadA
    );

    elements.examineB.addEventListener(
        "click",
        examineThreadB
    );

    elements.switchThread.addEventListener(
        "click",
        switchThread
    );

    elements.reset.addEventListener(
        "click",
        resetSimulation
    );

    /* ================================================= */
    /* 12. START THE SIMULATION                           */
    /* ================================================= */

    render();

})();
