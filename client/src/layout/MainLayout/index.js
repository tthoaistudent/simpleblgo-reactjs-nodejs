import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Toolbar, useMediaQuery } from '@mui/material';

// project import
import Drawer from './Drawer';
import Header from './Header';
import navigation from 'menu-items';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import SecurityLayout from 'layout/SecurityLayout/index';

// types
import { openDrawer } from 'store/reducers/menu';
import { getMe } from 'store/reducers/auth';
import Message from 'components/Message';

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
    const theme = useTheme();
    const matchDownLG = useMediaQuery(theme.breakpoints.down('xl'));
    const dispatch = useDispatch();

    const { drawerOpen } = useSelector((state) => state.menu);

    // drawer toggler
    const [open, setOpen] = useState(drawerOpen);
    const handleDrawerToggle = () => {
        setOpen(!open);
        dispatch(openDrawer({ drawerOpen: !open }));
    };
    // get currentUser
    useEffect(()=>{
        dispatch(getMe());
    },[])

    // set media wise responsive drawer
    useEffect(() => {
        setOpen(!matchDownLG);
        dispatch(openDrawer({ drawerOpen: !matchDownLG }));

    }, [matchDownLG]);

    useEffect(() => {
        if (open !== drawerOpen) setOpen(drawerOpen);
    }, [drawerOpen]);

    return (
        <SecurityLayout>
            <Box sx={{ display: 'flex', width: '100%' }}>
                <Header open={open} handleDrawerToggle={handleDrawerToggle} />
                <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />
                <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                    <Toolbar />
                    <Breadcrumbs navigation={navigation} title titleBottom card={false} divider={false} />
                    <Outlet />
                </Box>
            </Box>
            <Message />
        </SecurityLayout>
    );
};

export default MainLayout;
