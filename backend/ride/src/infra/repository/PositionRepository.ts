import Position from "../../domain/entity/Position";
import DatabaseConnection from "../database/DatabaseConnection";

export default interface PositionRepository {
    savePosition (position: Position): Promise<void>;
    listByRideId (rideId: string): Promise<Position[]>;
}

export class PositionRepositoryDatabase implements PositionRepository {
    
    constructor (readonly connection: DatabaseConnection) {
	}
    
    async savePosition(position: Position): Promise<void> {
        await this.connection.query("insert into ccca.position (position_id, ride_id, lat, long, date) values ($1, $2, $3, $4, $5)", [position.getPositionId(), position.getRideId(), position.getCoord().getLat(), position.getCoord().getLong(), position.date]);
    }

    async listByRideId(rideId: string): Promise<Position[]> {
        const positions = [];
		const positionsData = await this.connection.query("select * from ccca.position where ride_id = $1", [rideId]);
		for (const positionData of positionsData) {
			positions.push(new Position(positionData.position_id, positionData.ride_id, parseFloat(positionData.lat), parseFloat(positionData.long), positionData.date))
		}
        return positions;
    }

}