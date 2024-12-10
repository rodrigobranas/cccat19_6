import crypto from "crypto";
import Coord from "../vo/Coord";
import UUID from "../vo/UUID";
import Position from "./Position";
import DistanceCalculator from "../service/DistanceCalculator";
import { FareCalculatorFactory } from "../service/FareCalculator";

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
        private fare: number,
        private distance: number,
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

    finish (positions: Position[]) {
        if (this.status !== "in_progress") throw new Error("Invalid status");
        this.status = "completed";
        for (const [index, position] of positions.entries()) {
            const nextPosition = positions[index + 1];
            if (!nextPosition) break;
            const distance = DistanceCalculator.calculateDistanceBetweenPositions([position, nextPosition]);
            this.fare += FareCalculatorFactory.create(position.date).calculate(distance);
            this.distance += distance;
        }
    }

    getDistance () {
        return this.distance;
    }

    getFare () {
        return this.fare;
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
