import {
    List,
    ListItem,
    ListItemAvatar,
    ListItemText
} from '@mui/material'

import {
    EditLocation,
    LocalPhone,
    MailOutline

} from '@mui/icons-material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

const Introduce = (props) =>{
    const { currentUser } = props
    return (
        <Card sx={{borderRadius: '20px'}}>
            <CardHeader
              title="Introduction"
              variant="h5"
            />
          <CardContent>
            <Typography variant="p" color="initial">
                {currentUser.description}
            </Typography>
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <EditLocation />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={currentUser.address}
                    />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <LocalPhone />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={currentUser.phone}
                    />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <MailOutline />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary="admin@gmail.com"
                    />
                </ListItem>
            </List>
          </CardContent>
        </Card>
    )
}

export default Introduce;