/* =========================================
   SECTION 4 — INTERACTIVE PING RESULT EXPLORER
   ========================================= */

(function () {
    const container = document.getElementById("ping-result-explorer");

    if (!container) {
        return;
    }

    const buttons = container.querySelectorAll(".ping-result-button");

    const label = document.getElementById("ping-result-label");
    const title = document.getElementById("ping-result-title");
    const description = document.getElementById("ping-result-description");
    const extra = document.getElementById("ping-result-extra");
    const status = document.getElementById("ping-result-status");
    const explanation = document.getElementById("ping-result-explanation");

    if (!label || !title || !description || !extra || !status || !explanation) {
        return;
    }

    const results = {
        success: {
            label: "SUCCESSFUL RESPONSE",
            title: "The Destination Responded!",
            description:
                "Your computer sent an ICMP Echo Request and received " +
                "a matching ICMP Echo Reply. This shows that the " +
                "destination responded to this Ping test.",
            points: [
                "A response successfully returned to the source computer.",
                "The Ping test can report the Round-Trip Time (RTT).",
                "This does not guarantee that every application or service on the destination is working."
            ],
            status: "You explored a successful Ping response."
        },

        failure: {
            label: "NO RESPONSE RECEIVED",
            title: "Why Might There Be No Reply?",
            description:
                "Your computer did not receive a Ping reply within " +
                "the expected time. This does not automatically mean " +
                "that the destination computer is switched off.",
            points: [
                "The destination device may be unavailable.",
                "A network connection or routing problem may prevent communication.",
                "A firewall or security setting may block Ping messages.",
                "The reply may take longer than the allowed waiting time."
            ],
            status: "You explored possible reasons for a missing Ping reply."
        }
    };

    function selectResult(resultType) {
        const result = results[resultType];

        if (!result) {
            return;
        }

        buttons.forEach(function (button) {
            const isSelected = button.dataset.result === resultType;

            button.classList.toggle("is-selected", isSelected);
            button.setAttribute("aria-pressed", String(isSelected));
        });

        label.textContent = result.label;
        title.textContent = result.title;
        description.textContent = result.description;

        extra.replaceChildren();

        const list = document.createElement("ul");

        result.points.forEach(function (point) {
            const item = document.createElement("li");
            item.textContent = point;
            list.appendChild(item);
        });

        extra.appendChild(list);

        explanation.style.borderLeftColor =
            resultType === "success" ? "#22C55E" : "#F59E0B";

        status.textContent = result.status;
    }

    buttons.forEach(function (button) {
        button.setAttribute("aria-pressed", "false");

        button.addEventListener("click", function () {
            selectResult(button.dataset.result);
        });
    });

    status.textContent = "Ready to explore.";

})();
