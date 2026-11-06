
/* ===================================================== */
/* IKL SHARED COMPONENT EXPLORER ENGINE                  */
/* File: component-explorer-engine.js                    */
/* Purpose: Provides reusable component explorer logic  */
/* ===================================================== */


/* ===================================================== */
/* SECTION 1 — CREATE THE SHARED ENGINE                  */
/* Purpose: Keep the reusable engine in its own scope    */
/* ===================================================== */

(function () {

    "use strict";


    /* ================================================= */
    /* SECTION 2 — INITIALISE THE COMPONENT EXPLORER     */
    /* Purpose: Accept concept-specific configuration    */
    /* ================================================= */

    function initializeExplorer(configuration) {

        /* --------------------------------------------- */
        /* SECTION 2.1 — VALIDATE CONFIGURATION           */
        /* Purpose: Check the supplied data               */
        /* --------------------------------------------- */

        if (!configuration || typeof configuration !== "object") {
            console.warn("IKL Explorer: Invalid configuration.");
            return false;
        }

        if (
            typeof configuration.rootId !== "string" ||
            !Array.isArray(configuration.items) ||
            configuration.items.length === 0
        ) {
            console.warn("IKL Explorer: Required configuration is missing.");
            return false;
        }


        /* --------------------------------------------- */
        /* SECTION 2.2 — WAIT FOR THE PAGE TO BE READY   */
        /* Purpose: Prevent premature DOM access          */
        /* --------------------------------------------- */

        if (document.readyState === "loading") {

            document.addEventListener(
                "DOMContentLoaded",
                function () {
                    initializeExplorerNow(configuration);
                },
                { once: true }
            );

            return true;
        }

        return initializeExplorerNow(configuration);

    }


    /* ================================================= */
    /* SECTION 3 — CONNECT THE ENGINE TO THE HTML        */
    /* Purpose: Find the correct explorer and its parts  */
    /* ================================================= */

    function initializeExplorerNow(configuration) {

        /* --------------------------------------------- */
        /* SECTION 3.1 — FIND THE EXPLORER CONTAINER      */
        /* Purpose: Isolate this individual explorer      */
        /* --------------------------------------------- */

        const explorer = document.getElementById(configuration.rootId);

        if (!explorer) {
            console.warn(
                "IKL Explorer: Container not found:",
                configuration.rootId
            );

            return false;
        }

        /* Prevent accidental double initialisation. */

        if (explorer.dataset.iklExplorerInitialized === "true") {
            console.warn("IKL Explorer: Already initialised.");
            return false;
        }


        /* --------------------------------------------- */
        /* SECTION 3.2 — FIND THE DISPLAY ELEMENTS        */
        /* Purpose: Locate the areas that show content   */
        /* --------------------------------------------- */

        const label = explorer.querySelector("[data-explorer-label]");
        const title = explorer.querySelector("[data-explorer-title]");
        const description = explorer.querySelector("[data-explorer-description]");
        const details = explorer.querySelector("[data-explorer-details]");
        const status = explorer.querySelector("[data-explorer-status]");

        const buttons = explorer.querySelectorAll(
            "button[data-component-key]"
        );


        /* --------------------------------------------- */
        /* SECTION 3.3 — CHECK REQUIRED HTML ELEMENTS     */
        /* Purpose: Avoid errors caused by missing markup */
        /* --------------------------------------------- */

        if (
            !label ||
            !title ||
            !description ||
            !details ||
            !status ||
            buttons.length === 0
        ) {
            console.warn(
                "IKL Explorer: One or more required HTML elements are missing."
            );

            return false;
        }


        /* ================================================= */
        /* SECTION 4 — VALIDATE CONCEPT-SPECIFIC DATA        */
        /* Purpose: Check component entries before display  */
        /* ================================================= */

        const components = new Map();

        configuration.items.forEach(function (item) {

            if (
                !item ||
                typeof item.id !== "string" ||
                typeof item.label !== "string" ||
                typeof item.title !== "string" ||
                typeof item.description !== "string" ||
                !Array.isArray(item.details)
            ) {
                console.warn("IKL Explorer: Invalid component entry.", item);
                return;
            }

            if (components.has(item.id)) {
                console.warn(
                    "IKL Explorer: Duplicate component ID:",
                    item.id
                );

                return;
            }

            components.set(item.id, item);

        });


        if (components.size === 0) {
            console.warn("IKL Explorer: No valid components were supplied.");
            return false;
        }


        /* ================================================= */
        /* SECTION 5 — DISPLAY THE SELECTED COMPONENT        */
        /* Purpose: Update the explorer with selected data  */
        /* ================================================= */

        function displayComponent(componentKey, selectedButton) {

            const component = components.get(componentKey);

            if (!component) {
                console.warn(
                    "IKL Explorer: Unknown component:",
                    componentKey
                );

                return;
            }


            /* --------------------------------------------- */
            /* SECTION 5.1 — UPDATE BUTTON SELECTION         */
            /* Purpose: Show which component is selected    */
            /* --------------------------------------------- */

            buttons.forEach(function (button) {

                const isSelected = button === selectedButton;

                button.classList.toggle("is-selected", isSelected);

                button.setAttribute(
                    "aria-pressed",
                    String(isSelected)
                );

            });


            /* --------------------------------------------- */
            /* SECTION 5.2 — UPDATE COMPONENT EXPLANATION    */
            /* Purpose: Display the selected component      */
            /* --------------------------------------------- */

            label.textContent = component.label;
            title.textContent = component.title;
            description.textContent = component.description;


            /* --------------------------------------------- */
            /* SECTION 5.3 — DISPLAY COMPONENT DETAILS       */
            /* Purpose: Build a safe educational detail list */
            /* --------------------------------------------- */

            const list = document.createElement("ul");

            component.details.forEach(function (detail) {

                if (typeof detail !== "string") {
                    return;
                }

                const listItem = document.createElement("li");

                listItem.textContent = detail;

                list.appendChild(listItem);

            });

            details.replaceChildren(list);


            /* --------------------------------------------- */
            /* SECTION 5.4 — UPDATE STATUS MESSAGE           */
            /* Purpose: Inform the learner of their choice  */
            /* --------------------------------------------- */

            status.textContent = component.title + " selected.";

        }


        /* ================================================= */
        /* SECTION 6 — CONNECT THE BUTTON INTERACTIONS       */
        /* Purpose: Respond to learner selections           */
        /* ================================================= */

        buttons.forEach(function (button) {

            button.addEventListener("click", function () {

                const componentKey = button.dataset.componentKey;

                displayComponent(componentKey, button);

            });

        });


        /* ================================================= */
        /* SECTION 7 — DISPLAY THE INITIAL COMPONENT        */
        /* Purpose: Show useful content when page opens     */
        /* ================================================= */

        const requestedInitialKey = configuration.initialKey;

        const initialKey = components.has(requestedInitialKey)
            ? requestedInitialKey
            : components.keys().next().value;

        const initialButton = Array.from(buttons).find(function (button) {
            return button.dataset.componentKey === initialKey;
        });

        if (initialButton) {

            displayComponent(initialKey, initialButton);

        } else {

            console.warn(
                "IKL Explorer: No button matches the initial component.",
                initialKey
            );

            return false;

        }


        /* ================================================= */
        /* SECTION 8 — MARK THE EXPLORER AS INITIALISED      */
        /* Purpose: Prevent accidental duplicate setup     */
        /* ================================================= */

        explorer.dataset.iklExplorerInitialized = "true";

        return true;

    }


    /* ================================================= */
    /* SECTION 9 — EXPOSE THE SHARED ENGINE              */
    /* Purpose: Allow concept-specific files to use it   */
    /* ================================================= */

    if (window.IKLComponentExplorer) {

        console.warn("IKL Explorer: Shared engine already exists.");

        return;

    }

    window.IKLComponentExplorer = Object.freeze({
        init: initializeExplorer
    });


/* ===================================================== */
/* END OF IKL SHARED COMPONENT EXPLORER ENGINE           */
/* ===================================================== */

})();
