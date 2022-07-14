import { createClient } from '@supabase/supabase-js';
import type {PuzzleType} from '$lib/interfaces'

type SupaStorageBucket = 'puzzles' | 'events' | 'assets';
const DIR_IMAGE = 'https://ojjggolcfmjnovmipaav.supabase.in/storage/v1/object/';

export const supabaseClient = createClient(
	String(import.meta.env.VITE_SUPABASE_URL),
	String(import.meta.env.VITE_SUPABASE_ANON_KEY)
);

/**
 * Convenience re-exports for typed selections
 *
 */
// export const auth = supabaseClient.auth;
export const storage = supabaseClient.storage;

/**
 *
 * @param table The Supabase table to act upon
 * @returns {data, error}
 */
export const from = (table: string) => supabaseClient.from(table);
/**
 *
 * @param bucket The Supabase storage bucket to act upon
 * @returns url
 */
export const fromBucket = (bucket: SupaStorageBucket) => supabaseClient.storage.from(bucket);

export function getImageURL(type: SupaStorageBucket, url: string) {
	return fromBucket(type).getPublicUrl(url).data?.publicURL
}

export function getPuzzleImageURL(type: PuzzleType, url: string) {
	return fromBucket('puzzles').getPublicUrl(type + '/' + url).data?.publicURL
}