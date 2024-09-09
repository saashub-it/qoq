import c from 'picocolors';

export class MeasurePerformance {
  constructor() {
    performance.clearMarks();
    performance.mark('start');
  }

  printExecutionTime(): void {
    performance.mark('end');

    const executionTime =
      Math.round(performance.measure('execution', 'start', 'end').duration * 1000) / 1000;

    process.stdout.write(`${c.gray('Detection time:')} ${executionTime}ms\n`);
  }
}
