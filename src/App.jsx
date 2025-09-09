import './App.css';
import Search from './components/Search.jsx';
import { useState, useEffect } from 'react';
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import MovieDetails from "./components/MovieDetails.jsx";
import { useDebounce } from 'react-use';
import { GENRE_NAME_TO_ID } from "./components/genres";


const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [debounceSearchTerm, setDebounceSearchTerm] = useState('');
    const [selectedMovie, setSelectedMovie] = useState(null);

    const handleMovieClick = (movie) => setSelectedMovie(movie);
    const closeModal = () => setSelectedMovie(null);

    useDebounce(() => setDebounceSearchTerm(searchTerm), 500, [searchTerm]);

    const fetchMovies = async (query = '') => {
        setIsLoading(true);
        setErrorMessage('');

        try {
            const genreId = GENRE_NAME_TO_ID[query.toLowerCase()];
            let endpoint = '';

            if (genreId) {
                endpoint = `${API_BASE_URL}/discover/movie?with_genres=${genreId}&api_key=${API_KEY}`;
            } else if (query) {
                endpoint = `${API_BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
            } else {
                endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
            }

            const response = await fetch(endpoint);
            if (!response.ok) throw new Error('Failed to fetch movies');

            const data = await response.json();
            setMovieList(data.results || []);
        } catch (e) {
            console.error(`Error fetching movies: ${e}`);
            setErrorMessage('Error in fetching movies. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies(debounceSearchTerm);
    }, [debounceSearchTerm]);

    return (
        <>
            <div className="pattern" />

            <div className="wrapper">
                <header>
                    <img src="/hero.png" alt="Hero Banner" />
                    <h1>
                        Find <span className="text-gradient">Movies</span> for your{' '}
                        <span className="text-blue-400">Movie Night!!</span>
                    </h1>

                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                    {/*{!searchTerm && <TrendMovies movies={trendMovies} />}*/}
                </header>

                <section className="all-movies">
                    <h2 className="mt-[40px] text-white">All Movies</h2>

                    {isLoading ? (
                        <Spinner />
                    ) : errorMessage ? (
                        <p className="text-red-400">{errorMessage}</p>
                    ) : (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {movieList.length > 0 ? (
                                movieList.map((movie) => (
                                    <MovieCard
                                        key={movie.id}
                                        movie={movie}
                                        onClick={handleMovieClick}
                                    />
                                ))
                            ) : (
                                <p className="text-white">No movies found.</p>
                            )}
                        </ul>
                    )}

                    {selectedMovie && (
                        <MovieDetails selectedMovie={selectedMovie} closeModal={closeModal} />
                    )}
                </section>
            </div>
        </>
    );
}

export default App;
