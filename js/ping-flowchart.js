
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
