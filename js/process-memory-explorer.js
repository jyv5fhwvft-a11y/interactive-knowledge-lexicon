/* =========================================================
   PROCESS MEMORY MAP EXPLORER
   Interactive teaching tool for Process Concept 002
   ========================================================= */

(function () {
    "use strict";

    function initialiseMemoryExplorer() {
        const explorers = document.querySelectorAll("[data-memory-explorer]");

        explorers.forEach(function (explorer) {
            if (explorer.dataset.initialised === "true") {
                return;
            }

            explorer.dataset.initialised = "true";

            const regions = {
                code: {
                    title: "Code / Text Segment",
                    description:
                        "This region contains the executable instructions of a program. The CPU fetches and executes these instructions as the program runs.",
                    example:
                        "Example: Instructions that tell a program how to calculate a total or display a message.",
                    technical:
                        "The code segment is commonly mapped with read and execute permissions. Its exact arrangement depends on the operating system and executable format."
                },

                data: {
                    title: "Data Segment",
                    description:
                        "This region stores global and static variables that have been given an initial value in the program.",
                    example:
                        "Example: A global variable declared with an initial value, such as int score = 100;",
                    technical:
                        "These variables generally remain allocated for the lifetime of the process."
                },

                bss: {
                    title: "BSS Segment",
                    description:
                        "This region stores uninitialised or zero-initialised global and static variables.",
                    example:
                        "Example: A global variable declared as int total; without an explicit initial value.",
                    technical:
                        "Executable formats commonly represent this region so that the required memory is created and initialised to zero when the program loads."
                },

                heap: {
                    title: "Heap",
                    description:
                        "The heap is an area used for dynamic memory allocation. A program can request memory while it is running and release it when it is no longer needed.",
                    example:
                        "Example: A program creates a data structure whose size is decided while the program is running.",
                    technical:
                        "Dynamic allocation is commonly managed through runtime libraries and operating-system memory services. Allocation and release behaviour depends on the programming language and runtime."
                },

                stack: {
                    title: "Stack",
                    description:
                        "Each thread normally has its own stack. It is used to support function calls, return information and automatic storage used during execution.",
                    example:
                        "Example: When Thread A calls a function, its stack records information needed to continue execution after that function returns.",
                    technical:
                        "A thread's stack is part of the process's virtual address space. Other threads in the same process normally have separate stacks."
                }
            };

            const threadDetails = {
                a: {
                    title: "Thread A — Its own stack",
                    description:
                        "Thread A has a private stack for its own function calls, return information and automatic storage.",
                    example:
                        "Imagine Thread A calling calculateTotal(). Its function-call information belongs to Thread A's execution stack.",
                    technical:
                        "When Thread A is paused, its execution context can be saved so that it can resume later."
                },

                b: {
                    title: "Thread B — Its own stack",
                    description:
                        "Thread B has a separate stack. Its function calls and temporary execution information are independent of Thread A's stack.",
                    example:
                        "Imagine Thread B calling displayMessage() while Thread A is performing a calculation. Each thread maintains its own call information.",
                    technical:
                        "Although the two threads have separate stacks, they share the process's address space and many process resources."
                }
            };

            const titleOutput = explorer.querySelector("[data-memory-title]");
            const descriptionOutput = explorer.querySelector("[data-memory-description]");
            const exampleOutput = explorer.querySelector("[data-memory-example]");
            const technicalOutput = explorer.querySelector("[data-memory-technical]");
            const threadPanel = explorer.querySelector("[data-memory-thread-panel]");

            function updateText(element, value) {
                if (element) {
                    element.textContent = value;
                }
            }

            function selectRegion(regionName) {
                const region = regions[regionName];

                if (!region) {
                    return;
                }

                explorer.querySelectorAll("[data-memory-region]").forEach(function (button) {
                    const selected = button.dataset.memoryRegion === regionName;

                    button.setAttribute("aria-pressed", String(selected));
                });

                updateText(titleOutput, region.title);
                updateText(descriptionOutput, region.description);
                updateText(exampleOutput, region.example);
                updateText(technicalOutput, region.technical);

                if (threadPanel) {
                    threadPanel.hidden = regionName !== "stack";
                }

                if (regionName === "stack") {
                    selectThread("a");
                }
            }

            function selectThread(threadName) {
                const thread = threadDetails[threadName];

                if (!thread) {
                    return;
                }

                explorer.querySelectorAll("[data-memory-thread]").forEach(function (button) {
                    const selected = button.dataset.memoryThread === threadName;

                    button.setAttribute("aria-pressed", String(selected));
                });

                updateText(titleOutput, thread.title);
                updateText(descriptionOutput, thread.description);
                updateText(exampleOutput, thread.example);
                updateText(technicalOutput, thread.technical);
            }

            explorer.addEventListener("click", function (event) {
                const regionButton = event.target.closest("[data-memory-region]");
                const threadButton = event.target.closest("[data-memory-thread]");

                if (regionButton && explorer.contains(regionButton)) {
                    selectRegion(regionButton.dataset.memoryRegion);
                    return;
                }

                if (threadButton && explorer.contains(threadButton)) {
                    selectThread(threadButton.dataset.memoryThread);
                }
            });

            selectRegion("code");
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initialiseMemoryExplorer);
    } else {
        initialiseMemoryExplorer();
    }
})();
