export default class Name {
    private value: string;

    constructor (name: string) {
        if (!this.isValidName(name)) throw new Error("Invalid name");
        this.value = name;
    }

    isValidName (name: string) {
		return name.match(/[a-zA-Z] [a-zA-Z]+/);
	}

    getValue () {
        return this.value;
    }
}
