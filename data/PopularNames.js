const fs = require("fs");
const _ = require("lodash");

module.exports = class PopularNames {
    constructor() {
        const names = JSON.parse(fs.readFileSync("./data/popular_names.json"));

        this.first = names.first;
        this.last = names.last;
    }

    isPopularFirstName(name) {
        return _.includes(this.first, name);
    }

    isPopularLastName(name) {
        return _.includes(this.last, name);
    }
};