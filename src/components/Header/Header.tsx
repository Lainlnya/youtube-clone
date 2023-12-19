import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosSearch } from 'react-icons/io';
import { BsSun, BsYoutube } from 'react-icons/bs';
import { CiDark } from 'react-icons/ci';
import { useDarkMode } from '../../Context/DarkModeContext';
import styles from './Header.module.css';

export default function Header(): ReactElement {
  const [text, setText] = useState('');
  const { keyword } = useParams();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/videos/${text}`);
  };

  useEffect(() => setText(keyword || ''), [keyword]);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav} onClick={() => navigate('/')}>
        <BsYoutube className={styles.logo} />
        <h1 className={styles.h1}>Youtube</h1>
      </nav>
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
    </header>
  );
}
