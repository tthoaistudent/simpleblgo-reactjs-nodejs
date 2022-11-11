import { memo } from 'react';

import {
    Box,
    Card,
    Grid,
    TextField,
    InputAdornment,
    CardContent
} from '@mui/material'

import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';


const PostFilter = () => {

    const CustomTextField = styled(TextField)(() => ({
        '& fieldset': {
          borderRadius: '10px',
        }
      }));

    return (
        <Box>
            <Card sx={{ width: '100%', borderRadius: '20px' }}>
                <CardContent>
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            <CustomTextField
                                placeholder = 'Seach...'
                                fullWidth
                                InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                                
                                }}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    )

}

export default memo(PostFilter);