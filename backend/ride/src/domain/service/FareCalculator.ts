export default interface FareCalculator {
    calculate (distance: number): number;
}

export class NormalFareCalculator implements FareCalculator {

    calculate(distance: number): number {
        return distance * 2.1;
    }

}

export class OvernightFareCalculator implements FareCalculator {

    calculate(distance: number): number {
        return distance * 3.9;
    }

}

export class SundayFareCalculator implements FareCalculator {

    calculate(distance: number): number {
        return distance * 5;
    }

}

export class SpecialFareCalculator implements FareCalculator {

    calculate(distance: number): number {
        return 1;
    }

}

export class FareCalculatorFactory {

    static create (date: Date) {
        if (date.getDate() === 30) return new SpecialFareCalculator();
        if (date.getDay() === 0) return new SundayFareCalculator();
        if (date.getHours() > 22 || date.getHours() < 6) return new OvernightFareCalculator();
        return new NormalFareCalculator();
    }

}
