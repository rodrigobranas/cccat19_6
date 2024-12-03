export default class Email {
    private value: string;

    constructor (email: string) {
        if (!this.isValidEmail(email)) throw new Error("Invalid email");
        this.value = email;
    }

    isValidEmail (email: string) {
		return email.match(/^(.+)@(.+)$/);
	}

    getValue () {
        return this.value;
    }
}
