import { 
            Grid,
            Typography,
            Card,
            CardActionArea,
            CardContent,
            CardMedia
        } from '@mui/material';

import { useSelector } from 'react-redux';

// Project import
import avatar from 'assets/images/profile_backgroupd.jpg';
import InformationContact from './components/InformationContact';
import Statistical from './components/Statistical';
import Social from './components/Socical';
import Introduce from './components/Introduce';
import EditProfile from './components/EditProfile';

const Profile = () => {
    const currentUser = useSelector(state => state.auth.currentUser);
    
    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Typography variant="h5">Profile</Typography>
            </Grid>
            {/* Header */}
            <Grid item xs={12}>
                <Card sx={{borderRadius: '20px'}}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="250"
                        image={avatar}
                        alt="green iguana"
                        />
                        <CardContent sx={{minHeight: 150, display: 'flex'}}>
                            <Grid container>
                                <Grid item 
                                    align="center"
                                    alignItems="center"
                                    display="flex"
                                    xs={12}
                                    sm={12}
                                    md={4}
                                    lg={4}
                                    xl={4}
                                    >
                                    <Statistical />
                                </Grid>
                                <Grid item  
                                    align="center" 
                                    xs={12}
                                    sm={12}
                                    md={4}
                                    lg={4}
                                    xl={4}
                                    sx={{position: 'relative'}}>
                                    <InformationContact currentUser={currentUser} />
                                </Grid>
                                <Grid item 
                                    align="center"
                                    alignItems="center"
                                    display="flex"
                                    xs={12}
                                    sm={12}
                                    md={4}
                                    lg={4}
                                    xl={4}
                                    >
                                    {/* <Social /> */}
                                </Grid>
                            </Grid>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
            {/* And Header */}
            {/* Introduce */}
            <Grid item xs={4}>
                <Introduce currentUser={currentUser}/>
            </Grid>
            {/* End Introduce */}
            {/* Edit Profile */}
            <Grid item xs={8}>
                <EditProfile currentUser={currentUser}/>
            </Grid>
            {/* End edit Profile */}
        </Grid>
    )
}

export default Profile;