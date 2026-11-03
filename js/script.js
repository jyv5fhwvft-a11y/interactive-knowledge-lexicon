
// ==================================
// INTERACTIVE KNOWLEDGE LEXICON
// FIRST JAVASCRIPT PROGRAM
// ==================================

console.log("Welcome to the Interactive Knowledge Lexicon!");

let projectName = "Interactive Knowledge Lexicon";

console.log(projectName);

let learningMessage = "Explore. Understand. Experiment.";

console.log(learningMessage);





// ==================================
// KNOWLEDGE LEXICON
// OUR FIRST CONCEPT COLLECTION
// ==================================

const concepts = [

    {
        name: "Ping",
        category: "Computer Networking",
        description: "A tool used to test communication between devices.",
        page: "concepts/ping.html"
    },

    {
        name: "Virtual Memory",
        category: "Operating Systems",
        description: "A memory management technique that gives processes a virtual address space.",
        page: null
    },

    {
        name: "Paging",
        category: "Operating Systems",
        description: "A memory management technique that divides memory into fixed-size blocks.",
        page: null
    },

    {
        name: "API",
        category: "Software Development",
        description: "A way for software applications to communicate with each other.",
        page: null
    },

    {
        name: "Encryption",
        category: "Cybersecurity",
        description: "A technique used to protect information by converting it into unreadable form.",
        page: null
    }

];


// ==================================
// CONNECT SEARCH HTML ELEMENTS
// ==================================

const searchInput = document.getElementById("conceptSearch");

const searchButton = document.getElementById("searchButton");

const searchResults = document.getElementById("searchResults");


// ==================================
// SEARCH THE KNOWLEDGE LEXICON
// ==================================

function searchConcepts() {

    // 1. Read the visitor's search term

    const searchTerm = searchInput.value.trim().toLowerCase();

    // 2. Clear previous results

    searchResults.innerHTML = "";

    // 3. Check whether the search box is empty

    if (searchTerm === "") {

        searchResults.textContent = "Please enter a concept to search.";

        return;
    }

    // 4. Find matching concepts

    const matchingConcepts = concepts.filter(function(concept) {

        return (
            concept.name.toLowerCase().includes(searchTerm) ||
            concept.category.toLowerCase().includes(searchTerm) ||
            concept.description.toLowerCase().includes(searchTerm)
        );

    });

    // 5. Display a message if no concepts match

    if (matchingConcepts.length === 0) {

        searchResults.textContent = "No concepts found. Try another search.";

        return;
    }

    // 6. Display matching concepts

    matchingConcepts.forEach(function(concept) {

    // Create the main concept card

    const resultCard = document.createElement("div");

    resultCard.className = "result-card";

    // Create the category label

    const category = document.createElement("span");

    category.className = "result-category";

    category.textContent = concept.category;

    resultCard.appendChild(category);

    // Create the concept title

    const title = document.createElement("h3");

    title.className = "result-title";

    // Create a clickable link when a lesson page exists

    if (concept.page !== null) {

        const conceptLink = document.createElement("a");

        conceptLink.href = concept.page;

        conceptLink.textContent = concept.name;

        conceptLink.className = "result-title-link";

        title.appendChild(conceptLink);

    } else {

        title.textContent = concept.name;

    }

    resultCard.appendChild(title);

    // Create the concept description

    const description = document.createElement("p");

    description.className = "result-description";

    description.textContent = concept.description;

    resultCard.appendChild(description);

        // Create a clear button to open the concept lesson
    if (concept.page !== null) {
        const action = document.createElement("a");
        action.className = "result-action";
        action.href = concept.page;
        action.textContent = "Open " + concept.name + " Lesson →";
        resultCard.appendChild(action);
    }

   

    // Add the completed card to the search results

    searchResults.appendChild(resultCard);

});
  
}


// ==================================
// ACTIVATE THE SEARCH BUTTON
// ==================================

if (searchButton && searchInput && searchResults) {

    // Activate search when the visitor taps the button

    searchButton.addEventListener("click", searchConcepts);


    // Allow visitors to search by pressing Enter

    searchInput.addEventListener("keydown", function(event) {

        if (event.key === "Enter") {

            searchConcepts();

        }

    });

}


// ==================================
// PING INTERACTIVE SIMULATION
// ==================================

const sendPingButton = document.getElementById("sendPingButton");

const pingStatus = document.getElementById("ping-status");


// Activate the Ping button when it exists

if (sendPingButton && pingStatus) {

    sendPingButton.addEventListener("click", function() {

        pingStatus.textContent = "Ping simulation started!";

    });

}
