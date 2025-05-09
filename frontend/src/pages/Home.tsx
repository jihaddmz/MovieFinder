import ItemMovie from "../components/ItemMovie.tsx";
import FeatureMovie from "../components/FeatureMovie.tsx";
import SearchBar from "../components/SearchBar.tsx";
import {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader.tsx";
import likedMovieAction from "../state/actions/likedMovieAction.ts";
import {AppDispatch, RootState} from "../state/store.ts";
import fetchFavoritesAction from "../state/actions/fetchFavoritesAction.ts";
import fetchSearchMoviesAction from "../state/actions/fetchSearchMoviesAction.ts";
import {isSignedIn} from "../config/helpers.ts";
import fetchMoviesAction from "../state/actions/fetchMoviesAction.ts";
import {incrementPage, resetSearchedMovies} from "../state/slices/moviesSlice.ts";
import ErrorAlert from "../components/ErrorAlert.tsx";

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {likedMovies, error: likesError} = useSelector((state: RootState) => state.likes);
    const {
        movies,
        searchedMovies,
        featured,
        page,
        hasMoreMovies,
        loading,
        error: moviesError,
    } = useSelector((state: RootState) => state.movies);
    const [search, setSearch] = useState("");
    const element = useRef<HTMLDivElement>(null);
    const observer = useRef<IntersectionObserver | null>(null);
    const hasFetched = useRef(false)
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setError(likesError ? likesError : moviesError ? moviesError : null);
    }, [likesError, moviesError]);

    useEffect(() => {
        if (likedMovies.length === 0 && isSignedIn()) {
            dispatch(fetchFavoritesAction(Number(localStorage.getItem("userId"))));
        }
    }, [])

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (search)
                dispatch(fetchSearchMoviesAction(search));
            else {
                dispatch(resetSearchedMovies());
            }
        }, 700)

        return () => clearTimeout(timeoutId);
    }, [search, dispatch])

    useEffect(() => {
        if (!hasFetched.current || page != 0) { // so we are ensuring this is executed only one time per screen visit or when page got changed
            hasFetched.current = true;
            dispatch(fetchMoviesAction(page))
        }
    }, [page, dispatch]);

    // This is the last movie div that is being observed when entering in to viewport, and has more movies to fetch, increment the page
    // triggering fetching of movies. Before that, if its currently loading, exit and if observing div element before, cancel
    // that and re-observe the last movie div
    const lastMovieRef = useCallback((node: HTMLDivElement | null) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMoreMovies) {
                dispatch(incrementPage());
            }
        });

        if (node) observer.current.observe(node);
    }, [loading, hasMoreMovies, dispatch]);

    return (
        <div className="relative">
            {/*<Navbar/>*/}

            {loading && (
                <Loader/>
            )}

            {error && <ErrorAlert text={error} onClick={() => setError(null)} />}

            {featured && (
                <FeatureMovie
                    movie={featured}/>
            )}

            {/* displaying the movies retrieved after searching*/}
            {searchedMovies.length > 0 && (
                <section>

                    <div className="mt-10 w-full max-md:px-10 md:w-1/2 md:translate-x-1/2">
                        <SearchBar value={search} onChange={setSearch}/>
                    </div>

                    <br/>

                    <div className="p-5">
                        <h1 className="text-white font-bold text-3xl">Browse Movies</h1>
                        <div
                            className="mt-7 flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {
                                searchedMovies.map((movie) => {
                                    return <div key={movie.id}
                                                className="max-sm:flex max-sm:justify-center max-sm:mb-5">
                                        <ItemMovie movie={movie}
                                                   isFavorite={likedMovies.find((mov) => movie.id === mov.id) != null}
                                                   onLikeClick={(clickedMovie, actionType) => {
                                                       if (isSignedIn()) {
                                                           dispatch(likedMovieAction({
                                                               movieId: clickedMovie.id,
                                                               userId: Number(localStorage.getItem("userId")),
                                                               goal: actionType
                                                           }))
                                                       } else
                                                           setError("You should sign in before!")
                                                   }}/>
                                    </div>
                                })
                            }
                        </div>
                    </div>

                </section>
            )}


            {/* displaying the movies fetched*/}
            {movies.length > 0 && searchedMovies.length == 0 && (
                <section>

                    <div className="mt-10 w-full max-md:px-10 md:w-1/2 md:translate-x-1/2">
                        <SearchBar value={search} onChange={setSearch}/>
                    </div>

                    <br/>

                    <div className="p-5">
                        <h1 className="text-white font-bold text-3xl">Browse Movies</h1>
                        <div
                            className="mt-7 flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {
                                movies.map((movie) => {
                                    return <div ref={lastMovieRef} key={movie.id}
                                                className="max-sm:flex max-sm:justify-center max-sm:mb-5">
                                        <ItemMovie movie={movie}
                                                   isFavorite={likedMovies.find((mov) => movie.id === mov.id) != null}
                                                   onLikeClick={(clickedMovie, actionType) => {
                                                       if (isSignedIn()) {
                                                           dispatch(likedMovieAction({
                                                               movieId: clickedMovie.id,
                                                               userId: Number(localStorage.getItem("userId")),
                                                               goal: actionType
                                                           }))
                                                       } else {
                                                           setError("You should sign in before!")
                                                       }
                                                   }}/>
                                    </div>
                                })
                            }
                        </div>
                    </div>

                </section>
            )}


            <div ref={element} className="h-10"/>
        </div>
    );
};

export default Home;