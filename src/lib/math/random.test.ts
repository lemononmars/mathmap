import { describe, it, expect } from 'vitest';
import { randint, randrange } from './random';

describe('random module', () => {
    describe('randrange', () => {
        it('should return integers within the specified range [a, b)', () => {
            const a = 5;
            const b = 10;
            const results = new Set<number>();
            for (let i = 0; i < 1000; i++) {
                const val = randrange(a, b);
                expect(val).toBeGreaterThanOrEqual(a);
                expect(val).toBeLessThan(b);
                expect(Number.isInteger(val)).toBe(true);
                results.add(val);
            }

            // Check that it generates all possible integers in the range
            expect(results.size).toBe(b - a);
            for (let i = a; i < b; i++) {
                expect(results.has(i)).toBe(true);
            }
        });

        it('should handle negative ranges [a, b)', () => {
            const a = -10;
            const b = -5;
            const results = new Set<number>();
            for (let i = 0; i < 1000; i++) {
                const val = randrange(a, b);
                expect(val).toBeGreaterThanOrEqual(a);
                expect(val).toBeLessThan(b);
                expect(Number.isInteger(val)).toBe(true);
                results.add(val);
            }

            expect(results.size).toBe(b - a);
            for (let i = a; i < b; i++) {
                expect(results.has(i)).toBe(true);
            }
        });
    });

    describe('randint', () => {
        it('should return integers within the specified range [0, n)', () => {
            const n = 5;
            const results = new Set<number>();
            for (let i = 0; i < 1000; i++) {
                const val = randint(n);
                expect(val).toBeGreaterThanOrEqual(0);
                expect(val).toBeLessThan(n);
                expect(Number.isInteger(val)).toBe(true);
                results.add(val);
            }

            expect(results.size).toBe(n);
            for (let i = 0; i < n; i++) {
                expect(results.has(i)).toBe(true);
            }
        });
    });
});
