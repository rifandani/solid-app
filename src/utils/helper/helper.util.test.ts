import { deepReadObject, template } from './helper.util';

describe('deepReadObject', () => {
  it('should work correctly', () => {
    const obj = { a: { b: { c: 'hello' } } };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const hello = deepReadObject(obj, 'a.b.c');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const undefinedVal = deepReadObject(obj, 'a.b.d');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const notFound = deepReadObject(obj, 'a.b.d', 'not found');

    expect(hello).toBe('hello');
    expect(undefinedVal).toBeUndefined();
    expect(notFound).toBe('not found');
  });
});

describe('template', () => {
  it('should work correctly', () => {
    const helloTom = template('Hello {{ name }}', { name: 'Tom' });
    const itIsBlue = template('It is {{color}}', { color: 'blue' });
    const itIsBlueRegex = template('It is <color>', { color: 'blue' }, /<(.+?)>/g);

    expect(helloTom).toBe('Hello Tom');
    expect(itIsBlue).toBe('It is blue');
    expect(itIsBlueRegex).toBe('It is blue');
  });
});
