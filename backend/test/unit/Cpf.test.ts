import Cpf from "../../src/domain/vo/Cpf";

test.each([
	"97456321558",
	"974.563.215-58",
	"71428793860",
	"87748248800"
])("Deve validar o cpf %s", function (cpf: string) {
	expect((new Cpf(cpf)).getValue()).toBe(cpf);
	
});

test.each([
	null,
	undefined,
	"",
	"11111111111"
])("Não deve validar o cpf %s", function (cpf: any) {
	expect(() => new Cpf(cpf)).toThrow(new Error("Invalid cpf"));
});
