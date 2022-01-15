import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import s from './Cast.module.css';
import { fetchMovieCast } from '../../services/movies-api';
import Loader from '../Loader/Loader';
import CastItem from '../CastItem/CastItem';

export default function Cast() {
  const [cast, setCast] = useState([]);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const { movieId } = useParams();

  useEffect(() => {
    window.scrollTo({
      top: window.innerHeight / 2,
      behavior: 'smooth',
    });
  }); /* скролл на півекрана вниз */

  useEffect(() => {
    setStatus('pending');

    fetchMovieCast(movieId)
      .then(data => {
        // console.log(data);
        if (data.cast.length === 0) {
          setStatus('rejected');
          setErrorMessage('There is no cast...');
        } else {
          const usableCastKeysArr = data.cast.map(
            ({ id, name, profile_path, character }) => {
              return {
                id,
                name,
                profile_path,
                character,
              };
            },
          );

          setCast(usableCastKeysArr);
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
      {status === 'resolved' && (
        <ul className={s.Cast}>
          {cast.map(({ name, profile_path, character }, index) => (
            <CastItem
              key={index}
              name={name}
              profile_path={profile_path}
              character={character}
            />
          ))}
        </ul>
      )}
    </>
  );
}
