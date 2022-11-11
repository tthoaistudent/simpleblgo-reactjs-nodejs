import { 
    Box,
    Grid
} from '@mui/material'

// import in project
import BLogItem from "./BlogItem";

const BlogList = (props) =>{

    const { blogs } = props;

    return (
        <Box 
            sx={{
                margin: '10px 0',
            }}
        >
            <Grid container>
                { blogs.map((item, key) => {
                    return (
                        <Grid item key={key} xs={4}>
                            <BLogItem  item={item}/>
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    )
}

export default BlogList;