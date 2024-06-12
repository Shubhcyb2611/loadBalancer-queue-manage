import { Logger } from "../middleware/logger";

class QueueManager {
  constructor() {
    this.fifoQueue = [];
    this.priorityQueue = [];
    this.roundRobinQueue = [];
    this.currentQueue = 0;
    this.processQueues();
  }
  addRequest(request) {
    switch (request.type) {
      case "REST":
        this.fifoQueue.push(request);
        break;

      case "GraphQL":
        this.priorityQueue.push(request);
        break;

      case "gRPC":
        this.roundRobinQueue.push(request);
        break;

      default:
        Logger.error("Unknown request type");
    }
    Logger.info(`Added request to ${request.type} queue`);
  }
}
