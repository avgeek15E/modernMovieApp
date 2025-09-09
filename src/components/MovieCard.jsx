
import React from "react";

const MovieCard = ({ movie, onClick }) => {
    const { title, vote_average, poster_path, release_date, original_language } = movie;

    return (
        <div
            className="movie-card bg-gray-800 p-3 rounded-lg shadow hover:scale-105 transition"
            onClick={() => onClick(movie)}
            style={{ cursor: "pointer" }}>
            <img
                src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : `/no-movie.svg`}
                alt={title}
                className="rounded-lg w-full h-[350px] object-cover"/>

            <div className="mt-4">
                <h3 className="text-lg font-semibold">{title}</h3>

                <div className="flex items-center gap-2 text-sm text-gray-300">
                    <div className="rating flex items-center gap-1">
                        <img src={"star.svg"} alt={"star icon"} className="w-4 h-4" />
                        <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                    </div>

                    <span>•</span>

                    <p className="lang uppercase">{original_language}</p>

                    <span>•</span>

                    <p className="year">{release_date ? release_date.split('-')[0] : 'N/A'}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
