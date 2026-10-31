// ==========================================
// INTERACTIVE KNOWLEDGE LEXICON
// PING SEQUENCE DIAGRAM
// ==========================================


// Find the sequence diagram elements

const message1 = document.getElementById("sequence-message-1");

const message2 = document.getElementById("sequence-message-2");

const previousButton = document.getElementById("previousSequenceMessage");

const nextButton = document.getElementById("nextSequenceMessage");

const stepCounter = document.getElementById("sequence-step-counter");


// Check that all required elements exist

if (
    message1 &&
    message2 &&
    previousButton &&
    nextButton &&
    stepCounter
) {

    // Track which message is currently displayed

    let currentMessage = 1;


    // Display the correct message

    function showSequenceMessage() {

        // Show only the selected message

        message1.hidden = currentMessage !== 1;

        message2.hidden = currentMessage !== 2;


        // Update the message counter

        stepCounter.textContent =
            "Message " + currentMessage + " of 2";


        // Control button availability

        previousButton.disabled = currentMessage === 1;

        nextButton.disabled = currentMessage === 2;

    }


    // Previous Message button

    previousButton.addEventListener("click", function() {

        if (currentMessage > 1) {

            currentMessage--;

            showSequenceMessage();

        }

    });


    // Next Message button

    nextButton.addEventListener("click", function() {

        if (currentMessage < 2) {

            currentMessage++;

            showSequenceMessage();

        }

    });


    // Set the initial display

    showSequenceMessage();

}
