import { describe, it, expect, vi, afterEach } from 'vitest';
import { randint, randrange } from '../random';

describe('random', () => {
   afterEach(() => {
      vi.restoreAllMocks();
   });

   describe('randrange', () => {
      it('should return the lower bound when Math.random is 0', () => {
         vi.spyOn(Math, 'random').mockReturnValue(0);
         expect(randrange(5, 10)).toBe(5);
      });

      it('should return one less than the upper bound when Math.random is almost 1', () => {
         // Using 0.999999999999999 because 0.9999999999999999 * 5 can round up to 5 due to floating point precision
         vi.spyOn(Math, 'random').mockReturnValue(0.999999999999999);
         expect(randrange(5, 10)).toBe(9);
      });

      it('should return a value in the middle range for a moderate random value', () => {
         vi.spyOn(Math, 'random').mockReturnValue(0.5);
         expect(randrange(5, 10)).toBe(7);
      });

      it('should work with negative bounds', () => {
         vi.spyOn(Math, 'random').mockReturnValue(0.5);
         expect(randrange(-10, -5)).toBe(-8); // Math.floor((0.5 * 5) + -10) = Math.floor(2.5 - 10) = Math.floor(-7.5) = -8
      });

      it('should return the single value when min and max are equal', () => {
         vi.spyOn(Math, 'random').mockReturnValue(0.8);
         expect(randrange(5, 5)).toBe(5);
      });

      it('should work when lower bound is strictly greater than upper bound (reversing limits mathematically)', () => {
          // b - a will be negative
          vi.spyOn(Math, 'random').mockReturnValue(0);
          expect(randrange(10, 5)).toBe(10); // Math.floor(0 * -5 + 10) = 10
          vi.spyOn(Math, 'random').mockReturnValue(0.999999999999999);
          expect(randrange(10, 5)).toBe(5); // Math.floor(0.999999999999999 * -5 + 10) = Math.floor(-4.999999999999995 + 10) = Math.floor(5.000000000000005) = 5
      });
   });

   describe('randint', () => {
      it('should return 0 when Math.random is 0', () => {
         vi.spyOn(Math, 'random').mockReturnValue(0);
         expect(randint(10)).toBe(0);
      });

      it('should return one less than the bound when Math.random is almost 1', () => {
         vi.spyOn(Math, 'random').mockReturnValue(0.999999999999999);
         expect(randint(10)).toBe(9);
      });

      it('should return a value in the range', () => {
         vi.spyOn(Math, 'random').mockReturnValue(0.5);
         expect(randint(10)).toBe(5);
      });

      it('should return 0 when upper bound is 0', () => {
         vi.spyOn(Math, 'random').mockReturnValue(0.8);
         expect(randint(0)).toBe(0);
      });
   });
});
