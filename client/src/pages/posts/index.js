import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
    Grid,
    Box,
    Typography,
    Button,

} from '@mui/material'
// Import style 
import "./style.scss";

import AddIcon from '@mui/icons-material/Add';
import Loadable from 'components/Loadable';
import { lazy } from 'react';

// import in project 
const PostFilter = Loadable(lazy(()=>import('./components/PostFilter')))
const PostTable  = Loadable(lazy(()=>import('./components/PostTable')))
import postApi from 'apis/post';
import { addMessageSuccess, addMessageError } from 'store/reducers/message';
import { remapDataTable } from 'utils/utils';

const Post = () => { 
    const [rows, setRows] = useState([]);
    const dispatch = useDispatch();
    const fetch = async () => {
        await postApi.getAllPost()
                .then(res => {
                    setRows(remapDataTable(res.posts));
                });
    }

    const handleDelete = async (id) => {
        await postApi.deletePost(id)
                .then(res => {
                    if(res){
                        fetch();
                        dispatch(addMessageSuccess('Deleted!'))
                    }
                })
                .catch(error => {
                    dispatch(addMessageError('Delete Faild!!'))
                })
    }

    useEffect(()=>{
        fetch();
    },[])


    return (
        <Box sx={{margin: 5}}>
            <Box
            >
                <Grid container 
                        spacing={4}
                        sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItem : 'center',
                        }}
                        >
                    <Grid item>
                    <Typography variant="h1" color="initial">
                        Posts
                    </Typography>
                    </Grid>
                    <Grid item>
                    <Button startIcon={<AddIcon />} 
                            variant="contained"
                            >
                                Create New Post
                    </Button>
                    </Grid>
                </Grid>
            </Box>
            <PostFilter />
            <PostTable 
                rows={rows}
                onRemoveRow={handleDelete}
            />
        </Box>
    )
}


export default Post;