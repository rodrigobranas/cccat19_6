import { inject } from "../../infra/di/Registry";
import RideRepository from "../../infra/repository/RideRepository";

export default class StartRide {
	@inject("rideRepository")
	rideRepository!: RideRepository;

	constructor () {
	}
	
	async execute (input: Input) {
		const ride = await this.rideRepository.getRideById(input.rideId);
		ride.start();
		await this.rideRepository.updateRide(ride);
	}
}

type Input = {
	rideId: string
}