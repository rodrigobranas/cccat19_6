export function validateCpf (cpf: string) {
	if (!cpf) return false;
	cpf = clean(cpf); 
	if (cpf.length !== 11) return false;
	if (allDigitsTheSame(cpf)) return false;
	const dg1 = calculateDigit(cpf, 10);
	const dg2 = calculateDigit(cpf, 11);
	let actualDigit = extractDigit(cpf);  
	return actualDigit == `${dg1}${dg2}`;
}

function clean (cpf: string) {
	return cpf.replace(/\D/g, "");
}

function allDigitsTheSame (cpf: string) {
	const [firstDigit] = cpf;
	return [...cpf].every(c => c === firstDigit);
}

function calculateDigit (cpf: string, factor: number) {
	let total = 0;
	for (const digit of cpf) {
		if (factor > 1) total += parseInt(digit) * factor--;
	}
	const remainder = total % 11;
	return (remainder < 2) ? 0 : 11 - remainder;
}

function extractDigit (cpf: string) {
	return cpf.slice(9);
}