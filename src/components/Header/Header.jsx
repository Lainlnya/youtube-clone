import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosSearch } from 'react-icons/io';
import styles from './Header.module.css';

export default function Header() {
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <nav className={styles.nav}>
      {console.log(
        (new Date('2016-05-07') - new Date('2016-05-06')) /
          (1000 * 60 * 60 * 24)
      )}
      <img
        className={styles.logo}
        src="./youtube.png"
        alt="youtube logo"
        onClick={() => navigate('/')}
      />
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          value={text}
          placeholder="검색"
          onChange={handleChange}
        />
        <button className={styles.button}>
          <IoIosSearch className={styles.search} />
        </button>
      </form>
      <div></div>
    </nav>
  );
}
