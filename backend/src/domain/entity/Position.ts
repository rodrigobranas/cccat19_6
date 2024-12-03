import Coord from "../vo/Coord";
import UUID from "../vo/UUID";

// Entity ou VO?
export default class Position {
    private positionId: UUID;
    private rideId: UUID;
    private coord: Coord;

    constructor (positionId: string, rideId: string, lat: number, long: number, readonly date: Date) {
        this.positionId = new UUID(positionId);
        this.rideId = new UUID(rideId);
        this.coord = new Coord(lat, long);
    }

    static create (rideId: string, lat: number, long: number) {
        const positionId = UUID.create();
        const date = new Date();
        return new Position(positionId.getValue(), rideId, lat, long, date);
    }

    getPositionId () {
        return this.positionId.getValue();
    }

    getRideId () {
        return this.rideId.getValue();
    }

    getCoord () {
        return this.coord;
    }

}
