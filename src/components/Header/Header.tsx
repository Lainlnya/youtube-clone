/** @jsxImportSource @emotion/react */
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosSearch } from 'react-icons/io';
import { BsSun, BsYoutube } from 'react-icons/bs';
import { CiDark } from 'react-icons/ci';
import { useDarkMode, DarkModeProps } from '../../Context/DarkModeContext';
import { css } from '@emotion/react';

const headerStyle = css({
  backgroundColor: `var(--color-bg)`,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: 'var(--color-text)',
});

const navStyle = css({
  display: 'flex',
  marginTop: '1.2rem',
  '&:hover': {
    cursor: 'pointer',
  },
});

const logoStyle = css({
  marginLeft: '2rem',
  width: '5rem',
  height: '3rem',
  color: 'var(--color-logo)',
});

const h1Style = css({
  lineHeight: '43px',
  color: 'var(--color-text)',
});

const formStyle = css({
  display: 'flex',
  flexDirection: 'row',
  width: '30%',
  height: '2rem',
  marginTop: '1rem',
});

const inputStyle = css({
  width: '85%',
  height: '100%',
  paddingLeft: '2rem',
  fontSize: '1rem',
  border: '2px solid var(--color-input)',
  borderRadius: '1.5rem 0 0 1.5rem',
  outline: 'none',
});

const buttonStyle = css({
  width: '15%',
  height: '113%',
  border: '2px solid var(--color-input)',
  borderLeft: 'none',
  borderRadius: '0 1.5rem 1.5rem 0',
  '&:hover': {
    cursor: 'pointer',
  },
});

const searchStyle = css({
  fontSize: '1.5rem',
  paddingTop: '0.1rem',
  textAlign: 'center',
  color: '#1d1d1d',
});

const toggleStyle = css({
  border: 'none',
  backgroundColor: 'var(--color-bg)',
  color: 'var(--color-text)',
  width: '44px',
  height: '44px',
  marginRight: '2%',
  marginTop: '1%',
  '&:hover': {
    cursor: 'pointer',
  },
});

const toggleButtonStyle = css({
  width: '30px',
  height: '30px',
  marginRight: '30%',
});

export default function Header(): ReactElement {
  const [text, setText] = useState('');
  const { keyword } = useParams();
  const { darkMode, toggleDarkMode }: DarkModeProps = useDarkMode();
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
    <header css={headerStyle}>
      <nav css={navStyle} onClick={() => navigate('/')}>
        <BsYoutube css={logoStyle} />
        <h1 css={h1Style}>Youtube</h1>
      </nav>
      <form css={formStyle} onSubmit={handleSubmit}>
        <input
          css={inputStyle}
          type="text"
          value={text}
          placeholder="search"
          onChange={handleChange}
        />
        <button css={buttonStyle}>
          <IoIosSearch css={searchStyle} />
        </button>
      </form>
      <button css={toggleStyle} onClick={() => toggleDarkMode()}>
        {darkMode ? (
          <BsSun css={toggleButtonStyle} />
        ) : (
          <CiDark css={toggleButtonStyle} />
        )}
      </button>
    </header>
  );
}
