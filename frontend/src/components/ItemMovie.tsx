import {Movie} from "../types/Movie.ts";
import Rating from "./Rating.tsx";
import {Dot, Heart, ThumbsUp} from "lucide-react";
import {LikedMovieActionType} from "../state/actions/likedMovieAction.ts";

interface Props {
    movie: Movie;
    isFavorite: boolean;
    onLikeClick: (movie: Movie, actionType: LikedMovieActionType) => void;
}

const ItemMovie = ({movie, isFavorite, onLikeClick}: Props) => {
    return (
        <div
            className="relative cursor-pointer shadow-xl hover:shadow-fuchsia-50 rounded-lg w-55 md:w-60 duration-300 hover:scale-105 transition-all">
            <div className="overflow-hidden group rounded-tl-lg rounded-tr-lg relative">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={"movie image"}
                     className="w-full h-72 duration-500 group-hover:scale-110 transition-transform"/>

                {/* The like icon */}
                <div className="z-10 absolute top-0 right-0 m-2 bg-[rgba(107,114,128,0.5)] rounded-full p-1 cursor-pointer"
                     onClick={() => {
                         onLikeClick(movie, isFavorite ? LikedMovieActionType.Delete : LikedMovieActionType.Save);
                     }}>
                    <Heart fill={`${isFavorite ? "#7C3AED" : "transparent"}`}
                           className={`${isFavorite ? "text-primary" : "text-white"}`}/>
                </div>

                {/*  visible when hovered section */}
                <div
                    className="absolute opacity-0 group-hover:opacity-100 inset-0 transition-opacity duration-200 bg-gradient-to-t from-black via-transparent to-transparent">
                    <div className="absolute bottom-1 l-1 p-4">
                        <h1 className="text-white font-bold text-lg">{movie.title}</h1>
                        <div className="flex items-center">
                            <p className="text-gray-400 text-sm">{movie.release_date.split("-")[0]}</p>
                            <Dot className="text-gray-400"/>
                            <ThumbsUp className="text-secondary"/>
                            <p className="text-sm text-gray-400 ms-2">{movie.vote_count}</p>
                        </div>
                    </div>
                </div>

            </div>

            {/* Details section */}
            <div className="p-2 text-sm">
                <h1 className="text-white font-bold line-clamp-1">{movie.title}</h1>
                <div className="mt-2 flex items-center justify-between">
                    <p className="text-gray-400">{movie.release_date.split("-")[0]}</p>
                    <Rating rating={Number(movie.vote_average.toFixed(1))}/>
                    <p className="text-gray-400">{movie.vote_average.toFixed(1)}/10</p>

                </div>
            </div>
        </div>
    );
};

export default ItemMovie;