import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MovieSearch from "./MovieSearch";

const queryClient = new QueryClient();

test("renders search input", () => {
  render(
    <QueryClientProvider client={queryClient}>
      <MovieSearch />
    </QueryClientProvider>
  );

  const inputElement = screen.getByPlaceholderText(/search for a movie/i);
  expect(inputElement).toBeInTheDocument();
});

test("updates input value on typing", () => {
  render(
    <QueryClientProvider client={queryClient}>
      <MovieSearch />
    </QueryClientProvider>
  );

  const inputElement = screen.getByPlaceholderText(/search for a movie/i);
  fireEvent.change(inputElement, { target: { value: "Batman" } });
  expect(inputElement).toHaveValue("Batman");
});
