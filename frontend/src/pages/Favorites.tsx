import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../state/store.ts";
import {useEffect} from "react";
import fetchFavoritesAction from "../state/actions/fetchFavoritesAction.ts";
import ItemMovie from "../components/ItemMovie.tsx";
import Loader from "../components/Loader.tsx";
import likedMovieAction from "../state/actions/likedMovieAction.ts";

const Favorites = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {likedMovies, loading, error} = useSelector((state: RootState) => state.likes);

    useEffect(() => {
        if (likedMovies.length === 0)
            dispatch(fetchFavoritesAction(1)); // static user id to 1
    }, [])

    useEffect(() => {
        if (error) {
            alert(error);
        }
    }, [error])

    return (
        <div>
            {/*<Navbar/>*/}

            {/* Showing loader when fetching data*/}
            {loading && (
                <Loader/>
            )}


            <div className="p-5">

                {likedMovies.length > 0 && (
                    <section>

                        <h1 className="text-white font-bold text-3xl mt-10">Your Favorites</h1>
                        <div
                            className="mt-7 flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {
                                likedMovies.map((movie) => (
                                    <div key={movie.id} className="max-sm:flex max-sm:justify-center max-sm:mb-5">
                                        <ItemMovie key={movie.id} movie={movie} isFavorite={true}
                                                   onLikeClick={(clickedMovie, actionType) => {
                                                       dispatch(likedMovieAction({
                                                           userId: 1,
                                                           movieId: clickedMovie.id,
                                                           goal: actionType
                                                       }))
                                                   }}/>
                                    </div>
                                ))
                            }
                        </div>

                    </section>
                )}

            </div>
        </div>
    );
};

export default Favorites;