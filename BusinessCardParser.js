const _ = require("lodash");
const logger = require("./logger")();
const ContactInfo = require('./ContactInfo');
const PopularNames = require("./data/PopularNames");

module.exports = class BusinessCardParser {
    constructor() {
        this.popularNames = new PopularNames();
    }

    findPhoneNumber(text) {
        const formatPhoneNumber = (phone) => {
            phone = phone.replace("+", "");

            return phone.replace(/[^0-9]/g, "");
        };

        if (text.toLowerCase().includes("fax")) {
            return;
        } else {
            text = formatPhoneNumber(text);

            if (text.length >= 10 && text.length <= 11) {
                return text;
            }
        }
    }

    findEmailAddress(text) {
        const emailAddressRegex = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

        const match = emailAddressRegex.exec(text);

        if (_.isNull(match)) {
            return;
        } else {
            return match[0];
        }
    }

    findName(text) {
        let foundName;

        const nameArray = text.split(" ");

        _.each(nameArray, (name) => {
            if (this.popularNames.isPopularFirstName(name) || this.popularNames.isPopularLastName(name)) {
                foundName = text;
                return false;
            }
        });

        return foundName;
    }

    process(name, phoneNumber, emailAddress) {
        const contact = new ContactInfo();

        contact.setName(name);
        contact.setPhone(phoneNumber);
        contact.setEmail(emailAddress);

        return contact;
    }

    getContactInfo(document) {
        const includesNumbers = (input) => {
            return /\d/.test(input);
        };

        const contactInfo = new ContactInfo();

        const textArray = document.split("\n");

        const potentialNamesArray = _.filter(textArray, (text) => {return !includesNumbers(text)});
        const potentialPhoneArray = _.filter(textArray, (text) => {return includesNumbers(text)});
        const potentialEmailArray = _.filter(textArray, (text) => {return text.includes('@')});

        _.each(potentialNamesArray, (text) => {
            if (!_.isNil(text)) {
                text = text.trim();

                let foundName = this.findName(text);

                if (!_.isNil(foundName)) {
                    logger.info('Found Name: ' + foundName);
                    contactInfo.setName(foundName);

                    return false;
                }
            }
        });

        _.each(potentialPhoneArray, (text) => {
            let phoneNumber = this.findPhoneNumber(text);

            if (!_.isNil(phoneNumber)) {
                logger.info('Found Phone Number: ' + phoneNumber);
                contactInfo.setPhone(phoneNumber);

                return false;
            }
        });

        _.each(potentialEmailArray, (text) => {
            let emailAddress = this.findEmailAddress(text);

            if (!_.isNil(emailAddress)) {
                logger.info('Found Email: ' + emailAddress);
                contactInfo.setEmail(emailAddress);

                return false;
            }
        });

        return contactInfo;
    }
};