import { lazy } from 'react';

const Home = lazy(() => import('../pages/home'));
const Words = lazy(() => import('../pages/words'));
const EditWord = lazy(() => import('../pages/editWord'));

const routes = [
    {
        component: Home,
        key: 'home',
        exact: true,
        path: '/'
    },
    {
        component: Words,
        key: 'words',
        exact: true,
        path: '/words'
    },
    {
        component: EditWord,
        key: 'edit-words',
        exact: true,
        path: '/edit-word/:id'
    },
];

export default routes;