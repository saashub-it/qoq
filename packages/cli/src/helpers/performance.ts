import c from 'picocolors';

export class MeasurePerformance {
  constructor(name: string, silent: boolean = false) {
    this.name = `${name} execution time:`;
    this.silent = !!silent;

    console.time(c.italic(c.gray(this.name)));
  }

  printExecutionTime(): void {
    if (!this.silent) {
      console.timeEnd(c.italic(c.gray(this.name)));
    }
  }

  protected name: string;
  protected silent: boolean;
}
