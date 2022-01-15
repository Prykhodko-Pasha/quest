import PropTypes from 'prop-types';
import s from './ReviewsItem.module.css';

export default function ReviewsItem({ author, content }) {
  return (
    <li className={s.ReviewsItem}>
      <p className={s.ReviewsItem__author}>{author}</p>
      <p className={s.ReviewsItem__text}>{content}</p>
    </li>
  );
}

ReviewsItem.propTypes = {
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
