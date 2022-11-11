import { useState, useEffect } from 'react';

import {
    Grid
} from '@mui/material'
import BlogFilter from './BlogFilter';
import BlogList from './BlogList';
import postApi from 'apis/post';
const HomePage = () => {
    const [blogs, setBlogs] = useState([]);
    const [tags,setTag] = useState([]);
    const [tagSelected, setTagSeleted] = useState([]);
    const [search, setSearch] = useState('');

    const handleSearch = (input) =>{
        setSearch(input);
    }

    const filter = () => {
        const params = { title: search };
        fetch(params);
    }
    const fetch = async (params = null) => {
        await postApi.getAllPost(params)
                .then(res => {
                    if(res){
                        setBlogs(res.posts);
                    }
                });
        await postApi.getAllTag()
                .then(res => {
                    if(res){
                        setTag(res.Tags);
                    }
                })
    }

    useEffect(() => {
        fetch();
    }, []);

    useEffect(()=>{
        filter();
    }, [search])
    return (
        <Grid container>
            <Grid item xs={4}>
                <BlogFilter tags={tags} onSearch={handleSearch}/>
            </Grid>
            <Grid item xs={8}>
                <BlogList blogs={blogs}/>
            </Grid>
        </Grid>
    )
}

export default HomePage;