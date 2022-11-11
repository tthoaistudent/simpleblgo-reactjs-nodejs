import { Outlet } from 'react-router-dom';

// import in project
import  Header from './Header' 

import { Box, Container } from '@mui/material'
const HomeLayout = () => {
    return (
        
        <Box>
            <Header />
            <Container maxWidth="lg">
                <Outlet />
            </Container>
        </Box>
    )
}

export default HomeLayout;