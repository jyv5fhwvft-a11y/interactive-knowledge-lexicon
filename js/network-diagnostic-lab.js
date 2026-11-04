/* ========================================== */
/* SECTION 12.6 — NETWORK DIAGNOSTIC LAB */
/* ========================================== */

(function initializeNetworkDiagnosticLab() {
    const lab = document.getElementById("network-diagnostic-lab");

    if (!lab) {
        return;
    }

    const buttons = lab.querySelectorAll(".diagnostic-test-button");

    const testNumber = document.getElementById("diagnostic-test-number");
    const testTitle = document.getElementById("diagnostic-test-title");
    const testDescription = document.getElementById("diagnostic-test-description");
    const testOutput = document.getElementById("diagnostic-test-output");
    const testMeaning = document.getElementById("diagnostic-test-meaning");
    const testTakeaway = document.getElementById("diagnostic-test-takeaway");
    const labStatus = document.getElementById("diagnostic-lab-status");

    if (
        !testNumber ||
        !testTitle ||
        !testDescription ||
        !testOutput ||
        !testMeaning ||
        !testTakeaway ||
        !labStatus
    ) {
        return;
    }

    const diagnosticTests = {
        loopback: {
            number: "Test 1 of 5",
            title: "Testing the Local Computer",
            description:
                "Alex tests the computer's own local TCP/IP networking software.",
            output:
                "Command: ping 127.0.0.1\n\n" +
                "Reply from 127.0.0.1: bytes=32 time<1ms TTL=128\n" +
                "Reply from 127.0.0.1: bytes=32 time<1ms TTL=128\n\n" +
                "Packets: Sent = 2, Received = 2, Lost = 0",
            meaning:
                "The local loopback test receives replies. This suggests that the computer's local TCP/IP networking software is responding.",
            takeaway:
                "A successful loopback test does not prove that Wi-Fi, Ethernet, the router, or the internet connection is working."
        },

        gateway: {
            number: "Test 2 of 5",
            title: "Testing the Local Gateway",
            description:
                "Alex now checks communication with the example local gateway address.",
            output:
                "Command: ping 192.168.1.1\n\n" +
                "Reply from 192.168.1.1: bytes=32 time=2ms TTL=64\n" +
                "Reply from 192.168.1.1: bytes=32 time=3ms TTL=64\n\n" +
                "Packets: Sent = 2, Received = 2, Lost = 0",
            meaning:
                "The gateway responds to the example Ping requests. This suggests that Alex's computer can communicate with its local gateway.",
            takeaway:
                "A gateway reply does not prove that the wider internet or every external destination is reachable."
        },

        external: {
            number: "Test 3 of 5",
            title: "Testing an External IP Address",
            description:
                "Alex tests an external destination using its IP address, without first needing to resolve a hostname.",
            output:
                "Command: ping 8.8.8.8\n\n" +
                "Reply from 8.8.8.8: bytes=32 time=24ms TTL=117\n" +
                "Reply from 8.8.8.8: bytes=32 time=26ms TTL=117\n\n" +
                "Packets: Sent = 2, Received = 2, Lost = 0",
            meaning:
                "The external destination responds. This suggests that IP communication with this particular destination is working for these tests.",
            takeaway:
                "A successful external Ping does not guarantee that DNS or a website's application is working."
        },

        dns: {
            number: "Test 4 of 5",
            title: "Testing Hostname Resolution",
            description:
                "Alex checks whether the hostname google.com can be resolved into an IP address.",
            output:
                "Command: nslookup google.com\n\n" +
                "Name:    google.com\n" +
                "Address: 142.250.72.14\n\n" +
                "Example DNS lookup: Successful",
            meaning:
                "The example DNS lookup returns an IP address for the hostname. This suggests that name resolution is working for this lookup.",
            takeaway:
                "Successful DNS resolution does not guarantee that the website's web service is available."
        },

        website: {
            number: "Test 5 of 5",
            title: "Testing the Actual Website",
            description:
                "Alex finally checks whether the website itself can be opened.",
            output:
                "Example browser result:\n\n" +
                "Website unavailable\n" +
                "The web service did not provide a usable response.\n\n" +
                "Example investigation result: Failed",
            meaning:
                "The earlier example tests succeeded, but the website is still unavailable. The problem may involve the web server, application, HTTPS service, or another part of the website connection.",
            takeaway:
                "Ping tests ICMP communication. Testing the actual website or application is necessary to investigate whether that service works."
        }
    };

    function showDiagnosticTest(testName) {
        const test = diagnosticTests[testName];

        if (!test) {
            return;
        }

        testNumber.textContent = test.number;
        testTitle.textContent = test.title;
        testDescription.textContent = test.description;
        testOutput.textContent = test.output;
        testMeaning.textContent = test.meaning;
        testTakeaway.textContent = test.takeaway;

        buttons.forEach(function (button) {
            const isActive = button.dataset.diagnosticTest === testName;

            button.classList.toggle("active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });

        labStatus.textContent = test.number + ": " + test.title + " selected.";
    }

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            showDiagnosticTest(button.dataset.diagnosticTest);
        });

        button.setAttribute("aria-pressed", "false");
    });

    labStatus.textContent =
        "Network Diagnostic Lab ready. Select a test to begin.";

})();

/* END SECTION 12.6 — NETWORK DIAGNOSTIC LAB */
