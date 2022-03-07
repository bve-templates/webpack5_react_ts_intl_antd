import React from 'react';
import { ConfigProvider } from 'antd';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import '@/i18n';
import ScrollToTop from '@/components/scrollToTop';
import localStorage from '@/utils/localStorage';
import FrontendAuth from '@/components/frontendAuth';
import { store } from '@/store';
import Pol from '@/utils/polling';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import en_US from 'antd/lib/locale-provider/en_US';

import './index.scss';

const locale = {
  'en-us': en_US,
  'zh-cn': zh_CN,
}[localStorage.get('lang', 'en-us')];

async function render() {
  // 启动全局轮询
  // Pol.run();

  ReactDOM.render(
    <Provider store={store}>
      <ConfigProvider locale={locale}>
        <BrowserRouter>
          <ScrollToTop>
            <Switch>
              <FrontendAuth />
            </Switch>
          </ScrollToTop>
        </BrowserRouter>
      </ConfigProvider>
    </Provider>,
    document.getElementById('root'),
  );
}

render();
