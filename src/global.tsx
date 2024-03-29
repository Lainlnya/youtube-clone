import { css } from '@emotion/react';

const globalStyes = css`
  * {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  :root {
    --color-bg: #fdfdfd;
    --color-text: #010101;
    --color-des: #f2f2f2;
    --color-input: #d3d3d3;
    --color-des-text: #010101;
    --color-logo: #ff0000;
  }

  html.dark {
    --color-bg: #010101;
    --color-text: #fdfdfd;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Open Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  .App {
    text-align: center;
    margin: 0 auto;
    padding: 0;
    list-style-type: none;
    background-color: var(--color-bg);
  }

  a {
    color: var(--color-text);
    cursor: pointer;
    text-decoration: none;
  }
`;

export default globalStyes;
