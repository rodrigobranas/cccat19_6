import Ride from "../../domain/entity/Ride";
import RideRepository from "../../infra/repository/RideRepository";
import AccountRepository from "../repository/AccountRepository";

export default class StartRide {
	constructor (readonly rideRepository: RideRepository) {
	}
	
	async execute (input: Input) {
		const ride = await this.rideRepository.getRideById(input.rideId);
		// mutation
		ride.start();
		await this.rideRepository.updateRide(ride);
	}
}

type Input = {
	rideId: string
}