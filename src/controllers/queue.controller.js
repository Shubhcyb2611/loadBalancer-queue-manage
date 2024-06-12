import { Logger } from "../middleware/logger.js";

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

  processQueues() {
    setInterval(() => {
      if (this.fifoQueue.length > 0) {
        this.handleRequest(this.fifoQueue.shift());
      }
      if (this.priorityQueue.length > 0) {
        this.handleRequest(this.priorityQueue.shift());
      }
      if (this.roundRobinQueue.length > 0) {
        const request =
          this.roundRobinQueue[this.currentQueue % this.roundRobinQueue.length];
        this.handleRequest(request);
        this.roundRobinQueue.splice(
          this.currentQueue % this.roundRobinQueue.length,
          1
        );
        console.log(this.roundRobinQueue);
        this.currentQueue++;
        console.log(this.currentQueue);
      }
    }, 1000);
  }

  handleRequest(request) {
    const { type, speed, res } = request;
    Logger.info(`Handling ${type} request with ${speed} speed`);
    setTimeout(
      () => {
        res.json({
          message: `${speed.toUpperCase()} ${type.toUpperCase()} API response`,
        });
        Logger.info(`Response sent for ${type} request with ${speed} speed`);
      },
      speed === "fast" ? 0 : 2000
    );
  }
}
export default QueueManager;
