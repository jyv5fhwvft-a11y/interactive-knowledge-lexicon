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

    // 1. Read what the visitor typed

    const searchTerm = searchInput.value.trim().toLowerCase();

    // 2. Clear previous search results

    searchResults.innerHTML = "";

    // 3. Check whether the search box is empty

    if (searchTerm === "") {

        searchResults.textContent = "Please enter a concept to search.";

        return;
    }

    // 4. Find concepts matching the search term

    const matchingConcepts = concepts.filter(function(concept) {

        return (
            concept.name.toLowerCase().includes(searchTerm) ||
            concept.category.toLowerCase().includes(searchTerm) ||
            concept.description.toLowerCase().includes(searchTerm)
        );

    });

    // 5. Display a message if nothing matches

    if (matchingConcepts.length === 0) {

        searchResults.textContent = "No concepts found. Try another search.";

        return;
    }

    // 6. Display every matching concept

    matchingConcepts.forEach(function(concept) {

        const resultCard = document.createElement("div");

        resultCard.className = "result-card";

        const title = document.createElement("h3");

        title.textContent = concept.name;

        const category = document.createElement("p");

        category.textContent = "Category: " + concept.category;

        const description = document.createElement("p");

        description.textContent = concept.description;

        resultCard.appendChild(title);

        resultCard.appendChild(category);

        resultCard.appendChild(description);

        searchResults.appendChild(resultCard);

    });

}

// ==================================
// ACTIVATE THE SEARCH BUTTON
// ==================================

searchButton.addEventListener("click", searchConcepts);

// Allow visitors to search by pressing Enter

searchInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        searchConcepts();

    }

});



