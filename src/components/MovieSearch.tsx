/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies, MoviesResponse } from "../api/movies";
import MovieModal from "./ModalMovie";

const MovieSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useQuery<MoviesResponse>({
    queryKey: ["movies", query, page, perPage],
    queryFn: () => fetchMovies(query, page, perPage),
    placeholderData: (previousData) => previousData,
  });

  const openModal = (movie: any) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const movies = data?.movies ?? [];
  const totalResults = data?.totalResults ?? 0;
  const totalPages = Math.ceil(totalResults / perPage);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
      <div className="max-w-2xl mx-auto p-6 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg">
        <input
          type="text"
          placeholder="Search for a movie..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <div className="flex justify-between items-center mt-4 text-gray-300 text-sm">
          <span>Showing {movies.length} results</span>
          <span>
            Page {page} of {totalPages}
          </span>
        </div>

        {isLoading && <p className="text-center text-gray-400">Loading...</p>}
        {error && (
          <p className="text-center text-red-400">Error fetching data.</p>
        )}

        <ul className="mt-4 divide-y divide-gray-500">
          {movies.map((movie) => (
            <li
              key={movie.id}
              className="p-4 hover:bg-blue-500 hover:bg-opacity-30 transition cursor-pointer rounded-lg"
              onClick={() => openModal(movie)}
            >
              {movie.title}
            </li>
          ))}
        </ul>

        <div className="flex justify-between mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-500 transition"
          >
            Previous
          </button>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-500 transition"
          >
            Next
          </button>
        </div>
        <MovieModal
          isOpen={isModalOpen}
          onClose={closeModal}
          movie={selectedMovie}
        />
      </div>
    </div>
  );
};

export default MovieSearch;
