
/* ===================================================== */
/* IKL PROCESS COMPONENT EXPLORER                         */
/* File: process-component-explorer.js                   */
/* Concept: IKL-OS-002 — Process                         */
/* Purpose: Supply Process-specific PCB learning content */
/* ===================================================== */


/* ===================================================== */
/* SECTION 1 — PREPARE PROCESS EXPLORER DATA             */
/* Purpose: Define the seven PCB information categories  */
/* ===================================================== */

(function () {

    "use strict";


    /* ================================================= */
    /* SECTION 2 — DEFINE THE PCB COMPONENTS             */
    /* Purpose: Provide content for the shared engine    */
    /* ================================================= */

    const processComponents = [

        /* --------------------------------------------- */
        /* COMPONENT 01 — PROCESS IDENTIFICATION         */
        /* Purpose: Explain how the OS identifies a process */
        /* --------------------------------------------- */

        {
            id: "pid",

            label: "Component 01",

            title: "Process ID (PID)",

            description:
                "The Process ID is a number the operating system uses to identify a process.",

            details: [
                "Each active process has an identifier.",
                "The operating system uses the PID to distinguish processes.",
                "System tools can display a process using its PID.",
                "A PID may be reused after a process terminates."
            ]
        },


        /* --------------------------------------------- */
        /* COMPONENT 02 — PROCESS STATE                  */
        /* Purpose: Explain the current condition of a process */
        /* --------------------------------------------- */

        {
            id: "state",

            label: "Component 02",

            title: "Process State",

            description:
                "The process state describes what the process is currently doing or waiting for.",

            details: [
                "New: the process is being created.",
                "Ready: the process is waiting for CPU time.",
                "Running: the process is executing on a CPU.",
                "Waiting: the process is waiting for an event or resource.",
                "Terminated: the process has finished execution."
            ]
        },


        /* --------------------------------------------- */
        /* COMPONENT 03 — PROGRAM COUNTER                */
        /* Purpose: Explain where execution should continue */
        /* --------------------------------------------- */

        {
            id: "program-counter",

            label: "Component 03",

            title: "Program Counter",

            description:
                "The program counter records the address of the next instruction the process should execute.",

            details: [
                "Contains an instruction address.",
                "Helps the CPU resume execution at the correct point.",
                "Its value changes as instructions execute.",
                "Its value is saved when the process is interrupted or switched out."
            ]
        },


        /* --------------------------------------------- */
        /* COMPONENT 04 — CPU REGISTERS                  */
        /* Purpose: Explain saved processor information  */
        /* --------------------------------------------- */

        {
            id: "cpu-registers",

            label: "Component 04",

            title: "CPU Registers",

            description:
                "CPU registers hold temporary values and execution information needed by the processor.",

            details: [
                "Registers can hold data being processed.",
                "They can contain addresses and intermediate results.",
                "The operating system saves relevant register values during a context switch.",
                "Saved values help the process continue correctly later."
            ]
        },


        /* --------------------------------------------- */
        /* COMPONENT 05 — CPU SCHEDULING INFORMATION     */
        /* Purpose: Explain how the OS plans CPU access  */
        /* --------------------------------------------- */

        {
            id: "scheduling",

            label: "Component 05",

            title: "CPU Scheduling Information",

            description:
                "Scheduling information helps the operating system decide when a process should receive CPU time.",

            details: [
                "May include process priority.",
                "May include scheduling queue information.",
                "Can include scheduling-related time information.",
                "Helps the scheduler manage competition for CPU time."
            ]
        },


        /* --------------------------------------------- */
        /* COMPONENT 06 — MEMORY MANAGEMENT INFORMATION  */
        /* Purpose: Explain how process memory is tracked */
        /* --------------------------------------------- */

        {
            id: "memory",

            label: "Component 06",

            title: "Memory Management Information",

            description:
                "Memory management information helps the operating system track the memory associated with a process.",

            details: [
                "May include page-table information.",
                "May include memory-region or segment information.",
                "Helps manage the process address space.",
                "Supports memory protection and address translation."
            ]
        },


        /* --------------------------------------------- */
        /* COMPONENT 07 — I/O AND ACCOUNTING INFORMATION */
        /* Purpose: Explain device and usage records     */
        /* --------------------------------------------- */

        {
            id: "io-accounting",

            label: "Component 07",

            title: "I/O and Accounting Information",

            description:
                "This information helps the operating system track a process's input/output activity and resource usage.",

            details: [
                "May include information about allocated I/O devices.",
                "May include open-file information.",
                "May record CPU time used by the process.",
                "May include process usage or accounting information."
            ]
        }

    ];


    /* ================================================= */
    /* SECTION 3 — CONNECT PROCESS DATA TO SHARED ENGINE */
    /* Purpose: Reuse the common explorer functionality */
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
    /* SECTION 4 — INITIALISE THE PROCESS EXPLORER       */
    /* Purpose: Connect Process content to its HTML      */
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
