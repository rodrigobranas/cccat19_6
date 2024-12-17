import Position from "../../domain/entity/Position";
import RideCompleted from "../../domain/event/RideCompleted";
import { PgPromiseAdapter } from "../../infra/database/DatabaseConnection";
import Registry, { inject } from "../../infra/di/Registry";
import Mediator from "../../infra/mediator/Mediator";
import Queue from "../../infra/queue/Queue";
import PositionRepository from "../../infra/repository/PositionRepository";
import RideRepository from "../../infra/repository/RideRepository";

export default class FinishRide {
	@inject("rideRepository")
	rideRepository!: RideRepository;
	@inject("positionRepository")
	positionRepository!: PositionRepository;
	@inject("mediator")
	mediator!: Mediator;
	@inject("queue")
	queue!: Queue;

	constructor () {
	}
	
	async execute (input: Input) {
		const ride = await this.rideRepository.getRideById(input.rideId);
		ride.register("rideCompleted", async (rideCompleted: RideCompleted) => {
			await this.rideRepository.updateRide(ride);
			// await this.mediator.notifyAll(rideCompleted);
			await this.queue.publish(rideCompleted.event, rideCompleted);
		});
		const positions = await this.positionRepository.listByRideId(input.rideId);
		ride.finish(positions);
	}
}

type Input = {
	rideId: string
}