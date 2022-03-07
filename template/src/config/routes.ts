/**
 * 当前目录是@，也是就src
 */

const routes = [
  {
    path: '/',
    component: 'layouts',
    routes: [
      { exact: true, path: '/', component: 'pages/home' },
      { exact: true, path: '/page', component: 'pages/page' },
      { exact: true, path: '/404', component: 'pages/notFound' },
      { exact: true, path: '/login', component: 'pages/login' },
      { exact: true, path: '/demo', component: 'pages/demo', auth: true },
      {
        redirect: '/',
      },
    ],
  },
];

export default routes;
