import pgp from "pg-promise";
import Ride from "../../domain/Ride";
import DatabaseConnection from "../database/DatabaseConnection";

// Repository

export default interface RideRepository {
	saveRide (ride: Ride): Promise<void>;
	getRideById (rideId: string): Promise<Ride>;
	hasActiveRideByPassengerId (passengerId: string): Promise<boolean>;
}

export class RideRepositoryDatabase implements RideRepository  {

	constructor (readonly connection: DatabaseConnection) {
	}

	async getRideById (rideId: string) {
		const [rideData] = await this.connection.query("select * from ccca.ride where ride_id = $1", [rideId]);
		return {
			rideId: rideData.ride_id,
			passengerId: rideData.passenger_id,
			driverId: rideData.driver_id,
			fromLat: parseFloat(rideData.from_lat),
			fromLong: parseFloat(rideData.from_long),
			toLat: parseFloat(rideData.to_lat),
			toLong: parseFloat(rideData.to_long),
			fare: parseFloat(rideData.fare),
			distance: parseFloat(rideData.distance),
			status: rideData.status,
			date: rideData.date
		};
	}
	
	async saveRide (ride: any) {
		await this.connection.query("insert into ccca.ride (ride_id, passenger_id, driver_id, from_lat, from_long, to_lat, to_long, fare, distance, status, date) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)", [ride.rideId, ride.passengerId, ride.driverId, ride.fromLat, ride.fromLong, ride.toLat, ride.toLong, ride.fare, ride.distance, ride.status, ride.date]);
	}

	async hasActiveRideByPassengerId (passengerId: string) {
		const [rideData] = await this.connection.query("select 1 from ccca.ride where passenger_id = $1 and status not in ('completed', 'cancelled') limit 1", [passengerId]);
		return !!rideData;
	}
}
