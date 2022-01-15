import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { fetchMovieById } from '../../services/movies-api';
import Loader from '../Loader/Loader';
import MovieCard from '../MovieCard/MovieCard';

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState({});
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const movieId = 646380;

  useEffect(() => {
    setStatus('pending');

    fetchMovieById(movieId)
      .then(data => {
        if (data.results === 0) {
          setStatus('rejected');
          setErrorMessage('Something gone wrong :(');
        } else {
          setMovie(data);
          setStatus('resolved');
        }
      })
      .catch(err => {
        setStatus('rejected');
        setErrorMessage(`There is an error: ${err}`);
      });
  }, [movieId]);

  return (
    <>
      {status === 'pending' && <Loader />}
      {status === 'rejected' && <p className="Msg">{errorMessage}</p>}
      {status === 'resolved' && <MovieCard movie={movie} />}
    </>
  );
}
