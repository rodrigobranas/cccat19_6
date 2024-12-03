export default class Password {
    private value: string;

    constructor (password: string) {
        this.value = password;
    }

    getValue () {
        return this.value;
    }
}
