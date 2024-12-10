import Position from "../../domain/entity/Position";
import PositionRepository from "../../infra/repository/PositionRepository";
import RideRepository from "../../infra/repository/RideRepository";

export default class UpdatePosition {
	constructor (readonly rideRepository: RideRepository, readonly positionRepository: PositionRepository) {
	}
	
	async execute (input: Input) {
		const ride = await this.rideRepository.getRideById(input.rideId);
		if (ride.getStatus() !== "in_progress") throw new Error("Invalid status");
		const position = Position.create(input.rideId, input.lat, input.long, input.date);
		await this.positionRepository.savePosition(position);
	}
}

type Input = {
	rideId: string,
	lat: number,
	long: number,
	date?: Date
}