import { supabase } from './supabase';

export const updateSearchCount = async (searchTerm, movie) => {
  try {
    // Get current user session
    const { data: { session } } = await supabase.auth.getSession();
    const user_email = session?.user?.email || null;

    // Check if the search term exists
    const { data: existing, error: fetchError } = await supabase
      .from('trending_movies')
      .select('*')
      .eq('searchTerm', searchTerm)
      .limit(1);

    if (fetchError) throw fetchError;

    if (existing && existing.length > 0) {
      // Update count
      const doc = existing[0];
      await supabase
        .from('trending_movies')
        .update({ count: doc.count + 1 })
        .eq('id', doc.id);
    } else {
      // Insert new
      await supabase
        .from('trending_movies')
        .insert([
          {
            searchTerm,
            count: 1,
            movie_id: movie.id,
            poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            title: movie.title,
            release_date: movie.release_date,
            vote_average: movie.vote_average,
            user_email,
          },
        ]);
    }
  } catch (error) {
    console.error(error);
  }
};

export const getTrendingMovies = async () => {
  try {
    const { data, error } = await supabase
      .from('trending_movies')
      .select('*')
      .order('count', { ascending: false })
      .limit(5);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};