import { template } from './helper.util';

describe('template', () => {
  it('should work correctly', () => {
    const helloTom = template('Hello {{name}}', { name: 'Tom' });
    const itIsBlue = template('It is {{color}}', { color: 'blue' });
    const itIsBlueRegex = template('It is <color>', { color: 'blue' }, /<(.+?)>/g);

    expect(helloTom).toBe('Hello Tom');
    expect(itIsBlue).toBe('It is blue');
    expect(itIsBlueRegex).toBe('It is blue');
  });
});
