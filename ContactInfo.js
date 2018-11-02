module.exports = class ContactInfo {
    constructor(){

    }

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

    getInfo(){
        return `Name: ${this.getName()}\nPhone: ${this.getPhone()}\nEmail: ${this.getEmail()}`;
    }
};