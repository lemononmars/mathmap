export function toPolyString(coeff: number[]) {
   if (coeff.length === 0) return '';
   const isAllZero = coeff.every(c => c === 0);
   if (isAllZero) return '0';

   const degree = coeff.length
   let result = '';
   for (let idx = 0; idx < degree; idx++) {
      const curr = coeff[idx];
      if (curr === 0) continue;

      const power = degree - idx - 1;

      // Handle sign
      if (curr > 0 && result !== '') {
         result += '+';
      } else if (curr < 0) {
         result += '-';
      }

      const absCurr = Math.abs(curr);

      // Handle coefficient number
      if (power === 0) {
         result += absCurr;
      } else {
         if (absCurr !== 1) {
            result += absCurr;
         }
         // Handle variable and power
         result += power === 1 ? 'x' : `x^${power}`;
      }
   }
   return result;
}

function varPower(d: number) {
   if(d == 0) return ''
   if(d == 1) return 'x'
   return `x^${d}`
}

function coeffString(coeff: number, degree: number) {

}
