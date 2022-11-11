import {
    Box,
    IconButton ,
    Button
} from '@mui/material'

import {
    Facebook,
    YouTube, 
    Instagram

} from '@mui/icons-material'

const Social = () =>{
    return (
        <Box display="flex" mx="12" my="12" sx="">
           {/* <IconButton color="secondary">
                <Facebook  sx={{height: 50, width: 50}}/>
           </IconButton>
           <IconButton color="secondary">
                <YouTube  sx={{height: 50, width: 50}}/>
           </IconButton>
           <IconButton color="secondary">
                <Instagram  sx={{height: 50, width: 50}}/>
           </IconButton> */}
           <Button color="primary">
                Following
           </Button>
        </Box>
    )
}

export default Social;