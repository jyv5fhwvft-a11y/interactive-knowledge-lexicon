// ==================================
// INTERACTIVE KNOWLEDGE LEXICON
// First JavaScript Program
// ==================================

// 1. Display a message in the browser console

console.log("Welcome to the Interactive Knowledge Lexicon!");

// 2. Create our first variable

let projectName = "Interactive Knowledge Lexicon";

// 3. Display the project name

console.log(projectName);

// 4. Create a simple learning message

let learningMessage = "Explore. Understand. Experiment.";

console.log(learningMessage);

// ==================================
// FIRST VISIBLE JAVASCRIPT TEST
// ==================================

// 1. Create a new paragraph

const testMessage = document.createElement("p");

// 2. Give the paragraph a message

testMessage.textContent =
    "JavaScript is running successfully!";

// 3. Give the message some basic styling

testMessage.style.backgroundColor = "#e0f2fe";
testMessage.style.color = "#173b67";
testMessage.style.padding = "15px";
testMessage.style.textAlign = "center";
testMessage.style.fontWeight = "bold";

// 4. Insert the message above the footer

document.querySelector("footer").before(testMessage);

// ==================================
// KNOWLEDGE LEXICON
// OUR FIRST CONCEPT COLLECTION
// ==================================

const concepts = [

    {
        name: "Ping",
        category: "Computer Networking",
        description: "A tool used to test communication between devices."
    },

    {
        name: "Virtual Memory",
        category: "Operating Systems",
        description: "A memory management technique that gives processes a virtual address space."
    },

    {
        name: "Paging",
        category: "Operating Systems",
        description: "A memory management technique that divides memory into fixed-size blocks."
    },

    {
        name: "API",
        category: "Software Development",
        description: "A way for software applications to communicate with each other."
    },

    {
        name: "Encryption",
        category: "Cybersecurity",
        description: "A technique used to protect information by converting it into unreadable form."
    }

];

