import { useEffect, useState } from 'react'
import { supabase } from './supabase';
import AuthComponent from './AuthComponent';
import Search from './components/Search.jsx'
import Spinner from './components/Spinner.jsx'
import MovieCard from './components/MovieCard.jsx'
import { useDebounce } from 'react-use'
import { getTrendingMovies, updateSearchCount } from './db.js'

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [searchTerm, setSearchTerm] = useState('');

  const [movieList, setMovieList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Debounce the search term to prevent making too many API requests
  // by waiting for the user to stop typing for 500ms
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

  const fetchMovies = async (query = '', page = 1) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`;

      const response = await fetch(endpoint, API_OPTIONS);

      if(!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();

      if(data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        setTotalPages(1);
        return;
      }

      setMovieList(data.results || []);
      setTotalPages(data.total_pages || 1);

      if(query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      if (Array.isArray(movies)) {
        setTrendingMovies(movies);
      } else {
        setTrendingMovies([]);
      }
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
      setTrendingMovies([]);
    }
  }

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    fetchMovies(debouncedSearchTerm, currentPage);
  }, [debouncedSearchTerm, currentPage]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  if (!session) {
    return <AuthComponent />;
  }

  return (
    <main>
      <div className="pattern"/>
      <div className="wrapper">
        <header>
          <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <img src="./hero.png" alt="Hero Banner" />
            <button onClick={async () => { await supabase.auth.signOut(); }} style={{ padding: '0.5rem 1rem', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Sign Out
            </button>
          </nav>
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className="trending">
          <h2>Trending Movies</h2>
          {Array.isArray(trendingMovies) && trendingMovies.length > 0 ? (
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.id || movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: '#888', margin: '1rem 0' }}>No trending movies found.</p>
          )}
        </section>
        <section className="all-movies">
          <h2>All Movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <>
              <ul>
                {movieList.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, margin: '2rem 0 0 0' }}>
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  style={{ padding: '0.5rem 1rem', borderRadius: 4, border: '1px solid #0ea5e9', background: currentPage === 1 ? '#e5e7eb' : '#0ea5e9', color: currentPage === 1 ? '#64748b' : '#fff', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', fontWeight: 600 }}
                >
                  Previous
                </button>
                <span style={{ color: '#0ea5e9', fontWeight: 600 }}>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  style={{ padding: '0.5rem 1rem', borderRadius: 4, border: '1px solid #0ea5e9', background: currentPage === totalPages ? '#e5e7eb' : '#0ea5e9', color: currentPage === totalPages ? '#64748b' : '#fff', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', fontWeight: 600 }}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </section>
      </div>
      <footer style={{
        width: '100%',
        background: '#1e293b',
        color: '#fff',
        textAlign: 'center',
        padding: '1.5rem 0 1rem 0',
        marginTop: '3rem',
        borderTopLeftRadius: '1.5rem',
        borderTopRightRadius: '1.5rem',
        fontSize: 16,
        letterSpacing: 0.5,
        boxShadow: '0 -2px 16px rgba(0,0,0,0.08)'
      }}>
        <span>
          &copy; {new Date().getFullYear()} MovieApp &mdash; Built with <span style={{ color: '#0ea5e9', fontWeight: 600 }}>React</span> & <span style={{ color: '#0ea5e9', fontWeight: 600 }}>Supabase</span>
        </span>
      </footer>
    </main>
  );
}

export default App
