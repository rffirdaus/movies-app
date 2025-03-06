import React from "react";
// import MovieSearch from "./components/MovieSearch";
import Pokemon from "./components/PokemonSearch";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Movie Search</h1>
        {/* <MovieSearch /> */}
        <Pokemon />
      </div>
    </QueryClientProvider>
  );
};

export default App;
