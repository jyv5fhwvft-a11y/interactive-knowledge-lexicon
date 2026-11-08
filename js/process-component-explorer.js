
/* ===================================================== */
/* IKL PROCESS COMPONENT EXPLORER                         */
/* File: process-component-explorer.js                   */
/* Concept: IKL-OS-002 — Process                         */
/* Purpose: Supply accurate process-management lessons   */
/* ===================================================== */

(function () {

    "use strict";

    /* ================================================= */
    /* SECTION 1 — DEFINE THE SEVEN LEARNING CATEGORIES  */
    /* ================================================= */

    const processComponents = [

        /* COMPONENT 01 — PROCESS IDENTIFICATION */

        {
            id: "pid",
            label: "Component 01",
            title: "Process ID (PID)",

            description:
                "A Process ID is a unique identifier assigned to an active process so the operating system can distinguish it from other processes.",

            details: [
                "PID stands for Process Identifier.",
                "The operating system uses it to identify a process.",
                "Different active processes have distinguishable PIDs.",
                "System tools can use a PID to inspect or manage a process.",
                "A PID may be reused after its process terminates."
            ]
        },

        /* COMPONENT 02 — PROCESS STATE */

        {
            id: "state",
            label: "Component 02",
            title: "Process State",

            description:
                "A process state describes the current condition of a process as it moves through its execution lifecycle.",

            details: [
                "New: the process is being created.",
                "Ready: the process is prepared and waiting for CPU time.",
                "Running: a thread belonging to the process is executing on a CPU.",
                "Waiting: the process is waiting for an event or resource.",
                "Terminated: the process has finished execution.",
                "A process containing multiple threads can have threads in different execution states."
            ]
        },

        /* COMPONENT 03 — PROGRAM COUNTER */

        {
            id: "program-counter",
            label: "Component 03",
            title: "Program Counter (PC)",

            description:
                "The program counter holds the address of the next instruction to execute. In a multithreaded process, each thread has its own program-counter execution context.",

            details: [
                "The program counter identifies an instruction address.",
                "It helps execution continue from the correct point.",
                "Its value changes as instructions execute.",
                "Each thread maintains its own program-counter context.",
                "The operating system preserves the relevant value when switching threads."
            ]
        },

        /* COMPONENT 04 — CPU REGISTERS */

        {
            id: "cpu-registers",
            label: "Component 04",
            title: "CPU Registers and Saved Context",

            description:
                "CPU registers are small, fast storage locations inside the processor. A thread's relevant register values are preserved so its execution can resume correctly.",

            details: [
                "Registers can hold data being processed.",
                "They can contain addresses and intermediate results.",
                "The CPU has active hardware registers.",
                "The operating system preserves relevant register values when switching execution contexts.",
                "Each thread has its own saved register context."
            ]
        },

        /* COMPONENT 05 — CPU SCHEDULING INFORMATION */

        {
            id: "scheduling",
            label: "Component 05",
            title: "CPU Scheduling Information",

            description:
                "Scheduling information helps the operating system decide which eligible thread should receive CPU time and when.",

            details: [
                "Scheduling priority can influence selection.",
                "Ready queues help organise eligible threads.",
                "The scheduler chooses a thread for execution.",
                "Modern operating systems generally schedule threads rather than treating an entire process as one indivisible execution unit.",
                "Scheduling information may be maintained at the thread level."
            ]
        },

        /* COMPONENT 06 — MEMORY MANAGEMENT INFORMATION */

        {
            id: "memory",
            label: "Component 06",
            title: "Memory Management Information",

            description:
                "Memory-management information helps the operating system manage a process's virtual address space and its relationship with physical memory.",

            details: [
                "A process has its own virtual address space.",
                "Threads in the same process generally share that address space.",
                "Page tables help translate virtual addresses into physical addresses.",
                "Memory-region information describes areas of the address space.",
                "Memory protection helps prevent unauthorised access."
            ]
        },

        /* COMPONENT 07 — I/O AND ACCOUNTING */

        {
            id: "io-accounting",
            label: "Component 07",
            title: "I/O and Accounting Information",

            description:
                "This category covers information used to manage a process's associated input/output resources and track resource consumption.",

            details: [
                "A process may have open files.",
                "It may use input/output devices.",
                "The operating system tracks associated resources.",
                "Accounting information can include CPU time used.",
                "Some activity and usage information can also be tracked per thread."
            ]
        }

    ];


    /* ================================================= */
    /* SECTION 2 — CONNECT TO THE SHARED EXPLORER ENGINE */
    /* ================================================= */

    if (
        !window.IKLComponentExplorer ||
        typeof window.IKLComponentExplorer.init !== "function"
    ) {

        console.error(
            "Process Explorer: Shared component explorer engine is not available."
        );

        return;

    }


    /* ================================================= */
    /* SECTION 3 — INITIALISE THE PROCESS EXPLORER       */
    /* ================================================= */

    window.IKLComponentExplorer.init({

        rootId: "process-component-explorer",

        initialKey: "pid",

        items: processComponents

    });


/* ===================================================== */
/* END OF PROCESS COMPONENT EXPLORER                     */
/* ===================================================== */

})();
