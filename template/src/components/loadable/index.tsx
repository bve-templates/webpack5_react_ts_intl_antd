import React from 'react';
import loadable from '@bve/react-loadable';
import intl from 'react-intl-universal';
import Loading from '@/components/loading';
import Button from '@/components/button';
import styles from './index.scss';

export default loader =>
  loadable({
    loader,
    loading: ({ isLoading, error }) => (
      <div className={styles.loadable}>
        {isLoading ? (
          <Loading />
        ) : error ? (
          <div className={styles.error}>
            <div>{JSON.stringify(error)}</div>
            <div>
              <Button onClick={() => window.location.reload()}>
                {intl.get('reload')}
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    ),
  });
