import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import {
    Box, 
    Grid,
    Card, 
    CardContent,
    Typography,
    Button,
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions,
    TextField,
    MenuItem,
    Chip
} from '@mui/material'

import AddIcon from '@mui/icons-material/Add';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';

import { DataGrid, GridActionsCellItem  } from '@mui/x-data-grid'

// import in project
import postApi from 'apis/post';
import { convertToSlug, remapDataTable } from 'utils/utils';
// import action
import { addMessageError, addMessageSuccess } from '../../store/reducers/message'

const ITEM_HEIGHT = 48;
const initialRows = [];


const PostTag = () => {
    const [rows, setRows] = useState(initialRows);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState(1);
    const [slug, setSLug] = useState('');
    const [idUpdate, setIdUpdate] = useState(null);
    const dispatch = useDispatch();

    const formReset = () => {
        setTitle('');
        setSLug('');
        setStatus(1);
    }

    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
        formReset();
    };

    const handleRemove = async (id) =>{
        await postApi.deleteTag(id)
            .then(res => {
                if(res){
                    fetchRows();
                    dispatch(addMessageSuccess('Deleted!'));
                }
            })
    }

    const handleUpdate = async (id) => {
        const tagUpdate = rows.filter((item) => item._id == id);
        setTitle(tagUpdate[0].title);
        setSLug(tagUpdate[0].slug);
        setStatus(tagUpdate[0].status);
        setOpen(true);
        setIdUpdate(id);
    }
    
    const fetchRows = async () => {
    postApi.getAllTag()
        .then((res) => {
            setRows(remapDataTable(res.Tags));
        });
    } 

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
        setSLug(convertToSlug(event.target.value))
    }

    useEffect(() => {
        fetchRows();
    }, []);

      const handleSubmit = () => {
        if(idUpdate){
            postApi.updateTag(idUpdate, {title, slug, status})
            .then(response => {
                if(response){
                    fetchRows();
                    handleClose(false);
                    setIdUpdate(null);
                    dispatch(addMessageSuccess('Updated!'));
                    formReset();
                }
            })
            .catch(error => {
                
            })
        }else{
            postApi.createTag({title,slug, status})
            .then(response => {
                if(response){
                    fetchRows();
                    handleClose(false);
                    dispatch(addMessageSuccess('Saved!'));
                    formReset();
                }
            })
            .catch(error => {
                dispatch(addMessageError('Saved faild!'))
            })
        }
        
      }

      const columns = [
        { 
            field: 'id', 
            headerName: 'ID', 
            flex: 1,
            hide: true
        },
        { 
            field: 'stt', 
            headerName: 'STT', 
            flex: 1,
        },
        { field: 'title', headerName: 'Title', flex: 1},
        { field: 'slug', headerName: 'Slug', flex: 1},
        { 
            field: 'status', 
            headerName: 'Status', 
            flex:1,
            renderCell: (params) => {
                if(params.row.status){
                    return <Chip label="Hiện" color="primary" />
                }else{
                    return <Chip label="Ẩn" color="error" />
                }
            }
        },
        {
            field: 'actions',
            headerName: 'Action',
            type: 'actions',
            getActions: (params) => [
                <GridActionsCellItem icon={<BorderColorIcon />} 
                                    label="Update" 
                                    showInMenu 
                                    onClick={()=>handleUpdate(params.id)}
                                    />,
                <GridActionsCellItem icon={<DeleteIcon />} 
                                    onClick={()=>handleRemove(params.id)}
                                    label="Remove"
                                    showInMenu />,
            ]
        },
    ];

    return (
        <Box>
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
                        onClick={handleClickOpen}
                        >
                            Create New Post
                </Button>
                </Grid>
            </Grid>
            <Card sx={{ width: '100%', borderRadius: '20px' }}>
                <CardContent>
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                        <div style={{ height: 350, width: '100%' }}>
                            <DataGrid
                                getRowHeight={() => 'auto'}
                                rows={rows}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                checkboxSelection
                                disableSelectionOnClick 
                            />
                            </div>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            {/* Modal */}
            <Dialog 
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
            >
                <DialogTitle id="alert-dialog-title">
                {idUpdate ? "Add New Tag" : "Update Tag"}
                </DialogTitle>
                <DialogContent sx={{ paddingTop: '20px !important'}}>
                    <TextField
                            id="outlined-name"
                            label="Title"
                            value={title}
                            onChange={handleChangeTitle}
                            fullWidth
                            sx={{marginTop: 2}}
                        />
                    <TextField
                        id="outlined-name"
                        label="Slug"
                        value={slug}
                        onChange={(event) =>setSLug(event.target.value)}
                        fullWidth
                        sx={{marginTop: 2}}
                    />
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Select"
                        fullWidth
                        value={status}
                        onChange={(event) => setStatus(event.target.value)}
                        sx={{marginTop: 2}}
                        helperText="Please select your status"
                        >
                            <MenuItem value={0}>
                                Ẩn
                            </MenuItem>
                            <MenuItem value={1}>
                                Hiện
                            </MenuItem>
                        </TextField>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                <Button onClick={handleSubmit} autoFocus>
                    Save
                </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default PostTag;