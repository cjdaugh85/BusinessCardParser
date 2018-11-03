/**
 * Module which does the heavy lifting for the Project.  Parses the document provided via the getContactInfo function
 * and returns an instance of the ContactInfo class.
 */

const _ = require("lodash");
const nlp = require('compromise');
const ContactInfo = require('./ContactInfo');

module.exports = class BusinessCardParser {
    /**
     * Accepts a document and attempts to parse into properly formatted phone number.
     *
     * If document contains the word "fax", then will not attempt to parse.
     *
     * Attempts to grab all digits from document and based on the length of the formatted document,
     * will determine if there is a match
     *
     * @param document
     * @returns matching value or null
     */
    findPhoneNumber(document) {
        let match = null;

        if (!document.toLowerCase().includes("fax")) {
            let formattedDoc = document.replace('+', '').replace(/[^0-9]/g, "");

            if (formattedDoc.length >= 10 && formattedDoc.length <= 11) {
                match = formattedDoc;
            }
        }
        return match;
    }

    /**
     * Accepts a document and attempts to parse into properly formatted email address.
     *
     * If document matches regex, will return value as a valid email address.
     *
     * @param document
     * @returns matching value or null
     */
    findEmailAddress(document) {
        const emailAddressRegex =
            /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

        const emailMatches = emailAddressRegex.exec(document);

        let match = null;

        if (emailMatches !== null && emailMatches[0] !== null) {
            match = emailMatches[0];
        }
        return match;
    }

    /**
     * Accepts a document and attempts to use natural language processing
     * to determine if the document contains a person's name.
     *
     * @param document
     * @returns matching value or null
     */
    findName(document) {
        let match = null;

        const possibleNames = nlp(document).people().data();

        if (possibleNames !== null && possibleNames.length > 0) {
            const nameToken = possibleNames[0];

            match = nameToken.text;
        }

        return match;
    }

    /**
     * Accepts document and parses required information for ContactInfo.
     *
     * Takes the original document provided and splits it into three different arrays.
     *
     * The first array is a list of all tokens split by a new line character.
     *
     * The second array is a list of tokens which include numbers (to make parsing for the phone number faster).
     *
     * The third array is a list of tokens which include the @ symbol (to make parsing for email addresses faster).
     *
     * Once attempting to find a value for each, properly sets the value in the ContactInfo instance and returns.
     *
     * @param document
     * @returns instance of ContactInfo
     */
    getContactInfo(document) {
        const includesNumbers = (input) => {
            return /\d/.test(input);
        };

        if(document !== null && document !== "" && typeof document !== "undefined") {
            const lineArray = document.split("\\n");

            const potentialPhoneArray = _.filter(lineArray, (text) => {
                return includesNumbers(text)
            });
            const potentialEmailArray = _.filter(lineArray, (text) => {
                return text.includes('@')
            });

            const contactName = this.findName(lineArray);

            const contactInfo = new ContactInfo();

            if (contactName !== null) {
                contactInfo.setName(contactName);
            }

            for (let i = 0; i < potentialPhoneArray.length; i++) {
                let phoneNumber = this.findPhoneNumber(potentialPhoneArray[i]);

                if (phoneNumber !== null) {
                    contactInfo.setPhone(phoneNumber);

                    break;
                }
            }

            for (let i = 0; i < potentialEmailArray.length; i++) {
                let emailAddress = this.findEmailAddress(potentialEmailArray[i]);

                if (emailAddress !== null) {
                    contactInfo.setEmail(emailAddress);

                    break;
                }
            }

            return contactInfo;
        } else {
            throw new Error("Document must not be empty.");
        }
    }
};