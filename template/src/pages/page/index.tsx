import React from 'react';
import intl from 'react-intl-universal';
import Button from '@/components/button';
import { Input, Select } from 'antd';
import Icon from '@/components/icon';
import localStorage from '@/utils/localStorage';
import styles from './index.scss';
const { Option } = Select;

function Page(props) {
  function doChangeLang(lang) {
    localStorage.set('lang', lang);
    window.location.reload();
  }
  return (
    <div className={styles.home}>
      <Button className={styles.btn}>按钮</Button>
      <Button className={styles.btn} disabled>
        按钮 disabled
      </Button>
      <div className="sm-4">国际化：{intl.get('home')}</div>
      <Button className={styles.btn} onClick={() => doChangeLang('en-us')}>
        英文
      </Button>
      <Button className={styles.btn} onClick={() => doChangeLang('zh-cn')}>
        中文
      </Button>
      <Button className={styles.btn}>
        iconfont:
        <Icon className="icon-Heart" />
      </Button>

      <Button className={styles.btn}>
        svg:
        <Icon type="test" />
      </Button>
      <Button className={styles.btn}>环境变量：{process.env.BUILD_ENV}</Button>
      <Input addonBefore="http://" suffix=".com" defaultValue="mysite" />
      <Select defaultValue=".com" className="select-after">
        <Option value=".com">.com</Option>
        <Option value=".jp">.jp</Option>
        <Option value=".cn">.cn</Option>
        <Option value=".org">.org</Option>
      </Select>
    </div>
  );
}
export default React.memo(Page);
