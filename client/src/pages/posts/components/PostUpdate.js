import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    TextField,
    Switch,
    InputLabel,
    Select,
    Chip,
    MenuItem,
    OutlinedInput,
    FormControl,
    Button,
    IconButton
} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const label = { inputProps: { 'aria-label': 'Switch demo' } };
import { useTheme } from '@mui/material/styles';
// import in project
import postApi from 'apis/post';
import { addMessageError, addMessageSuccess } from 'store/reducers/message';
import { convertToSlug } from 'utils/utils';
import { isSet } from 'lodash';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      padding: 10
    },
  },
};



function getStyles(name, tagName, theme) {
    // return {
    //   fontWeight:
    //   tagName.indexOf(name) === -1
    //       ? theme.typography.fontWeightRegular
    //       : theme.typography.fontWeightMedium,
    // };
  }

const PostUpdate = () => {
    const theme = useTheme();
    const [img, setImg] = useState(null);
    const [tagData, setTagData] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    // formdata
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [description, setDescription] = useState('');
    const [publish, setPublish] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null)
    const [enableComment, setEnableComment] = useState(true);
    const [metaTitle, setMetaTitle] = useState('');
    const [metaDescription, setMetaDescription] = useState('');
    const [tagName, setTagName] = useState([]);

    const handleSubmit = async () => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        let formData = new FormData();
        if(selectedImage){
            formData.append('file', selectedImage);
        }
        formData.append('title', title);
        formData.append('description', description);
        formData.append('slug', slug);
        formData.append('publish', publish);
        formData.append('enableComment', enableComment);
        formData.append('tags', tagName);
        formData.append('metaTitle', metaTitle);
        formData.append('metaDescription', metaDescription);
        await postApi.updatePost(params.id,formData, config)
            .then(res => {
                if(res){
                    dispatch(addMessageSuccess('Saved!!'));
                    navigate('/posts');
                }
            })
            .catch(error => {
                dispatch(addMessageError("Save Faild!!"))
            })
    }
    const handleChangeTag = (event) => {
        const tagSelected = event.target.value;
        const index = tagName.indexOf(tagSelected._id);
        if(index > -1){
            setTagName(prev => {
                return prev.slice(index,1);
            })
        }else{
            setTagName((prev) => {
                return [...tagSelected];
            })
        }
    }

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
        setSlug(convertToSlug(event.target.value));
    }

    const fetchAllTag = async () => {
        await postApi.getAllTag()
            .then(res => {
                if(res){
                    const data = [];
                    res.Tags.filter(tag => {
                        data.push(tag);
                    })
                    setTagData([...data])
                }
            });
    }

    const fetchUpdate = async () => {
        const idUpdate = params.id;
        await postApi.getOnePost(idUpdate)
                .then(res => {
                    const data = res.post;
                    setTitle(data.title);
                    setSlug(data.slug);
                    setDescription(data.description);
                    setPublish(data.publish);
                    setEnableComment(data.enableComment);
                    setTagName(data.tags);
                    setMetaTitle(data.title);
                    setMetaDescription(data.metaDescription);
                    setImg(`${process.env.REACT_APP_API_IMGAGE}/${data.img}`)
                })
                .catch(error => {
                    dispatch(addMessageError('Load data faild!!'));
                })
    }

    const convertToLabel = (id) => {
        const tagLabel = tagData.filter((item) => item._id == id);
        return tagLabel[0].title;
    }
    // Image review
    useEffect(()=>{
        if(selectedImage){
            setImg(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage])
    // render post tags
    useEffect(()=>{
        fetchAllTag();
        fetchUpdate();
    }, [])
    return (
        <Box>
            <Typography variant="h1" color="initial">
                Update Post
            </Typography>
            <Card sx={{ width: '100%', borderRadius: '20px' }}>
                <CardContent>
                    <Grid container spacing={2} >
                        <Grid item xs={8}>
                            <TextField
                                required
                                id="outlined-required"
                                label="Title"
                                value={title}
                                onChange={handleChangeTitle}
                                fullWidth
                                sx={{marginTop: 2}}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Slug"
                                value={slug}
                                onChange={event => setSlug(event.target.value)}
                                fullWidth
                                sx={{marginTop: 2}}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Description"
                                value={description}
                                onChange={event => setDescription(event.target.value)}
                                multiline
                                fullWidth
                                rows={4}
                                sx={{marginTop: 3}}
                            />
                            <Box>
                                <Box
                                    sx={{
                                        height:100, 
                                        display: 'flex', 
                                        justifyContent: 'center',
                                        alignItems: 'center !important',
                                        marginTop: 3,
                                        borderRadius: 2
                                    }}
                                >
                                    <IconButton color="primary" aria-label="upload picture" component="label">
                                        <input 
                                            hidden 
                                            onChange={e => setSelectedImage(e.target.files[0])}
                                            accept="image/*" 
                                            type="file" 
                                            />
                                        <CloudUploadIcon sx={{height: 70, width: 70}} />
                                    </IconButton>
                                </Box>
                                {img && <Box className="image-preview">
                                            <img 
                                                src={img} 
                                                alt="Post image" 
                                                height="100px" />
                                        </Box>
                                }
                            </Box>
                        </Grid>
                        <Grid 
                            item xs={4}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItem: 'center',
                                    marginTop: 2
                                }}
                            >
                                <Typography
                                    variant="h5"
                                >
                                    Publish
                                </Typography>
                                <Switch 
                                    checked={publish}
                                    onChange={() => {
                                        setPublish(!publish)
                                    }}
                                    />
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItem: 'center',
                                    marginTop: 2
                                }}
                            >
                                <Typography
                                    variant="h5"
                                >
                                    Enable comments
                                </Typography>
                                <Switch 
                                    checked={enableComment}
                                    onChange={() => setEnableComment(!enableComment)}
                                />
                            </Box>
                            <Box>
                                <FormControl fullWidth>
                                <InputLabel id="demo-multiple-chip-label">Tag</InputLabel>
                                <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    fullWidth
                                    value={tagName}
                                    onChange={handleChangeTag}
                                    MenuProps={MenuProps}
                                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => {
                                            const label = convertToLabel(value);
                                            return (
                                                <Chip key={value} label={label} />
                                            )
                                        })}
                                        </Box>
                                    )}
                                >
                                {tagData.map((item, key) => (
                                    <MenuItem
                                    key={item._id}
                                    value={item._id}
                                    style={getStyles(item._id, tagName, theme)}
                                    >
                                    {item.title}
                                    </MenuItem>
                                ))}
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Meta title"
                                    fullWidth
                                    value={metaTitle}
                                    onChange={event => setMetaTitle(event.target.value)}
                                    sx={{marginTop: 3}}
                                />
                            </Box>
                            <Box>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Meta description"
                                    multiline
                                    fullWidth
                                    value={metaDescription}
                                    onChange={event => setMetaDescription(event.target.value)}
                                    rows={4}
                                    sx={{marginTop: 3}}
                                />
                            </Box>
                            <Box>
                                <Button 
                                    sx={{marginTop: 3}} 
                                    variant="contained"
                                    onClick={handleSubmit}
                                    >Save</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    )
}

export default PostUpdate;