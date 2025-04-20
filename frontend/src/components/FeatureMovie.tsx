import {Movie} from "../types/Movie.ts";
import Rating from "./Rating.tsx";
import {Info, Play} from "lucide-react";

interface Props {
    movie: Movie
}


const FeatureMovie = ({movie}: Props) => {
    return (
        <div className="relative h-80">
            <img className="min-w-full h-full object-cover object-center"
                 src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={"movie image"}/>

            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"/>

            <div className="absolute top-10 left-5">
                <div className="flex items-center gap-1">
                    <button className="px-3 py-1 font-bold text-white bg-primary rounded-md">Featured</button>
                    <Rating rating={movie.vote_average} />
                    <p className="text-white">{movie.vote_average.toFixed(1)}/10</p>
                </div>
                <h1 className="font-bold text-3xl text-white mt-5">{movie.title}</h1>
                <p className="text-md text-gray-200 mt-5 me-5 md:w-2/3 line-clamp-3 overflow-ellipsis">{movie.overview}</p>

                <div className="flex items-center gap-3 mt-5">
                    <button className="px-5 py-3 active:bg-indigo-200 transition cursor-pointer font-bold text-white bg-primary rounded-full flex gap-2"><Info /> More Info</button>
                    <button className="px-5 py-3 font-bold active:bg-primary transition cursor-pointer text-black bg-white rounded-full flex gap-2"><Play fill="black" /> Play Video</button>
                </div>
            </div>
        </div>
    );
};

export default FeatureMovie;