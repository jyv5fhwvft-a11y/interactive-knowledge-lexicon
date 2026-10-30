
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
// FIRST VISIBLE JAVASCRIPT TEST
// ==================================

const testMessage = document.createElement("p");

testMessage.textContent =
    "JavaScript is running successfully!";

testMessage.style.backgroundColor = "#e0f2fe";
testMessage.style.color = "#173b67";
testMessage.style.padding = "15px";
testMessage.style.textAlign = "center";
testMessage.style.fontWeight = "bold";

document.querySelector("footer").before(testMessage);


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

        const resultCard = document.createElement("div");

        resultCard.className = "result-card";

        // Create the concept name

        const title = document.createElement("h3");

        // Make the title clickable if a page exists

        if (concept.page !== null) {

            const conceptLink = document.createElement("a");

            conceptLink.href = concept.page;

            conceptLink.textContent = concept.name;

            title.appendChild(conceptLink);

        } else {

            title.textContent = concept.name;

        }

        // Display the category

        const category = document.createElement("p");

        category.textContent = "Category: " + concept.category;

        // Display the description

        const description = document.createElement("p");

        description.textContent = concept.description;

        // Assemble the result card

        resultCard.appendChild(title);

        resultCard.appendChild(category);

        resultCard.appendChild(description);

        // Add the card to the search results

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
