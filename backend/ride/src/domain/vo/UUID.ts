import crypto from "crypto";

export default class UUID {
    private value: string;

    constructor (uuid: string) {
        // regex para validar se o uuid
        this.value = uuid;
    }

    static create () {
        const uuid = crypto.randomUUID();
        return new UUID(uuid);
    }

    getValue () {
        return this.value;
    }
}
