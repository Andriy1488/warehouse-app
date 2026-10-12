import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * { box-sizing: border-box; }
  body {
    margin: 0;
    color: #18304b;
    background: #f3f6fa;
    font-family: Arial, sans-serif;
    line-height: 1.6;
  }
  h1, h2, h3 { line-height: 1.25; }
  h1 { margin: 0 0 12px; font-size: 32px; }
  h2 { margin: 0 0 20px; font-size: 24px; }
  h3 { margin: 0 0 12px; font-size: 19px; }
  p { margin: 0 0 12px; }
  a { color: #164b96; }
  button, input, select { font: inherit; }
  input, select {
    width: 100%;
    min-height: 44px;
    padding: 9px 12px;
    border: 1px solid #94a3b8;
    border-radius: 8px;
    background: white;
    color: #18304b;
  }
  :focus-visible { outline: 3px solid #4e8fea; outline-offset: 3px; }
`;
