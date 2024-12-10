export default class Cpf {
    private value: string;

    constructor (cpf: string) {
        if (!this.isValidCpf(cpf)) throw new Error("Invalid cpf");
        this.value = cpf;
    }

    private isValidCpf (cpf: string) {
        if (!cpf) return false;
        cpf = this.clean(cpf); 
        if (cpf.length !== 11) return false;
        if (this.allDigitsTheSame(cpf)) return false;
        const dg1 = this.calculateDigit(cpf, 10);
        const dg2 = this.calculateDigit(cpf, 11);
        let actualDigit = this.extractDigit(cpf);  
        return actualDigit == `${dg1}${dg2}`;
    }
    
    private clean (cpf: string) {
        return cpf.replace(/\D/g, "");
    }
    
    private allDigitsTheSame (cpf: string) {
        const [firstDigit] = cpf;
        return [...cpf].every(c => c === firstDigit);
    }
    
    private calculateDigit (cpf: string, factor: number) {
        let total = 0;
        for (const digit of cpf) {
            if (factor > 1) total += parseInt(digit) * factor--;
        }
        const remainder = total % 11;
        return (remainder < 2) ? 0 : 11 - remainder;
    }
    
    private extractDigit (cpf: string) {
        return cpf.slice(9);
    }

    getValue () {
        return this.value;
    }
}
