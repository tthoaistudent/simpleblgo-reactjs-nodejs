import { lazy } from 'react';
import HomeLoading from 'components/homeloading';

const HomeLayout =  HomeLoading(lazy(()=>import('layout/HomeLayout')));
const HomePage = HomeLoading(lazy(()=>import('pages/home/index')));

const HomeRouter = {
    path: '/home',
    element: <HomeLayout />,
    children: [
        { 
            path: '',
            element: <HomePage />
        }
    ]
}

export default HomeRouter;