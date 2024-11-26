import crypto from "crypto";
import AccountDAO from "../../infra/repository/AccountRepository";
import RideDAO from "../../infra/repository/RideRepository";

export default class GetRide {
	constructor (readonly accountDAO: AccountDAO, readonly rideDAO: RideDAO) {
	}
	
	async execute (rideId: string): Promise<Output> {
		const ride = await this.rideDAO.getRideById(rideId);
		const passengerAccount = await this.accountDAO.getAccountById(ride.passengerId);
		return {
			...ride,
			passengerName: passengerAccount.name
		};
	}
}

type Output = {
	rideId: string,
	passengerId: string,
	passengerName: string,
	driverId: string | null,
	fromLat: number,
	fromLong: number,
	toLat: number,
	toLong: number,
	fare: number,
	distance: number,
	status: string,
	date: Date
}
