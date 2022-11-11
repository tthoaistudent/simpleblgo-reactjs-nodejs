import { useRoutes } from 'react-router-dom';

// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import ProfileRoutes from './ProfileRoutes'
import HomeRouter from './HomeRouters';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([MainRoutes,LoginRoutes,ProfileRoutes,HomeRouter]);
}
