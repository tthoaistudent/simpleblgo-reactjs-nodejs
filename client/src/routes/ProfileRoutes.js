import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';

import MainLayout from "layout/MainLayout/index";

// lazy loading component
const Profile = Loadable(lazy(() => import('pages/profile')));


const ProfileRoutes = {
    path: '/profile',
    element: <MainLayout />,
    children: [
        {
            path: '',
            element: <Profile />
        }
    ]
}

export default ProfileRoutes;