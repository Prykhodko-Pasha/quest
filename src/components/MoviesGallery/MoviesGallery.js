import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import s from './MoviesGallery.module.css';
import MoviesGalleryItem from '../MoviesGalleryItem/MoviesGalleryItem';

export default function MoviesGallery({ moviesArr }) {
  // const BASE_URL = 'goit-react-hw-04-movies';
  const { url } = useRouteMatch();
  const pathTo = url.includes('/movies') ? url : `${url}movies`;
  const location = useLocation();

  return (
    <ul className={s.MoviesGallery}>
      {moviesArr.map(({ id, poster_path, title, release_date }, index) => (
        <Link
          to={{
            pathname: `${pathTo}/${id}`,
            state: { from: location },
          }}
          key={index}
          className={s.MoviesGalleryItem}
        >
          <MoviesGalleryItem
            id={id}
            poster_path={poster_path}
            title={title}
            release_date={release_date}
          />
        </Link>
      ))}
    </ul>
  );
}

MoviesGallery.propTypes = {
  moviesArr: PropTypes.arrayOf(PropTypes.object).isRequired,
};
