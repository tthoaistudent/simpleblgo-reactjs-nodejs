import { useNavigate } from 'react-router-dom';
import {
    Box,
    Card,
    CardContent,
    Chip,
} from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, GridActionsCellItem  } from '@mui/x-data-grid'

// import in project




const PostTable = (props) => {
    const {rows, onRemoveRow} = props;
    const navigate = useNavigate();
    const handleUpdate = (id) => {
        navigate('/posts/update/'+id);
    }

    const handleRemove = (id) => {
        onRemoveRow(id);
    }

    const columns = [
        { 
            field: 'id', 
            flex: 1,
            headerName: 'ID', 
            hide: true
        },
        {
            field: 'stt',
            headerName: 'STT'
        },
        { 
            field: 'title', 
            flex: 1,
            headerName: 'Title', 
        },
        { 
            field: 'slug', 
            flex: 1,
            headerName: 'Slug', 
        },
        { 
            field: 'tags', 
            flex: 1,
            headerName: 'Tags', 
            renderCell: params => {
                if(params.value){
                    const tags = params.value.map((item,key) => {
                        return <Chip 
                                    key={key} 
                                    icon={<LocalOfferIcon />} 
                                    label={item.title}
                                    size='small'
                                    variant="outlined" />
                    })
                    return (
                        <Box>
                            {[...tags]}
                        </Box>
                    )
                }
            }
        },
        { 
            field: 'publish', 
            flex: 1,
            headerName: 'Publish', 
            renderCell: (params) => {
                if(params.value){
                    return <Chip label="Publish" color="primary" />
                }else{
                    return <Chip label="Draft" color="error" />
                }
            }
        },
        { 
            field: 'action', 
            flex: 1,
            type: 'actions',
            headerName: 'Action', 
            getActions: (params) => [
                <GridActionsCellItem icon={<BorderColorIcon />} 
                                        label="Update" 
                                        showInMenu 
                                        onClick={()=>handleUpdate(params.id)}
                                        />,
                <GridActionsCellItem icon={<DeleteIcon />} 
                                    onClick={()=>handleRemove(params.id)}
                                    label="Remove"
                                    showInMenu />
            ]
    
        },
    ];
    return (
        
        <Box sx={{marginTop: '15px'}}>
            <Card sx={{ width: '100%', borderRadius: '20px' }}>
                <CardContent>
                <div style={{ height: 350, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </div>
                </CardContent>
            </Card>
        </Box>
        
    )
}

export default PostTable;