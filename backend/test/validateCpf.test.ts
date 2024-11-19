import { validateCpf } from "../src/validateCpf";

test.each([
	"97456321558",
	"974.563.215-58",
	"71428793860",
	"87748248800"
])("Deve validar o cpf %s", function (cpf: any) {
	const isValid = validateCpf(cpf);
	expect(isValid).toBe(true);
});

test.each([
	null,
	undefined,
	"",
	"11111111111"
])("Não deve validar o cpf %s", function (cpf: any) {
	const isValid = validateCpf(cpf);
	expect(isValid).toBe(false);
});
