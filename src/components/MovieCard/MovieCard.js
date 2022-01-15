import { useState } from 'react';
import Popup from 'reactjs-popup';
import s from './MovieCard.module.css';

import questionsArr from '../questions.js';

export default function MovieCard({ movie }) {
  let [number, setNumber] = useState(0);
  const [showModal, setshowModal] = useState(false);
  const [inputText, setInputText] = useState('');

  const onChange = e => {
    setInputText(e.target.value);
  };

  const onSubmit = e => {
    if (inputText.toLocaleLowerCase() === questionsArr[number].answer) {
      console.log(
        'questionsArr[number].answer :>> ',
        questionsArr[number].answer,
      );
      setNumber((number += 1));
    } else {
      setshowModal(!showModal);
    }
    setInputText('');
  };

  const reset = () => {
    setNumber(0);
  };

  return (
    <>
      <p className={s.MovieCard__year}>Питання {number + 1} з 10</p>
      <div className={s.MovieCard}>
        <div className={s.MovieCard__desc}>
          <div className={s.MovieCard__text}>{questionsArr[number].text}</div>
          {questionsArr[number].img && (
            <div className={s.MovieCard__img}>
              <img
                src={`content/${questionsArr[number].img}`}
                alt={questionsArr[number].img}
              />{' '}
            </div>
          )}
        </div>
      </div>
      <div className={s.wrapper}>
        <p className={s.text}>Введіть код:</p>
        <input
          className={s.input}
          type="text"
          value={inputText}
          onChange={onChange}
          required
        />

        <button className={s.form__btn} type="submit" onClick={onSubmit}>
          Підтвердити
        </button>
        <Popup open={showModal} modal closeOnDocumentClick>
          {close => (
            <div className={s.modal}>
              <button className={s.close} onClick={close}>
                &times;
              </button>
              <div className={s.header}> Sorry </div>
              <div className={s.content}>This is wrong code...</div>
              <div className={s.actions}>
                <button
                  className={s.form__btn}
                  onClick={() => {
                    console.log('modal closed ');
                    close();
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </Popup>
      </div>
    </>
  );
}
