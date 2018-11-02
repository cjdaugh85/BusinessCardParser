const _ = require("lodash");
const chai = require('chai');
const assert = chai.assert;
const logger = require('./logger')();

const BusinessCardParser = require('./BusinessCardParser');

const examples =
    [
        {
            text: "ASYMMETRIK LTD\nMike Smith\nSenior Software Engineer\n(410)555-1234\nmsmith@asymmetrik.com",
            name: "Mike Smith",
            phone: "4105551234",
            email: "msmith@asymmetrik.com",
            expected: "Name: Mike Smith\nPhone: 4105551234\nEmail: msmith@asymmetrik.com"
        },
        {
            text: "Foobar Technologies\nAnalytic Developer\nLisa Haung\n1234 Sentry Road\nColumbia, MD 12345\nPhone: 410-555-1234\nFax: 410-555-4321\nlisa.haung@foobartech.com",
            name: "Lisa Haung",
            phone: "4105551234",
            email: "lisa.haung@foobartech.com",
            expected: "Name: Lisa Haung\nPhone: 4105551234\nEmail: lisa.haung@foobartech.com"
        },
        {
            text: "Arthur Wilson\nSoftware Engineer\nDecision & Security Technologies\nABC Technologies\n123 North 11th Street\nSuite 229\nArlington, VA 22209\nTel: +1 (703) 555-1259\nFax: +1 (703) 555-1200\nawilson@abctech.com",
            name: "Arthur Wilson",
            phone: "17035551259",
            email: "awilson@abctech.com",
            expected: "Name: Arthur Wilson\nPhone: 17035551259\nEmail: awilson@abctech.com"
        }
    ];

describe('Test Business Card Parser', () => {
    it('Examples Pass', () => {
        for (let i = 0; i < examples.length; i++) {
            const text = examples[i].text;
            const expected = examples[i];
            const expectedText = examples[i].expected;

            const bcParser = new BusinessCardParser();

            const contactInfo = bcParser.getContactInfo(text);

            assert.equal(contactInfo.getName(), expected.name);
            assert.equal(contactInfo.getPhone(), expected.phone);
            assert.equal(contactInfo.getEmail(), expected.email);

            assert.equal(contactInfo.getInfo(), expectedText);
        }
    });
});