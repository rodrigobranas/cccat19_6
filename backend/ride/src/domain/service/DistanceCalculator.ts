import Position from "../entity/Position";
import Coord from "../vo/Coord";

export default class DistanceCalculator {
    
	static calculateDistanceBetweenPositions (positions: Position[]) {
		let distance = 0;
		for (const [index, position] of positions.entries()) {
			const nextPosition = positions[index + 1];
			if (!nextPosition) break;
			distance += DistanceCalculator.calculateDistanceBetweenCoord(position.getCoord(), nextPosition.getCoord());
		}
        return distance;
	}

    private static calculateDistanceBetweenCoord (from: Coord, to: Coord) {
        const earthRadius = 6371;
		const degreesToRadians = Math.PI / 180;
		const deltaLat = (to.getLat() - from.getLat()) * degreesToRadians;
		const deltaLon = (to.getLong() - from.getLong()) * degreesToRadians;
		const a =
			Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
			Math.cos(from.getLat() * degreesToRadians) *
			Math.cos(to.getLat() * degreesToRadians) *
			Math.sin(deltaLon / 2) *
			Math.sin(deltaLon / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		const distance = earthRadius * c;
		return Math.round(distance);
    }

}
