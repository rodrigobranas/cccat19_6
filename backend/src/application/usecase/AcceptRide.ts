import Ride from "../../domain/entity/Ride";
import RideRepository from "../../infra/repository/RideRepository";
import AccountRepository from "../repository/AccountRepository";

export default class AcceptRide {
	// DIP - Dependency Inversion Principle
	constructor (readonly accountRepository: AccountRepository, readonly rideRepository: RideRepository) {
	}
	
	async execute (input: Input) {
		const account = await this.accountRepository.getAccountById(input.driverId);
		if (!account.isDriver) throw new Error("Account must be from a driver");
		const hasActiveRide = await this.rideRepository.hasActiveRideByDriverId(input.driverId);
		if (hasActiveRide) throw new Error("Passenger already have an active ride");
		const ride = await this.rideRepository.getRideById(input.rideId);
		// mutation
		ride.accept(input.driverId);
		await this.rideRepository.updateRide(ride);
	}
}

type Input = {
	rideId: string,
	driverId: string
}