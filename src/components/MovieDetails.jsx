
import React from "react";
import { GENRE_MAP } from "./genres";

const MovieDetails = ({ selectedMovie, closeModal }) => {
    const { title, vote_average, poster_path, release_date, original_language, overview, vote_count, genre_ids } = selectedMovie;

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
            onClick={closeModal}>
            <div
                className="bg-gray-900 text-white rounded-xl p-6 w-[90%] max-w-4xl flex gap-6 shadow-xl"
                onClick={(e) => e.stopPropagation()}>
                {/* Poster */}
                <img
                    src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : "/no-movie.svg"}
                    alt={title}
                    className="w-[250px] rounded-lg object-cover"/>

                {/* Details */}
                <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-4">{title}</h2>
                    <p className="mb-4 text-gray-300">{overview || "No description available."}</p>

                    <div className="flex flex-col gap-6 text-sm text-gray-300">
                        {/* Stats section */}
                        <div className="grid grid-cols-2 gap-4">
                            <p>
                                <strong className="text-white">Rating:</strong>{" "}
                                {vote_average ? vote_average.toFixed(1) : "N/A"}
                            </p>
                            <p>
                                <strong className="text-white">Votes:</strong>{" "}
                                {vote_count || "N/A"}
                            </p>
                            <p>
                                <strong className="text-white">Language:</strong>{" "}
                                {original_language?.toUpperCase()}
                            </p>
                            <p>
                                <strong className="text-white">Release:</strong>{" "}
                                {release_date || "N/A"}
                            </p>
                        </div>

                        {/* Genres */}
                        <div className="flex flex-wrap gap-2">
                            {genre_ids?.map((id) => (
                                <span
                                    key={id}
                                    className="px-3 py-1 bg-gray-700/70 backdrop-blur-sm rounded-full text-xs text-gray-200"
                                >
                  {GENRE_MAP[id] || "Unknown"}
                </span>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={closeModal}
                        className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
