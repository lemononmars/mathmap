import { describe, it, expect, vi, afterEach } from 'vitest';
import { randint, randrange } from './random';

describe('math/random', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('randrange', () => {
        it('should return the minimum value when Math.random() is 0', () => {
            vi.spyOn(Math, 'random').mockReturnValue(0);
            expect(randrange(5, 10)).toBe(5);
            expect(randrange(-10, -5)).toBe(-10);
            expect(randrange(0, 5)).toBe(0);
        });

        it('should return just below the maximum value when Math.random() is just below 1', () => {
            vi.spyOn(Math, 'random').mockReturnValue(0.999999999999999);
            expect(randrange(5, 10)).toBe(9);
            expect(randrange(-10, -5)).toBe(-6);
            expect(randrange(0, 5)).toBe(4);
        });

        it('should return midpoint when Math.random() is 0.5', () => {
            vi.spyOn(Math, 'random').mockReturnValue(0.5);
            expect(randrange(0, 10)).toBe(5);
            expect(randrange(10, 20)).toBe(15);
        });

        it('should handle large bounds', () => {
            vi.spyOn(Math, 'random').mockReturnValue(0.5);
            expect(randrange(0, 1000000)).toBe(500000);
        });
    });

    describe('randint', () => {
        it('should return 0 when Math.random() is 0', () => {
            vi.spyOn(Math, 'random').mockReturnValue(0);
            expect(randint(10)).toBe(0);
            expect(randint(1)).toBe(0);
        });

        it('should return n-1 when Math.random() is just below 1', () => {
            vi.spyOn(Math, 'random').mockReturnValue(0.999999999999999);
            expect(randint(10)).toBe(9);
            expect(randint(5)).toBe(4);
            expect(randint(1)).toBe(0);
        });

        it('should return n/2 when Math.random() is 0.5', () => {
            vi.spyOn(Math, 'random').mockReturnValue(0.5);
            expect(randint(10)).toBe(5);
        });
    });
});
