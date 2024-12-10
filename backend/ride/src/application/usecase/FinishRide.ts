import Position from "../../domain/entity/Position";
import PositionRepository from "../../infra/repository/PositionRepository";
import RideRepository from "../../infra/repository/RideRepository";

export default class FinishRide {
	constructor (readonly rideRepository: RideRepository, readonly positionRepository: PositionRepository) {
	}
	
	async execute (input: Input) {
		const ride = await this.rideRepository.getRideById(input.rideId);
		const positions = await this.positionRepository.listByRideId(input.rideId);
		ride.finish(positions);
		await this.rideRepository.updateRide(ride);
	}
}

type Input = {
	rideId: string
}