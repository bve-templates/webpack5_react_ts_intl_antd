import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.scss';

function Header(props) {
  return (
    <header className={styles.header}>
      <Link to="/">home</Link> --------- <Link to="/page">page</Link>---------{' '}
      <Link to="/123">404</Link>---------{' '}
      <Link to="/demo">需要登录才能访问</Link>
    </header>
  );
}

export default Header;
