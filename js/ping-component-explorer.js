/* ========================================= */
/* SECTION 6.1 — INTERACTIVE COMPONENT EXPLORER */
/* ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const explorer = document.getElementById("ping-component-explorer");

    if (!explorer) return;

    const buttons = explorer.querySelectorAll(".ping-component-button");

    const label = document.getElementById("ping-component-label");
    const title = document.getElementById("ping-component-title");
    const description = document.getElementById("ping-component-description");
    const details = document.getElementById("ping-component-details");
    const status = document.getElementById("ping-component-status");

    const components = {

        source: {
            label: "Component 01",
            title: "Source Computer",
            description: "The source computer begins the Ping test.",
            details: [
                "Runs the Ping command.",
                "Identifies the destination IP address.",
                "Creates an ICMP Echo Request.",
                "Waits for a possible Echo Reply.",
                "Measures the Round-Trip Time (RTT)."
            ]
        },

        destination: {
            label: "Component 02",
            title: "Destination Computer",
            description: "The destination is the device that the source wants to test.",
            details: [
                "Receives the incoming IP packet.",
                "Checks and processes the ICMP Echo Request if permitted.",
                "May generate an ICMP Echo Reply.",
                "Sends the reply toward the source computer."
            ]
        },

        ip: {
            label: "Component 03",
            title: "IP Layer",
            description: "IP provides addressing and carries the ICMP message inside an IP packet.",
            details: [
                "Uses source and destination IP addresses.",
                "Encapsulates the ICMP message inside an IP packet.",
                "Supports delivery across interconnected networks.",
                "Helps packets travel toward their destination."
            ]
        },

        icmp: {
            label: "Component 04",
            title: "ICMP",
            description: "ICMP is the protocol that defines the diagnostic messages used by Ping.",
            details: [
                "Stands for Internet Control Message Protocol.",
                "Defines the Echo Request message.",
                "Defines the Echo Reply message.",
                "Supports network diagnostics and error reporting.",
                "Does not use TCP or UDP ports."
            ]
        },

        routers: {
            label: "Component 05",
            title: "Routers",
            description: "Routers forward IP packets between networks when necessary.",
            details: [
                "Examine destination IP addresses.",
                "Use routing information to select the next hop.",
                "Forward packets toward their destinations.",
                "Do not normally generate the Echo Reply for a packet they simply forward."
            ]
        },

        transmission: {
            label: "Component 06",
            title: "Network Transmission",
            description: "Network transmission carries data through wired or wireless connections.",
            details: [
                "Ethernet cables can carry network data.",
                "Wi-Fi can carry network data wirelessly.",
                "Network links connect devices and routers.",
                "Transmission conditions can affect response time."
            ]
        },

        echo: {
            label: "Component 07",
            title: "Echo Request and Echo Reply",
            description: "These are the two ICMP message types central to a typical Ping test.",
            details: [
                "Echo Request begins the test.",
                "Echo Reply is the possible response.",
                "The source matches the reply with its request.",
                "The source uses the elapsed time to calculate RTT."
            ]
        }

    };

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            const componentKey = button.dataset.component;
            const component = components[componentKey];

            if (!component) return;

            buttons.forEach(function (item) {
                item.classList.remove("is-selected");
                item.setAttribute("aria-pressed", "false");
            });

            button.classList.add("is-selected");
            button.setAttribute("aria-pressed", "true");

            label.textContent = component.label;
            title.textContent = component.title;
            description.textContent = component.description;

            const list = document.createElement("ul");

            component.details.forEach(function (detail) {
                const listItem = document.createElement("li");
                listItem.textContent = detail;
                list.appendChild(listItem);
            });

            details.replaceChildren(list);

            status.textContent = component.title + " selected.";

        });

    });

});

/* END SECTION 6.1 — INTERACTIVE COMPONENT EXPLORER */
