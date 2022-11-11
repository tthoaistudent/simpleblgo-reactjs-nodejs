import {
    Box, 
    Typography,
    TextField,
    InputAdornment,
    Chip
} from '@mui/material'

import SearchIcon from '@mui/icons-material/Search';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const BlogFilter = (props) => {

    const { tags, onSearch } = props;

    const handleChange = (event) => {
        onSearch(event.target.value);
    }

    return (
        <Box 
            sx={{
                margin: '10px 0px'
            }}
        >
            <Box
                sx={{
                    marginTop: 2
                }}
            >
                <TextField
                    id="input-with-icon-textfield"
                    placeholder="Search..."
                    fullWidth
                    onChange={handleChange}
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                    }}
                    variant="outlined"
                />
            </Box>
            <Box
                sx={{
                    marginTop: 2
                }}
            >
                <Typography variant="h5" color="initial">
                    Tag
                </Typography>
                { tags && tags.map((item, key) => {
                    return (
                        <Chip 
                            icon={<LocalOfferIcon />} 
                            key={key}
                            size='small' label={item.title} 
                        />
                    )
                }) }
                
            </Box>
        </Box>
    )
}

export default BlogFilter;