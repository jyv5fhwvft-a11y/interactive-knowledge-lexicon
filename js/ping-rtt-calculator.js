/* =========================================
   SECTION 5 — INTERACTIVE RTT CALCULATOR
   ========================================= */

(function () {
    const container = document.getElementById("rtt-calculation-lab");

    if (!container) {
        return;
    }

    const requestInput = document.getElementById("rtt-request-time");
    const replyInput = document.getElementById("rtt-reply-time");
    const calculateButton = document.getElementById("rtt-calculate-button");

    const resultLabel = document.getElementById("rtt-result-label");
    const resultValue = document.getElementById("rtt-result-value");
    const resultExplanation = document.getElementById("rtt-result-explanation");
    const status = document.getElementById("rtt-calculation-status");

    if (
        !requestInput ||
        !replyInput ||
        !calculateButton ||
        !resultLabel ||
        !resultValue ||
        !resultExplanation ||
        !status
    ) {
        return;
    }

    function calculateRTT() {
        const requestTime = Number(requestInput.value);
        const replyTime = Number(replyInput.value);

        if (
            requestInput.value.trim() === "" ||
            replyInput.value.trim() === "" ||
            !Number.isFinite(requestTime) ||
            !Number.isFinite(replyTime) ||
            requestTime < 0 ||
            replyTime < 0
        ) {
            showError("Enter valid, non-negative time values in both fields.");
            return;
        }

        if (replyTime < requestTime) {
            showError(
                "The reply cannot arrive before the request is sent. " +
                "Please adjust the values."
            );
            return;
        }

        const rtt = replyTime - requestTime;

        resultLabel.textContent = "CALCULATION SUCCESSFUL";
        resultValue.textContent = rtt + " ms";

        resultExplanation.textContent =
            "The reply arrived " + rtt +
            " milliseconds after the request was sent. " +
            "RTT = " + replyTime + " − " + requestTime +
            " = " + rtt + " ms.";

        status.textContent = "RTT calculated successfully.";
        resultLabel.style.color = "#166534";
        resultValue.style.color = "#166534";

        container.querySelector(".rtt-calculation-result")
            .style.borderLeftColor = "#22C55E";
    }

    function showError(message) {
        resultLabel.textContent = "CHECK YOUR INPUT";
        resultValue.textContent = "—";
        resultExplanation.textContent = message;

        status.textContent = "Calculation could not be completed.";

        resultLabel.style.color = "#B45309";
        resultValue.style.color = "#B45309";

        container.querySelector(".rtt-calculation-result")
            .style.borderLeftColor = "#F59E0B";
    }

    calculateButton.addEventListener("click", calculateRTT);

    status.textContent = "Change the values and calculate again.";

})();
