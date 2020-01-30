import React from 'react';
import { Link, Route } from "react-router-dom";

import UpdateMovie from "./UpdateMovie";


const MovieCard = props => {
  const { title, director, metascore, stars, id } = props.movie;
  const [edit, setEdit]
  
  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
      
      
      
    </div>
  );
};

export default MovieCard;
