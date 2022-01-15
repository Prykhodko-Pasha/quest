import PropTypes from 'prop-types';
import s from './CastItem.module.css';

export default function CastItem({ name, profile_path, character }) {
  const BASE_URL = 'https://image.tmdb.org/t/p/original';
  const photoSrc = profile_path
    ? `${BASE_URL}${profile_path}`
    : 'https://api.lorem.space/image/face?w=200&h=300';

  return (
    <li className={s.CastItem}>
      <img alt={`${name}_photo`} className={s.CastItem__img} src={photoSrc} />
      <div className={s.CastItem__info}>
        <p className={s.CastItem__name}>{name}</p>
        <p className={s.CastItem__character}>
          Character:
          <br />
          {character}
        </p>
      </div>
    </li>
  );
}

CastItem.propTypes = {
  name: PropTypes.string.isRequired,
  profile_path: PropTypes.string,
  character: PropTypes.string.isRequired,
};
