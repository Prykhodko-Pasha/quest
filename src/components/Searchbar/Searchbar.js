import React, { useState } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';
import { AiOutlineSearch } from 'react-icons/ai';

export default function Searchbar({ onSearch }) {
  const [query, setQuery] = useState('');

  const onChange = e => {
    setQuery(e.currentTarget.value.trim());
  };

  const onSubmit = e => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={onSubmit}>
        <button type="submit" className={s.SearchForm__button}>
          <AiOutlineSearch style={{ width: '70%', height: '70%' }} />
          <span className={s.SearchForm__button__label}>Search</span>
        </button>

        <input
          className={s.SearchForm__input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies..."
          onChange={onChange}
        />
      </form>
    </div>
  );
}

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
