import { from } from '$lib/supabase';
import type { Leaderboard } from '$lib/interfaces'
import { sendhook} from '$lib/discord'
/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function post( {request} ){
	const submission: Leaderboard = await request.json()
	const {name, puzzle_type, puzzle_id, score} = submission

	const {data, error} = await from('leaderboard').insert(submission)

   if(error) {
 	   sendhook(
         'error submitting ' + puzzle_type + '/' + puzzle_id
      )
      return error
   }

   sendhook(
      ':game_die: ' + puzzle_type + '/' + puzzle_id + ' solved by ' + name + ' - ' + score
   )
	return data
}