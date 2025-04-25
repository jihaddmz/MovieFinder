import ItemMovie from "../components/ItemMovie.tsx";
import FeatureMovie from "../components/FeatureMovie.tsx";
import SearchBar from "../components/SearchBar.tsx";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader.tsx";
import likedMovieAction from "../state/actions/likedMovieAction.ts";
import {AppDispatch, RootState} from "../state/store.ts";
import fetchFavoritesAction from "../state/actions/fetchFavoritesAction.ts";
import fetchMoviesAction from "../state/actions/fetchMoviesAction.ts";

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {likedMovies, error: likesError} = useSelector((state: RootState) => state.likes);
    const {movies, featured, loading, error} = useSelector((state: RootState) => state.movies);
    const [search, setSearch] = useState("");
    const [prevSearch, setPrevSearch] = useState("");

    useEffect(() => {
        if (movies.length === 0) {
            dispatch(fetchMoviesAction(""));
        }

        if (likedMovies.length === 0) {
            dispatch(fetchFavoritesAction(1));
        }
    }, [])

    useEffect(() => {
        const currentError = error ? error : likesError;
        if (currentError) {
            // alert(error);
            alert(currentError);
            // navigate("/error", {state: {statusCode: 500, message: currentError}});
        }
    }, [error, likesError])

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (search)
                dispatch(fetchMoviesAction(search));
            else if (prevSearch) { // ensuring that this call happens only when the user has searched before, so we reset the data state
                dispatch(fetchMoviesAction(""));
            }
            setPrevSearch(search);
        }, 700)

        return () => clearTimeout(timeoutId);
    }, [search, dispatch])

    return (
        <div className="relative">
            {/*<Navbar/>*/}

            {loading && (
                <Loader/>
            )}

            {featured && (
                <FeatureMovie
                    movie={featured}/>
            )}

            {movies.length > 0 && (
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
                                movies.map((movie) => (
                                    <div key={movie.id} className="max-sm:flex max-sm:justify-center max-sm:mb-5">
                                        <ItemMovie key={movie.id} movie={movie}
                                                   isFavorite={likedMovies.find((mov) => movie.id === mov.id) != null}
                                                   onLikeClick={(clickedMovie, actionType) => {
                                                       dispatch(likedMovieAction({
                                                           movieId: clickedMovie.id,
                                                           userId: 1,
                                                           goal: actionType
                                                       }))
                                                   }}/>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                </section>
            )}


        </div>
    );
};

export default Home;