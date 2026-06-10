import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function getImageURL(bucket: string, path: string) {
	const { data } = supabase.storage.from(bucket).getPublicUrl(path);
	return data.publicUrl;
}
