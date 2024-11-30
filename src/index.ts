export class TimeEstimator {
    private executionsTimes: number[] = [];
    private totalItems: number;
    private startTime: number = 0;
    private endTime: number = 0;
  
    /**
     * Constructs a new instance of TimeEstimator.
     * @param {number} totalItems - Total number of items to process.
     */
    constructor(totalItems: number) {
      if (typeof totalItems !== 'number' || totalItems <= 0) {
        throw new Error('Total number of items to process must be a positive number');
      }
      this.totalItems = totalItems;
    }
  
    /**
     * Records the start time of a process.
     * This method captures the timestamp of the start of the operation.
     */
    public recordStart(): void {
      this.startTime = +new Date();
    }
  
    /**
     * Records the end time of a process.
     * This method captures the timestamp of the end of the operation.
     */
    public recordEnd(): void {
      this.endTime = +new Date();
    }
  
    /**
     * Logs the remaining estimated time based on the previous execution times.
     * It calculates the median time of previous executions and estimates the remaining time for all items.
     * @param {number} iteration - The current iteration number (should be between 0 and totalItems - 1).
     */
    public logTimeRemaining(iteration: number): void {
      if (typeof iteration !== 'number' || iteration < 0 || iteration >= this.totalItems) {
        throw new Error(`Iteration must be a valid number between 0 and ${this.totalItems - 1}`);
      }
  
      const timeTaken = this.endTime - this.startTime;
      this.executionsTimes.push(timeTaken);
      
      const median = this.calculateCentralValue();
      this.outputLogs(median, iteration);
    }
  
    /**
     * Calculates the median of the recorded execution times.
     * This method sorts the recorded times and computes the middle value.
     * @returns {number} - The median value of the execution times.
     */
    private calculateCentralValue(): number {
      const sortedTimes = [...this.executionsTimes].sort((a, b) => a - b);
      const medianIndex = Math.floor(sortedTimes.length / 2);
      
      return sortedTimes.length % 2 === 0
        ? (sortedTimes[medianIndex - 1] + sortedTimes[medianIndex]) / 2
        : sortedTimes[medianIndex];
    }
  
    /**
     * Outputs the estimated remaining time in minutes and seconds, based on the median execution time.
     * It also prints the remaining time in milliseconds.
     * @param {number} median - The median execution time (in milliseconds).
     * @param {number} iteration - The current iteration number.
     */
    private outputLogs(median: number, iteration: number): void {
      const remanningItem = this.totalItems - (iteration + 1);
      const remainingMilliseconds = median * remanningItem;
  
      const remainingSeconds = remainingMilliseconds / 1000;
      const minutesPart = Math.floor(remainingSeconds / 60);
      const secondsPart = Math.floor(remainingSeconds % 60);
  
      console.log(`----------------------------------------------`);
      console.log(`Iteration : ${iteration + 1}`);
      console.log(`Estimate time : ${minutesPart} minutes & ${secondsPart} seconds`);
      console.log(`Estimate time milliseconds : ${remainingMilliseconds}`);
      console.log(`----------------------------------------------`);
    }
  }
  