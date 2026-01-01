
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../constants';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const fetchWatchlist = async () => {
  const { data, error } = await supabase
    .from('watchlist')
    .select('*');
  
  if (error) throw error;
  return data;
};

export const addToWatchlist = async (coinId: string) => {
  const { data, error } = await supabase
    .from('watchlist')
    .insert([{ coin_id: coinId }])
    .select();
  
  if (error) throw error;
  return data;
};

export const removeFromWatchlist = async (coinId: string) => {
  const { error } = await supabase
    .from('watchlist')
    .delete()
    .eq('coin_id', coinId);
  
  if (error) throw error;
};
