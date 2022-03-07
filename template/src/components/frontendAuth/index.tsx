import React from 'react';
import { pathToRegexp } from 'path-to-regexp';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Loadable from '@/components/loadable';
import ErrorBoundary from '@/components/errorBoundary';
import routes from '@/config/routes';
import localStorage from '@/utils/localStorage';

// 查找当前路由对的配置
function findRouter(routes, pathname) {
  for (const route of routes) {
    if (route.path && pathToRegexp(route.path).test(pathname)) {
      return route;
    }
    if (route.routes) {
      return findRouter(route.routes, pathname);
    }
  }
}

function FrontendAuth(props) {
  const {
    location: { pathname },
  } = props;
  // 登录状态获取，这个根据自己设计获取登录状态
  const isLogin = localStorage.get('isLogin');
  const targetRouterConfig = findRouter(routes, pathname);

  if (!targetRouterConfig) {
    return <Redirect to="/404" />;
  } else {
    if (targetRouterConfig.auth && !isLogin) {
      return <Redirect to="/login" />;
    }
  }

  return (
    <>
      {routes.map(({ component, path, exact, routes, redirect, auth }: any) => {
        const C = ErrorBoundary(Loadable(() => import(`@/${component}`)));
        if (auth) {
          return <Redirect to="/" />;
        }
        if (routes) {
          return (
            <Route path={path} key={path}>
              <C>
                <Switch>
                  {routes.map(({ component, path, exact, redirect }) => {
                    if (redirect) {
                      return (
                        <Redirect
                          key={redirect + 'redirect'}
                          to={redirect}
                          from={path}
                        />
                      );
                    }
                    return (
                      <Route
                        exact={exact}
                        path={path}
                        key={path}
                        component={ErrorBoundary(
                          Loadable(() => import(`@/${component}`)),
                        )}
                      />
                    );
                  })}
                </Switch>
              </C>
            </Route>
          );
        }
        if (redirect) {
          <Redirect key={redirect + 'redirect'} to={redirect} from={path} />;
        }
        return <Route key={path} exact={exact} path={path} component={C} />;
      })}
    </>
  );
}
export default withRouter(FrontendAuth);
