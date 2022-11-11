// import UI
import { 
        Grid,
        Typography,
    } from '@mui/material'

import { 
            PostAdd,
            PersonAddAlt,
            Group
        } from '@mui/icons-material';

const Statistical = () => {
    return (
        <Grid container sx={{}}>
            <Grid xs={4}>
                <Typography variant="p" color="rgb(153, 171, 180)">
                    <PostAdd />
                </Typography>
                <Typography variant="h5" color="initial">
                    936
                </Typography>
                <Typography variant="h6" color="rgb(153, 171, 180)">
                    Posts
                </Typography>
            </Grid>
            <Grid xs={4}>
                <Typography variant="p" color="rgb(153, 171, 180)">
                    <PersonAddAlt />
                </Typography>
                <Typography variant="h5" color="initial">
                    936
                </Typography>
                <Typography variant="h6" color="rgb(153, 171, 180)">
                    Followers
                </Typography>
            </Grid><Grid xs={4}>
                <Typography variant="p" color="rgb(153, 171, 180)">
                    <Group />
                </Typography>
                <Typography variant="h5" color="initial">
                    936
                </Typography>
                <Typography variant="h6" color="rgb(153, 171, 180)">
                    Following
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Statistical;