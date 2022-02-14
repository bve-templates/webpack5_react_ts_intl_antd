import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Item from './components/item';
import Loading from '@/components/loading';
import styles from './index.scss';

function Home(props) {
  const { list, loading, getList } = props;

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className={styles.home}>
      {loading ? (
        <Loading text="数据加载中" />
      ) : (
        list.map(item => <Item item={item} key={item.id} />)
      )}
    </div>
  );
}
export default connect(
  ({ loading: { effects }, home: { list } }) => ({
    loading: effects['home/getList'],
    list,
  }),
  (dispatch: any) => ({
    getList() {
      dispatch({ type: 'home/getList' });
    },
  }),
)(React.memo(Home));
