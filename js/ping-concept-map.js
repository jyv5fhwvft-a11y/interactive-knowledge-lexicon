/* ========================================== */
/* SECTION 13.9 — INTERACTIVE CONCEPT MAP */
/* ========================================== */

(function initializePingConceptMap() {

    const conceptMap = document.getElementById("ping-concept-map");

    if (!conceptMap) {
        return;
    }

    const buttons = conceptMap.querySelectorAll(".concept-map-button");

    const label = document.getElementById("concept-map-label");
    const title = document.getElementById("concept-map-title");
    const description = document.getElementById("concept-map-description");
    const connection = document.getElementById("concept-map-connection");
    const example = document.getElementById("concept-map-example");
    const takeaway = document.getElementById("concept-map-takeaway");
    const status = document.getElementById("concept-map-status");

    const concepts = {

        ip: {
            title: "IP Addresses",
            description:
                "An IP address is a numerical address used to identify a device's network interface so that data can be directed to it.",

            connection:
                "Ping uses an IP address to identify the destination. If you enter a hostname instead, the computer normally uses DNS to find an IP address first.",

            example:
                "When you run ping 8.8.8.8, Ping sends an ICMP Echo Request toward the destination IP address 8.8.8.8.",

            takeaway:
                "A successful Ping shows that the destination IP address responded to an ICMP request. It does not prove that every service on that device is working."
        },

        dns: {
            title: "DNS",
            description:
                "The Domain Name System (DNS) helps translate human-readable domain names into information such as IP addresses.",

            connection:
                "When you run Ping using a hostname, such as google.com, your computer generally needs to resolve that hostname before sending the request.",

            example:
                "You enter ping google.com. DNS provides an IP address that your computer can use as the destination.",

            takeaway:
                "If hostname resolution fails, Ping may not reach the stage of sending an Echo Request. A DNS failure is different from an ICMP timeout."
        },

        icmp: {
            title: "ICMP",
            description:
                "Internet Control Message Protocol (ICMP) is a network-layer protocol used for control, diagnostic, and error-reporting messages.",

            connection:
                "Ping uses ICMP Echo Request messages to ask a destination to respond and ICMP Echo Reply messages when a response is returned.",

            example:
                "Your computer sends an ICMP Echo Request. If the destination permits and processes it, an ICMP Echo Reply can travel back.",

            takeaway:
                "If ICMP messages are filtered or blocked, Ping may receive no reply even when other network services are available."
        },

        routers: {
            title: "Routers",
            description:
                "A router connects different networks and forwards IP packets toward their destinations using routing information.",

            connection:
                "When a Ping destination is outside your local network, the request is typically forwarded through your default gateway and possibly other routers.",

            example:
                "A Ping request from your home network to 8.8.8.8 may pass through your home router and several networks before reaching its destination.",

            takeaway:
                "A normal Ping result does not show every router along the route. Traceroute is designed to help examine the path."
        },

        packets: {
            title: "Packets",
            description:
                "A packet is a formatted unit of data carried across a network. It contains information that helps deliver the data to its destination.",

            connection:
                "Ping's ICMP Echo Request is carried inside an IP packet. The returning Echo Reply is also carried inside an IP packet.",

            example:
                "Your computer prepares an ICMP Echo Request, places it inside an IP packet, and sends that packet toward the destination.",

            takeaway:
                "Ping checks the response to its diagnostic messages. It does not test every kind of data or application traffic."
        },

        connectivity: {
            title: "Network Connectivity",
            description:
                "Network connectivity refers to the ability of devices or systems to communicate over a network.",

            connection:
                "Ping can help test whether a particular destination responds to ICMP messages at the time of the test.",

            example:
                "If ping 8.8.8.8 receives replies, that provides evidence that ICMP communication with that destination worked during the test.",

            takeaway:
                "A successful Ping does not guarantee that a website, application, or every other network service is working."
        },

        latency: {
            title: "Latency",
            description:
                "Latency is the delay involved in transmitting information between points in a network.",

            connection:
                "Ping reports round-trip time (RTT): the time between sending an Echo Request and receiving its corresponding Echo Reply.",

            example:
                "If the Ping output shows time=25ms, the measured round trip took approximately 25 milliseconds.",

            takeaway:
                "Ping measures round-trip delay, not download speed or bandwidth. A single RTT value also does not reveal the one-way delay by itself."
        },

        bandwidth: {
            title: "Bandwidth",
            description:
                "Bandwidth describes the data-carrying capacity of a network connection, commonly expressed in bits per second.",

            connection:
                "Ping does not measure bandwidth. It sends diagnostic messages and measures their round-trip response time.",

            example:
                "A connection may have a bandwidth of 200 Mbps while Ping reports an RTT of 25 ms. These measurements describe different properties.",

            takeaway:
                "Use a suitable speed test to estimate internet throughput. Use Ping to examine ICMP responses and round-trip time."
        }

    };

    function showConcept(conceptKey) {

        const concept = concepts[conceptKey];

        if (!concept) {
            return;
        }

        label.textContent = "CONCEPT CONNECTION";
        title.textContent = concept.title;
        description.textContent = concept.description;
        connection.textContent = concept.connection;
        example.textContent = concept.example;
        takeaway.textContent = concept.takeaway;

        buttons.forEach(function (button) {

            const isActive =
                button.dataset.concept === conceptKey;

            button.classList.toggle("active", isActive);

            button.setAttribute(
                "aria-pressed",
                isActive ? "true" : "false"
            );

        });

        status.textContent =
            concept.title + " connection selected.";

    }

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            const conceptKey = button.dataset.concept;

            showConcept(conceptKey);

        });

    });

    status.textContent = "Concept Connection Map ready.";

})();

/* END SECTION 13.9 — INTERACTIVE CONCEPT MAP */
