import React, { useState } from 'react';
import Button from '@/components/button';
import localStorage from '@/utils/localStorage';

function Login(props) {
  const [isLogin, setIsLogin] = useState(localStorage.get('isLogin'));
  return (
    <div>
      {isLogin ? (
        <div>您已经登录</div>
      ) : (
        <div>
          <h1>登录页面</h1>
          <Button
            onClick={() => {
              setIsLogin(true);
              localStorage.set('isLogin', true);
            }}
          >
            登录
          </Button>
        </div>
      )}
    </div>
  );
}
export default React.memo(Login);
