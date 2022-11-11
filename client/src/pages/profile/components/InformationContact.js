import { memo } from 'react';

import { 
    Box,
    Avatar,
    Typography
} from '@mui/material'

// import in project
import avatar from "assets/images/avatar_default.jpg";

const InformationContact = (props) => {
    const { currentUser } = props;

    return (
        <Box
            sx={{
                marginTop: '-50px'
            }}
        >
            <Avatar src={avatar} 
                    sx={{
                            height: 120, 
                            width: 120,
                            outline: "4px solid blue",
                            border: '4px solid #fff'
                        }}/>
            <Typography 
                variant="h3"
                sx={{marginTop: "10px"}}
            >
                {`${currentUser.firstName} ${currentUser.lastName} `}
            </Typography>
            <Typography variant="h6">
                Project manager
            </Typography>
        </Box>
    )
}

export default memo(InformationContact);