import { AutenticacionMiddleware } from './autenticacion.middleware';

describe('AutenticacionMiddleware', () => {
  it('should be defined', () => {
    expect(new AutenticacionMiddleware()).toBeDefined();
  });
});
