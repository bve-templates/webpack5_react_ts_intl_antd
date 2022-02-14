import React from 'react';
import Footer from './components/footer';
import Header from './components/header';
import styles from './index.scss';

interface BasicLayout {
  state: {};
  props: {
    children: any;
  };
}

class BasicLayout extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div className={styles.content}>{this.props.children}</div>
        <Footer />
      </>
    );
  }
}
export default BasicLayout;
