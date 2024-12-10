import RideRepository from "../../infra/repository/RideRepository";
import Coord from "../../domain/vo/Coord";
import PositionRepository from "../../infra/repository/PositionRepository";
import DistanceCalculator from "../../domain/service/DistanceCalculator";
import Ride from "../../domain/entity/Ride";
import AccountGateway from "../../infra/gateway/AccountGateway";

export default class GetRide {
	// Usar DAO ao invés de Repository
	constructor (readonly accountGateway: AccountGateway, readonly rideRepository: RideRepository, readonly positionRepository: PositionRepository) {
	}
	
	async execute (rideId: string): Promise<Output> {
		const ride = await this.rideRepository.getRideById(rideId);
		const passengerAccount = await this.accountGateway.getAccountById(ride.getPassengerId());
		let distance;
		if (ride.getStatus() === "completed") {
			distance = ride.getDistance();
		} else {
			const positions = await this.positionRepository.listByRideId(rideId);
			distance = DistanceCalculator.calculateDistanceBetweenPositions(positions)
		}
		
		return {
			rideId: ride.getRideId(),
			passengerId: ride.getPassengerId(),
			driverId: ride.getDriverId(),
			fromLat: ride.getFrom().getLat(),
			fromLong: ride.getFrom().getLong(),
			toLat: ride.getTo().getLat(),
			toLong: ride.getTo().getLong(),
			fare: ride.getFare(),
			distance,
			status: ride.getStatus(),
			date: ride.date,
			passengerName: passengerAccount.name
		};
	}
}

type Output = {
	rideId: string,
	passengerId: string,
	passengerName: string,
	driverId?: string,
	fromLat: number,
	fromLong: number,
	toLat: number,
	toLong: number,
	fare: number,
	distance: number,
	status: string,
	date: Date
}
