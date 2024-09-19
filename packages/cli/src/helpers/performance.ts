import c from 'picocolors';

export class MeasurePerformance {
  constructor(stdout: boolean = true) {
    this.stdout = stdout;

    performance.clearMarks();
    performance.mark('start');
  }

  printExecutionTime(): void {
    performance.mark('end');

    const executionTime =
      Math.round(performance.measure('execution', 'start', 'end').duration * 1000) / 1000;

    if (this.stdout) {
      process.stdout.write(`${c.gray('Detection time:')} ${executionTime}ms\n`);
    }
  }

  protected stdout: boolean;
}
