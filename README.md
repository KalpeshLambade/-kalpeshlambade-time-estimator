
# TimeEstimator

`TimeEstimator` is a utility class for estimating the remaining time for a set of operations based on the median execution time of previous iterations. It is particularly useful when performing a task that involves processing multiple items and you need to log the estimated remaining time after each operation.

## Installation

To use the `TimeEstimator` class, you can either copy it into your project or install it as a module if you plan to publish it to a package registry.

```bash
npm install @kalpeshlambade/time-estimator
```

## Usage

### Example

```typescript
import { TimeEstimator } from 'time-estimator';

const totalItems = 100; // Total number of items to process
const timeEstimator = new TimeEstimator(totalItems);

// For each iteration, use recordStart(), recordEnd(), and logTimeRemaining
for (let i = 0; i < totalItems; i++) {
  timeEstimator.recordStart();

  // Your processing logic here (e.g., data processing, API calls, etc.)

  timeEstimator.recordEnd();
  timeEstimator.logTimeRemaining(i);
}
```

### Class Methods

#### `constructor(totalItems: number)`

Creates a new `TimeEstimator` instance with the given number of items to process.

- **Arguments:**
  - `totalItems` (number): Total number of items you need to process. Must be a positive number.

- **Throws**: If `totalItems` is not a positive number.

#### `recordStart(): void`

Records the start time of the current iteration. Should be called before starting the task.

#### `recordEnd(): void`

Records the end time of the current iteration. Should be called after finishing the task.

#### `logTimeRemaining(iteration: number): void`

Logs the estimated remaining time for the remaining iterations, based on the median execution time of previous iterations.

- **Arguments:**
  - `iteration` (number): The current iteration number (should be between `0` and `totalItems - 1`).

- **Throws**: If the `iteration` number is not within the valid range (0 to `totalItems - 1`).

### Internal Helper Methods

#### `calculateCentralValue(): number`

Calculates the median of all recorded execution times. This is used to estimate the time remaining for subsequent iterations.

#### `outputLogs(median: number, iteration: number): void`

Outputs the logs displaying the estimated time remaining in both minutes and seconds, as well as in milliseconds.

### Error Handling

- If the `totalItems` parameter is not a positive number, an error will be thrown during instantiation.
- If the `iteration` passed to `logTimeRemaining` is not valid (i.e., outside the range from `0` to `totalItems - 1`), an error will be thrown.

### Example Output

For each iteration, the class will log an output similar to this:

```
----------------------------------------------
Iteration : 5
Estimate time : 15 minutes & 30 seconds
Estimate time milliseconds : 930000
----------------------------------------------
```

- **Iteration**: The current iteration number (starting from 1).
- **Estimate time**: The estimated time remaining for the remaining items, formatted in minutes and seconds.
- **Estimate time milliseconds**: The estimated time in milliseconds.

## Contributing

Feel free to submit issues or pull requests if you have any improvements or bug fixes!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
