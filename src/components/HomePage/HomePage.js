import React, { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../../services/movies-api';
import Loader from '../Loader/Loader';
import MoviesGallery from '../MoviesGallery/MoviesGallery';
import Button from '../Button/Button';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState('idle');
  const [pageNumber, setPageNumber] = useState(1);
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setStatus('pending');

    fetchTrendingMovies(pageNumber)
      .then(data => {
        if (data.results.length === 0) {
          setStatus('rejected');
          setErrorMessage('Something gone wrong :(');
        } else {
          const totalPages = Math.ceil(data.total_pages / 12);
          const usableMovieKeysArr = data.results.map(
            ({ id, poster_path, title, release_date }) => {
              return {
                id,
                poster_path,
                title,
                release_date,
              };
            },
          );

          setMovies(prevMovies => [...prevMovies, ...usableMovieKeysArr]);
          setStatus('resolved');
          setShowLoadMoreBtn(totalPages === pageNumber ? false : true);
        }
      })
      .catch(err => {
        setStatus('rejected');
        setErrorMessage(`There is an error: ${err}`);
      });

    window.scrollTo({
      top: document.documentElement.scrollHeight - window.innerHeight,
      behavior: 'smooth',
    }); /* скрол на півекрану вниз */
  }, [pageNumber]);

  const onLoadMore = () => {
    setPageNumber(pageNumber + 1);
    setStatus('pending');
  };

  return (
    <>
      {status === 'pending' && (
        <>
          {movies.length !== 0 && <MoviesGallery moviesArr={movies} />}
          <div style={{ height: '80vh' }}>
            <Loader />
          </div>
        </>
      )}
      {status === 'rejected' && <p>{errorMessage}</p>}
      {status === 'resolved' && (
        <>
          <MoviesGallery moviesArr={movies} />
          {showLoadMoreBtn && <Button onLoadMore={onLoadMore} />}
        </>
      )}
    </>
  );
}
