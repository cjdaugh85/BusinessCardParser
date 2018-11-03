/**
 * Main module which runs the BusinessCardParser.  Document to parse must be passed via command line.
 *
 */
const BusinessCardParser = require("./BusinessCardParser");

console.log("Starting Business Card Parser");

const document = process.argv[2];

businessCardParser = new BusinessCardParser();

try {
    contactInfo = businessCardParser.getContactInfo(document);

    console.log(contactInfo.getInfo());
} catch (e) {
    if(e.message === "Document must not be empty."){
        console.log("A document must be provided to parse");
    }
}

console.log("Ending Running Business Card Parser");