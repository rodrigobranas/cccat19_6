import { inject } from "../../infra/di/Registry";
import AccountGateway from "../../infra/gateway/AccountGateway";
import RideRepository from "../../infra/repository/RideRepository";

export default class AcceptRide {
	@inject("accountGateway")
	accountGateway!: AccountGateway;
	@inject("rideRepository")
	rideRepository!: RideRepository;
		
	constructor () {
	}
	
	async execute (input: Input) {
		const account = await this.accountGateway.getAccountById(input.driverId);
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