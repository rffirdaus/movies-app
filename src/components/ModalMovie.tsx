import React from "react";
import { Dialog } from "@headlessui/react";

interface MovieModalProps {
  isOpen: boolean;
  onClose: () => void;
  movie: {
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
  } | null;
}

const MovieModal: React.FC<MovieModalProps> = ({ isOpen, onClose, movie }) => {
  if (!movie) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-black bg-opacity-50 fixed inset-0" onClick={onClose}></div>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full z-10 
      max-h-[80vh] overflow-y-auto relative">

        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-black">
          ✖
        </button>

        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-1/2 rounded-md"
        />
        <h2 className="text-xl font-bold mt-2">{movie.title}</h2>
        <p className="text-sm text-gray-600">Release Date: {movie.release_date}</p>
        <p className="text-sm text-gray-600">Rating: {movie.vote_average} / 10</p>
        <p className="mt-2">{movie.overview}</p>
      </div>
    </Dialog>
  );
};

export default MovieModal;
