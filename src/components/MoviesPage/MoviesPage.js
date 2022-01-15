import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { fetchSearchingMovies } from '../../services/movies-api';
import Searchbar from '../Searchbar/Searchbar';
import Loader from '../Loader/Loader';
import MoviesGallery from '../MoviesGallery/MoviesGallery';
import Button from '../Button/Button';

export default function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState('idle');
  const [pageNumber, setPageNumber] = useState(1);
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  // console.log(searchParams);
  const queryParam = searchParams.get('query');
  // console.log(searchParamFromURL);

  useEffect(() => {
    queryParam && setSearchQuery(queryParam);
  }, [queryParam]);

  useEffect(() => {
    if (!searchQuery) return; //отменяем первый рендер или рендер пустой строки

    setStatus('pending');

    fetchSearchingMovies(searchQuery, pageNumber)
      .then(data => {
        if (data.results.length === 0) {
          setStatus('rejected');
          setErrorMessage('There are no movies for this query :(');
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
    });
  }, [searchQuery, pageNumber]);

  const onSearch = query => {
    setSearchQuery(query);
    setMovies([]);
    setPageNumber(1);
    history.push(`?query=${query}`);
  };

  const onLoadMore = () => {
    setPageNumber(pageNumber + 1);
    setStatus('pending');
  };

  return (
    <>
      <Searchbar onSearch={onSearch} />
      {status === 'pending' && (
        <>
          {movies.length !== 0 && <MoviesGallery moviesArr={movies} />}
          <div style={{ height: '60vh' }}>
            <Loader />
          </div>
          <div className="loadMoreReplacer"></div>
        </>
      )}
      {status === 'rejected' && <p className="Msg">{errorMessage}</p>}
      {status === 'resolved' && (
        <>
          <MoviesGallery moviesArr={movies} />
          {showLoadMoreBtn && <Button onLoadMore={onLoadMore} />}
        </>
      )}
    </>
  );
}
