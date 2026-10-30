
// ==========================================
// INTERACTIVE KNOWLEDGE LEXICON
// PING SIMULATION
// ==========================================

// Find the simulation elements on the page

const sendPingButton = document.getElementById("sendPingButton");

const pingStatus = document.getElementById("ping-status");


// Check that the required elements exist

if (sendPingButton && pingStatus) {

    // Prevent repeated clicks while simulation is running

    let simulationRunning = false;


    // Start the Ping simulation when the button is clicked

    sendPingButton.addEventListener("click", function() {

        if (simulationRunning) {
            return;
        }

        simulationRunning = true;

        sendPingButton.disabled = true;


        // Stage 1: Prepare the request

        pingStatus.textContent =
            "Step 1: Computer A is preparing an ICMP Echo Request.";


        // Stage 2: Send the request

        setTimeout(function() {

            pingStatus.textContent =
                "Step 2: The Echo Request is travelling through the network.";


        // Stage 3: Destination receives the request

        setTimeout(function() {

            pingStatus.textContent =
                "Step 3: Computer B has received the Echo Request.";


        // Stage 4: Destination prepares the reply

        setTimeout(function() {

            pingStatus.textContent =
                "Step 4: Computer B is preparing an ICMP Echo Reply.";


        // Stage 5: Reply travels back

        setTimeout(function() {

            pingStatus.textContent =
                "Step 5: The Echo Reply is travelling back to Computer A.";


        // Stage 6: Source receives the reply

        setTimeout(function() {

            pingStatus.textContent =
                "Step 6: Computer A received the Echo Reply successfully!";


        // Display simulated result

        setTimeout(function() {

            pingStatus.textContent =
                "Ping successful! Simulated round-trip time: 25 ms.";

            sendPingButton.disabled = false;

            simulationRunning = false;

        }, 1500);

        }, 1500);

        }, 1500);

        }, 1500);

        }, 1500);

        }, 1500);

    });

}
