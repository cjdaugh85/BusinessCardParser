/**
 * Class which contains Phone Number, Email Address and Name of Contact
 * @type {module.ContactInfo}
 */
module.exports = class ContactInfo {
    setName(value) {
        this._name = value;
    }

    setPhone(value) {
        this._phone = value;
    }

    setEmail(value) {
        this._email = value;
    }

    getName() {
        return this._name;
    }

    getPhone() {
        return this._phone;
    }

    getEmail() {
        return this._email;
    }

    getInfo() {
        const isEmptyOrNull = (value) => {
                return value == null || value == "" || typeof value === "undefined";
        };

        const name = this.getName();
        const phone = this.getPhone();
        const email = this.getEmail();

        if(isEmptyOrNull(name) && isEmptyOrNull(phone) && isEmptyOrNull(email)){
            return "No Information Found for Contact";
        }


        return `Name: ${name}\nPhone: ${phone}\nEmail: ${email}`;
    }
};