import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosSearch } from 'react-icons/io';
import { BsSun } from 'react-icons/bs';
import { CiDark } from 'react-icons/ci';
import { useDarkMode } from '../../Context/DarkModeContext';
import styles from './Header.module.css';

export default function Header() {
  const [text, setText] = useState('');
  const { darkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/videos/${text}`);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <nav className={styles.nav}>
      <img
        className={styles.logo}
        src={`${darkMode ? './youtube_dark.png' : './youtube.png'}`}
        alt="youtube logo"
        onClick={() => navigate('/')}
      />
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          value={text}
          placeholder="search"
          onChange={handleChange}
        />
        <button className={styles.button}>
          <IoIosSearch className={styles.search} />
        </button>
      </form>
      <button className={styles.toggle} onClick={() => toggleDarkMode()}>
        {darkMode ? (
          <BsSun className={styles.tog} />
        ) : (
          <CiDark className={styles.tog} />
        )}
      </button>
    </nav>
  );
}
