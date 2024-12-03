import DistanceCalculator from "../../domain/service/DistanceCalculator";
import Coord from "../../domain/vo/Coord"

export default class CalculateDistance {

    async execute (input: Input): Promise<Output> {
        const from = new Coord(input.fromLat, input.fromLong);
        const to = new Coord(input.toLat, input.toLong);
        const distance = DistanceCalculator.calculate(from, to);
        return {
            distance
        }
    }
}

type Input = {
    fromLat: number,
    fromLong: number,
    toLat: number,
    toLong: number
}

type Output = {
    distance: number
}
