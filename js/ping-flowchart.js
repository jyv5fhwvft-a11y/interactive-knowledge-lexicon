
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


// ==========================================
// TRACK THE CURRENT FLOWCHART STEP
// ==========================================

// The first stage has index 0.

let currentFlowStep = 0;


// ==========================================
// DISPLAY THE CURRENT FLOWCHART STEP
// ==========================================

function displayFlowStep() {

    // Get the selected stage from the array.

    const step = flowchartSteps[currentFlowStep];


    // Display the stage title and explanation.

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


    // Update the explanation area.

    flowchartDescription.textContent = step.description;


    // Disable Previous Step at the beginning.

    previousFlowButton.disabled = (currentFlowStep === 0);


    // Disable Next Step at the end.

    nextFlowButton.disabled =
        (currentFlowStep === flowchartSteps.length - 1);

}


// ==========================================
// NEXT STEP BUTTON
// ==========================================

nextFlowButton.addEventListener("click", function() {

    if (currentFlowStep < flowchartSteps.length - 1) {

        currentFlowStep++;

        displayFlowStep();

    }

});


// ==========================================
// PREVIOUS STEP BUTTON
// ==========================================

previousFlowButton.addEventListener("click", function() {

    if (currentFlowStep > 0) {

        currentFlowStep--;

        displayFlowStep();

    }

});


// ==========================================
// INITIALIZE THE FLOWCHART
// ==========================================

displayFlowStep();







