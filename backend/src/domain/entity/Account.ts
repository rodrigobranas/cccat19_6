import crypto from "crypto";
import Name from "../vo/Name";
import Email from "../vo/Email";
import Cpf from "../vo/Cpf";
import CarPlate from "../vo/CarPlate";
import Password from "../vo/Password";
import UUID from "../vo/UUID";

export default class Account {
    private accountId: UUID;
    private name: Name;
    private email: Email;
    private cpf: Cpf;
    private carPlate: CarPlate;
    private password: Password;

    constructor (
        accountId: string,
        name: string, 
        email: string, 
        cpf: string, 
        carPlate: string, 
        password: string, 
        readonly isPassenger: boolean, 
        readonly isDriver: boolean
    ) {
        this.accountId = new UUID(accountId);
        this.name = new Name(name);
        this.email = new Email(email);
        this.cpf = new Cpf(cpf);
        this.carPlate = new CarPlate(carPlate);
        this.password = new Password(password);
    }
    
    static create (
        name: string, 
        email: string, 
        cpf: string, 
        carPlate: string, 
        password: string, 
        isPassenger: boolean, 
        isDriver: boolean
    ) {
        const accountId = UUID.create();
        return new Account(accountId.getValue(), name, email, cpf, carPlate, password, isPassenger, isDriver);
    }

    getAccountId () {
        return this.accountId.getValue();
    }

    getName () {
        return this.name.getValue();
    }

    getEmail () {
        return this.email.getValue();
    }

    getCpf () {
        return this.cpf.getValue();
    }

    getCarPlate () {
        return this.carPlate.getValue();
    }

    getPassword () {
        return this.password.getValue();
    }
}
