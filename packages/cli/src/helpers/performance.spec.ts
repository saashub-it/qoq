import { describe, it, expect, vi } from 'vitest';

import { MeasurePerformance } from './performance';


describe('MeasurePerformance', () => {
  describe('printExecutionTime', () => {
    it('marks the end of the performance measurement', () => {
      const measurePerformance = new MeasurePerformance();
      measurePerformance.printExecutionTime();
      expect(performance.getEntriesByName('end')).toHaveLength(1);
    });

    it('writes the execution time to the console', () => {
      const measurePerformance = new MeasurePerformance();
      const writeSpy = vi.spyOn(process.stdout, 'write');
      measurePerformance.printExecutionTime();
      expect(writeSpy).toHaveBeenCalledTimes(1);
      expect(writeSpy.mock.calls[0][0]).toContain('Detection time:');
    });
  });
});