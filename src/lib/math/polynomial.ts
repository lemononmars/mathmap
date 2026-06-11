export function toPolyString(coeff: number[]) {
   const degree = coeff.length
   return coeff.reduce((prev, curr, idx)=>
      prev 
      + (curr == 0? '': 
         ((curr < 0 || prev == '' )? (curr < 0 ? '-' : '') : '+')
            + ((curr == 1 || curr == -1)? (degree-idx-1 == 0 ? '1' : '') : `${Math.abs(curr)}`)
            + varPower(degree-idx-1
         )
      )
   , ``)
}

function varPower(d: number) {
   if(d == 0) return ''
   if(d == 1) return 'x'
   return `x^${d}`
}

function coeffString(coeff: number, degree: number) {

}