import React, { useState } from "react";
import Movie from "./Movie";
import { css } from "@emotion/core";
import DotLoader from "react-spinners/DotLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #36D7B7;
`;

function SearchMovies() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchMovies = async (e) => {
    e.preventDefault();
    setLoading(true)
    const url = `https://api.themoviedb.org/3/search/movie?api_key=2f31d79ce24c808ff7764fd45cb5814d&language=en-US&query=${query}&page=1&include_adult=false`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      setMovies(data.results);
      setLoading(false)
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="sweet-loading">
        <DotLoader
          css={override}
          size={150}
          color={"rgba(0,0,0,0.85);"}
          loading={loading}
        />
      </div>
      <form className="form" onSubmit={searchMovies}>
        <label htmlFor="query" className="label">
          Movie Name
        </label>
        <input
          className="input"
          type="text"
          name="query"
          placeholder="i.e. Jurassic Par"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        ></input>
        <button type="submit" className="button">
          Search
        </button>
      </form>

      <div className="card-list">
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
      </div>
    </>
  );
}

export default SearchMovies;
