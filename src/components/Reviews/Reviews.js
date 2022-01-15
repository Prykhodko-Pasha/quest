import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import s from './Reviews.module.css';
import { fetchMovieReviews } from '../../services/movies-api';
import Loader from '../Loader/Loader';
import ReviewsItem from '../ReviewsItem/ReviewsItem';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const { movieId } = useParams();

  useEffect(() => {
    window.scrollTo({
      top: window.innerHeight / 2,
      behavior: 'smooth',
    });
  });

  useEffect(() => {
    setStatus('pending');

    fetchMovieReviews(movieId)
      .then(data => {
        // console.log(data);
        if (data.results.length === 0) {
          setStatus('rejected');
          setErrorMessage('There are no reviews...');
        } else {
          const usableReviewsKeysArr = data.results.map(
            ({ id, author, content }) => {
              return {
                id,
                author,
                content,
              };
            },
          );

          setReviews(prevReviews => [...prevReviews, ...usableReviewsKeysArr]);
          setStatus('resolved');
        }
      })
      .catch(err => {
        setStatus('rejected');
        setErrorMessage(`There is an error: ${err}`);
      });

    window.scrollTo({
      top: window.innerHeight / 2,
      behavior: 'smooth',
    });
  }, [movieId]);

  return (
    <>
      {status === 'pending' && <Loader />}
      {status === 'rejected' && (
        <p className="Msg" style={{ height: window.innerHeight / 2 }}>
          {errorMessage}
        </p>
      )}
      {status === 'resolved' && (
        <ul className={s.Reviews}>
          {reviews.map(({ author, content }, index) => (
            <ReviewsItem key={index} author={author} content={content} />
          ))}
        </ul>
      )}
    </>
  );
}
