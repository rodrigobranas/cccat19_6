import crypto from "crypto";
import Coord from "../vo/Coord";
import UUID from "../vo/UUID";

export default class Ride {
    private rideId: UUID;
    private passengerId: UUID;
    private driverId?: UUID;
    private from: Coord;
    private to: Coord;

    constructor (
        rideId: string,
        passengerId: string,
        driverId: string | null,
        fromLat: number,
        fromLong: number,
        toLat: number,
        toLong: number,
        readonly fare: number,
        readonly distance: number,
        private status: string,
        readonly date: Date
    ) {
        this.rideId = new UUID(rideId);
        this.passengerId = new UUID(passengerId);
        if (driverId) this.driverId = new UUID(driverId);
        this.from = new Coord(fromLat, fromLong);
        this.to = new Coord(toLat, toLong);
    }

    static create (passengerId: string, fromLat: number, fromLong: number, toLat: number, toLong: number) {
        const rideId = crypto.randomUUID();
        const fare = 0;
        const distance = 0;
        const date = new Date();
        const status = "requested";
        return new Ride(rideId, passengerId, null, fromLat, fromLong, toLat, toLong, fare, distance, status, date);
    }

    accept (driverId: string) {
        this.driverId = new UUID(driverId);
        if (this.status !== "requested") throw new Error("Invalid status");
        this.status = "accepted";
    }

    start () {
        if (this.status !== "accepted") throw new Error("Invalid status");
        this.status = "in_progress";
    }

    getDistance () {
        return this.distance;
    }

    getRideId () {
        return this.rideId.getValue();
    }

    getPassengerId () {
        return this.passengerId.getValue();
    }

    getDriverId () {
        return this.driverId?.getValue();
    }

    getFrom () {
        return this.from;
    }

    getTo () {
        return this.to;
    }

    getStatus () {
        return this.status;
    }

}
