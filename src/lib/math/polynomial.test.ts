import { describe, it, expect } from 'vitest';
import { toPolyString } from './polynomial';

describe('toPolyString', () => {
    it('returns empty string for empty array', () => {
        expect(toPolyString([])).toBe('');
    });

    it('returns "0" string for single zero', () => {
        expect(toPolyString([0])).toBe('0');
    });

    it('returns "0" string for multiple zeros', () => {
        expect(toPolyString([0, 0])).toBe('0');
    });

    it('handles single positive coefficient', () => {
        expect(toPolyString([1])).toBe('1');
    });

    it('handles single negative coefficient', () => {
        expect(toPolyString([-1])).toBe('-1');
    });

    it('handles positive coefficients', () => {
        expect(toPolyString([1, 1])).toBe('x+1');
    });

    it('handles negative and zero coefficients', () => {
        expect(toPolyString([-1, 0, -1])).toBe('-x^2-1');
    });

    it('handles mixed signs', () => {
        expect(toPolyString([1, -1])).toBe('x-1');
    });

    it('handles regular polynomial', () => {
        expect(toPolyString([2, -3, 4])).toBe('2x^2-3x+4');
    });
});
