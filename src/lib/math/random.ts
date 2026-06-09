export function randint(n: number) {
   return randrange(0, n)
}

export function randrange(a: number, b: number) {
   return Math.floor((Math.random() * (b-a)) + a)
}