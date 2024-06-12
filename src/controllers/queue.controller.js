import { Logger } from "../middleware/logger.js";

class QueueManager {
  constructor() {
    // Initialize queues and current queue position
    this.fifoQueue = [];
    this.priorityQueue = [];
    this.roundRobinQueue = [];
    this.currentQueue = 0;
    this.processQueues();
  }

  // Method to add requests to the appropriate queue
  addRequest(request) {
    switch (request.type) {
      case "REST":
        this.fifoQueue.push(request); //Add to FIFO queue
        break;

      case "GraphQL":
        this.priorityQueue.push(request); // Add to priority queue
        break;

      case "gRPC":
        this.roundRobinQueue.push(request); // Add to round-robin queue
        break;

      default:
        Logger.error("Unknown request type");
    }
    Logger.info(`Added request to ${request.type} queue`);
  }

  // Method to process queues at regular intervals
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
          this.roundRobinQueue[this.currentQueue % this.roundRobinQueue.length]; // % used to ensure that the index stays within queue length
        this.handleRequest(request);
        this.roundRobinQueue.splice(
          this.currentQueue % this.roundRobinQueue.length,
          1
        ); //remove processed request from queue
        this.currentQueue++;
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
      speed === "fast" ? 0 : 2000 // time based request processing
    );
  }
}
export default QueueManager;
