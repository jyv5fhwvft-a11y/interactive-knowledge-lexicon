// ==========================================
// INTERACTIVE KNOWLEDGE LEXICON
// PING SIMULATION — SECTION 8
// ==========================================

(function () {
    function initializePingSimulation() {
        const sendPingButton = document.getElementById("sendPingButton");
        const pingStatus = document.getElementById("ping-status");
        const destinationInput = document.getElementById("ping-destination-input");
        const networkCondition = document.getElementById("ping-network-condition");
        const terminalOutput = document.getElementById("ping-terminal-output");

        // Stop safely if this page does not contain the simulator.
        if (
            !sendPingButton ||
            !pingStatus ||
            !destinationInput ||
            !networkCondition ||
            !terminalOutput
        ) {
            return;
        }

        let simulationRunning = false;

        const wait = (milliseconds) =>
            new Promise((resolve) => setTimeout(resolve, milliseconds));

        function isValidIPv4(address) {
            const parts = address.split(".");

            if (parts.length !== 4) {
                return false;
            }

            return parts.every((part) => {
                if (!/^\d{1,3}$/.test(part)) {
                    return false;
                }

                const number = Number(part);

                return number >= 0 && number <= 255;
            });
        }

        function addTerminalLine(lines, message) {
            lines.push(message);
            terminalOutput.textContent = lines.join("\n");
        }

        function getProbeResult(condition, probeIndex) {
            const responseTimes = {
                normal: [24, 25, 27, 24],
                slow: [176, 192, 181, 185],
                "packet-loss": [25, 0, 40, 0],
                unavailable: [0, 0, 0, 0]
            };

            const time = responseTimes[condition][probeIndex];

            return {
                received: time > 0,
                time: time
            };
        }

        async function runSimulation() {
            if (simulationRunning) {
                return;
            }

            const destination = destinationInput.value.trim();
            const condition = networkCondition.value;

            if (!isValidIPv4(destination)) {
                pingStatus.textContent =
                    "Please enter a valid IPv4 address, such as 8.8.8.8.";

                terminalOutput.textContent =
                    "SIMULATION ONLY — no real network packets are sent.\n\n" +
                    "Error: The destination must be a valid IPv4 address.";

                return;
            }

            simulationRunning = true;
            sendPingButton.disabled = true;

            const lines = [
                "SIMULATION ONLY — no real network packets are sent.",
                "",
                "Pinging " + destination + " with 32 bytes of data:",
                ""
            ];

            terminalOutput.textContent = lines.join("\n");

            const receivedTimes = [];
            const totalProbes = 4;

            try {
                for (let index = 0; index < totalProbes; index++) {
                    const probeNumber = index + 1;

                    pingStatus.textContent =
                        "Probe " + probeNumber + " of 4: Computer A is preparing an ICMP Echo Request.";

                    await wait(450);

                    pingStatus.textContent =
                        "Probe " + probeNumber + " of 4: The request is travelling through the network.";

                    await wait(450);

                    const result = getProbeResult(condition, index);

                    if (result.received) {
                        pingStatus.textContent =
                            "Probe " + probeNumber + " of 4: The destination replied. The Echo Reply is returning to Computer A.";

                        await wait(450);

                        addTerminalLine(
                            lines,
                            "Reply from " + destination +
                            ": bytes=32 time=" + result.time + "ms TTL=117"
                        );

                        receivedTimes.push(result.time);
                    } else {
                        pingStatus.textContent =
                            "Probe " + probeNumber + " of 4: No reply arrived before the simulated timeout.";

                        await wait(450);

                        addTerminalLine(lines, "Request timed out.");
                    }
                }

                const receivedCount = receivedTimes.length;
                const lostCount = totalProbes - receivedCount;
                const lossPercentage = (lostCount / totalProbes) * 100;

                addTerminalLine(lines, "");
                addTerminalLine(lines, "Ping statistics for " + destination + ":");
                addTerminalLine(
                    lines,
                    "    Packets: Sent = " + totalProbes +
                    ", Received = " + receivedCount +
                    ", Lost = " + lostCount +
                    " (" + lossPercentage + "% loss)"
                );

                if (receivedCount > 0) {
                    const minimum = Math.min(...receivedTimes);
                    const maximum = Math.max(...receivedTimes);
                    const average = Math.round(
                        receivedTimes.reduce((sum, time) => sum + time, 0) /
                        receivedCount
                    );

                    addTerminalLine(lines, "");
                    addTerminalLine(
                        lines,
                        "Approximate round trip times in milli-seconds:"
                    );
                    addTerminalLine(
                        lines,
                        "    Minimum = " + minimum +
                        "ms, Maximum = " + maximum +
                        "ms, Average = " + average + "ms"
                    );
                }

                if (condition === "unavailable") {
                    pingStatus.textContent =
                        "Simulation complete: no replies were received. This does not prove that a real device is switched off.";
                } else if (condition === "packet-loss") {
                    pingStatus.textContent =
                        "Simulation complete: some probes received replies and some were lost. Packet loss can make communication unreliable.";
                } else if (condition === "slow") {
                    pingStatus.textContent =
                        "Simulation complete: all probes received replies, but the higher RTT values show a slower response.";
                } else {
                    pingStatus.textContent =
                        "Simulation complete: all four probes received replies with low simulated response times.";
                }

                addTerminalLine(lines, "");
                addTerminalLine(
                    lines,
                    "End of simulated Ping experiment."
                );

            } finally {
                sendPingButton.disabled = false;
                simulationRunning = false;
            }
        }

        sendPingButton.addEventListener("click", runSimulation);

        terminalOutput.setAttribute("aria-live", "polite");
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializePingSimulation);
    } else {
        initializePingSimulation();
    }
})();
