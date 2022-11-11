import {  useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
// Lazy loading
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));

 
const SecurityLayout = (props) => {
    const { children } = props;
    const navigation = useNavigate();

    const currentUser = useSelector(state => state.auth.currentUser);
    const isLoggedIn  = useSelector(state => state.auth.isLoggedIn);
    if(!isLoggedIn){
        return <AuthLogin />
    }
    
    return children;

}

export default SecurityLayout;