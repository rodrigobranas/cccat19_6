import Account from "../../src/domain/entity/Account";

test("Deve criar uma conta de passageiro", function () {
    const account = Account.create("John Doe", "john.doe@gmail.com", "97456321558", "", "123456", true, false);
    expect(account.getName()).toBe("John Doe");
    expect(account.getEmail()).toBe("john.doe@gmail.com");
});

test("Não deve criar uma conta com nome inválido", function () {
    expect(() => Account.create("John", "john.doe@gmail.com", "97456321558", "", "123456", true, false)).toThrow(new Error("Invalid name"));
});

test("Não deve criar uma conta com email inválido", function () {
    expect(() => Account.create("John Doe", "john.doe", "97456321558", "", "123456", true, false)).toThrow(new Error("Invalid email"));
});

test("Não deve criar uma conta com cpf inválido", function () {
    expect(() => Account.create("John Doe", "john.doe@gmail.com", "9745632155", "", "123456", true, false)).toThrow(new Error("Invalid cpf"));
});

test("Não deve criar uma conta com placa do carro inválida", function () {
    expect(() => Account.create("John Doe", "john.doe@gmail.com", "97456321558", "AAA999", "123456", false, true)).toThrow(new Error("Invalid car plate"));
});
