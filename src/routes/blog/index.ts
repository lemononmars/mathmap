import {events} from '$lib/data/events'

/** @type {import('./__types/events/index.ts').RequestHandler} */
export async function get({ url }) {
   const tag = url.searchParams.get('tag')
   if(tag) {
      return {
         status: 200,
         body: { 
            events: events.filter(n => n.tags?.includes(tag))
         }
      }
   }
   else {
      return {
         body: { events }
      };
   }
}