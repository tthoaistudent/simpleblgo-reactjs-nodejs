import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const BLogItem = (props) => {

    const { item } = props;

    return (
        <Card sx={{ maxWidth: 345, margin: 2, flex: 3 }}>
            <CardMedia
                component="img"
                height="140"
                image={`${process.env.REACT_APP_API_IMGAGE}/${item.img}`}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {item && item.title}
                </Typography>
                <Typography 
                    variant="body2" 
                    sx={{maxHeight: 100, overflow: 'hidden'}}
                    color="text.secondary">
                {item && item.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    )
}

export default BLogItem;