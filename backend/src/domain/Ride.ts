import crypto from "crypto";

export default class Ride {

    constructor (
        readonly rideId: string,
        readonly passengerId: string,
        readonly driverId: string | null,
        readonly fromLat: number,
        readonly fromLong: number,
        readonly toLat: number,
        readonly toLong: number,
        readonly fare: number,
        readonly distance: number,
        readonly status: string,
        readonly date: Date
    ) {
    }

    static create (passengerId: string, fromLat: number, fromLong: number, toLat: number, toLong: number) {
        const rideId = crypto.randomUUID();
        const fare = 0;
        const distance = 0;
        const date = new Date();
        const status = "requested";
        return new Ride(rideId, passengerId, null, fromLat, fromLong, toLat, toLong, fare, distance, status, date);
    }
}
