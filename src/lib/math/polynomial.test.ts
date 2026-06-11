import { describe, it, expect } from 'vitest';
import { toPolyString } from './polynomial.js';

describe('toPolyString', () => {
    it('handles basic polynomials', () => {
        expect(toPolyString([1, 2, 3])).toBe('x^2+2x+3');
        expect(toPolyString([2, 3, 4])).toBe('2x^2+3x+4');
    });

    it('handles zero coefficients', () => {
        expect(toPolyString([1, 0, 3])).toBe('x^2+3');
        expect(toPolyString([0, 2, 3])).toBe('2x+3');
        expect(toPolyString([1, 2, 0])).toBe('x^2+2x');
        expect(toPolyString([0, 0, 0])).toBe('');
    });

    it('handles negative coefficients', () => {
        expect(toPolyString([1, -2, -3])).toBe('x^2-2x-3');
        expect(toPolyString([2, -3, 4])).toBe('2x^2-3x+4');
    });

    it('handles leading negative coefficients', () => {
        expect(toPolyString([-1, 2])).toBe('-x+2');
        expect(toPolyString([-2, 3, 4])).toBe('-2x^2+3x+4');
    });

    it('handles coefficient of 1 or -1', () => {
        expect(toPolyString([1, -1])).toBe('x-1');
        expect(toPolyString([-1, 1])).toBe('-x+1');
        expect(toPolyString([1, 1, 1])).toBe('x^2+x+1');
        expect(toPolyString([-1, -1, -1])).toBe('-x^2-x-1');
    });

    it('handles single constants', () => {
        expect(toPolyString([5])).toBe('5');
        expect(toPolyString([-5])).toBe('-5');
        expect(toPolyString([0])).toBe('');
    });

    it('handles higher degrees', () => {
        expect(toPolyString([1, 0, 0, 0])).toBe('x^3');
        expect(toPolyString([-1, 0, 0, 0, 0])).toBe('-x^4');
        expect(toPolyString([2, 0, 0, 5, 0])).toBe('2x^4+5x');
    });
});
