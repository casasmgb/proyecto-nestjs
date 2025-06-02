import { MetricasMiddleware } from './metricas.middleware';

describe('MetricasMiddleware', () => {
  it('should be defined', () => {
    expect(new MetricasMiddleware()).toBeDefined();
  });
});
