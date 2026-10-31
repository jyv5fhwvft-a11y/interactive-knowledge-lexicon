
// ==========================================
// INTERACTIVE KNOWLEDGE LEXICON
// SECTION 9: PING INTERACTIVE FLOWCHART
// ==========================================


// Define the eight stages of the Ping process

const flowchartSteps = [

    {
        title: "START",
        description: "The user starts a Ping command to test communication with another device."
    },

    {
        title: "IDENTIFY DESTINATION",
        description: "The source computer identifies the destination IP address. DNS may help if a hostname is used."
    },

    {
        title: "CREATE ECHO REQUEST",
        description: "The operating system prepares an ICMP Echo Request message."
    },

    {
        title: "SEND REQUEST",
        description: "IP carries the ICMP Echo Request inside an IP packet toward the destination."
    },

    {
        title: "DESTINATION RECEIVES REQUEST",
        description: "The destination computer receives and processes the incoming request if it is permitted."
    },

    {
        title: "DECISION: DID A REPLY ARRIVE?",
        description: "The source waits for a response. Did an ICMP Echo Reply arrive before the timeout?"
    },

    {
        title: "SUCCESS",
        description: "An Echo Reply arrived. The source can calculate and display the Round-Trip Time (RTT)."
    },

    {
        title: "TIMEOUT",
        description: "No Echo Reply arrived within the allowed waiting time. Ping reports a timeout."
    }

];


// ==========================================
// CONNECT HTML ELEMENTS TO JAVASCRIPT
// ==========================================

const flowchartVisual = document.getElementById("flowchart-visual");

const flowchartCounter = document.getElementById("flowchart-step-counter");

const flowchartDescription = document.getElementById("flowchart-description");

const previousFlowButton = document.getElementById("previousFlowStep");

const nextFlowButton = document.getElementById("nextFlowStep");

const flowchartDecision = document.getElementById("flowchart-decision");

const replyReceivedButton = document.getElementById("replyReceived");

const replyTimeoutButton = document.getElementById("replyTimeout");


// ==========================================
// TRACK THE CURRENT FLOWCHART STEP
// ==========================================

let currentFlowStep = 0;


// ==========================================
// DISPLAY THE CURRENT FLOWCHART STEP
// ==========================================

function displayFlowStep() {

    const step = flowchartSteps[currentFlowStep];

    // Display the current flowchart node.

    flowchartVisual.innerHTML = "";

    const node = document.createElement("div");

    node.className = "flowchart-node active";

    const heading = document.createElement("h4");

    heading.textContent = step.title;

    const explanation = document.createElement("p");

    explanation.textContent = step.description;

    node.appendChild(heading);

    node.appendChild(explanation);

    flowchartVisual.appendChild(node);


    // Update the step counter.

    flowchartCounter.textContent =
        "Step " + (currentFlowStep + 1) +
        " of " + flowchartSteps.length;


    // Update the explanation.

    flowchartDescription.textContent = step.description;


    // Show decision options only at Stage 6.

    flowchartDecision.hidden = (currentFlowStep !== 5);


    // Disable Previous Step at the beginning.

    previousFlowButton.disabled = (currentFlowStep === 0);


    // Disable Next Step at the decision and outcome stages.

    nextFlowButton.disabled = (currentFlowStep >= 5);

}


// ==========================================
// NEXT STEP BUTTON
// ==========================================

nextFlowButton.addEventListener("click", function() {

    if (currentFlowStep < 5) {

        currentFlowStep++;

        displayFlowStep();

    }

});


// ==========================================
// PREVIOUS STEP BUTTON
// ==========================================

previousFlowButton.addEventListener("click", function() {

    if (currentFlowStep === 6 || currentFlowStep === 7) {

        // Return from either outcome to the decision.

        currentFlowStep = 5;

    } else if (currentFlowStep > 0) {

        currentFlowStep--;

    }

    displayFlowStep();

});


// ==========================================
// YES: REPLY RECEIVED
// ==========================================

replyReceivedButton.addEventListener("click", function() {

    currentFlowStep = 6;

    displayFlowStep();

});


// ==========================================
// NO: TIMEOUT
// ==========================================

replyTimeoutButton.addEventListener("click", function() {

    currentFlowStep = 7;

    displayFlowStep();

});


// ==========================================
// INITIALIZE THE FLOWCHART
// ==========================================

displayFlowStep();
