import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'material-react-toastify';


import {
    TextField,
    Grid,
} from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'

// import from project
import { updateProfile } from 'store/reducers/auth'

const EditProfile = (props) =>{
    const {currentUser} = props;
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState(currentUser.firstName);
    const [lastName, setLastName] = useState(currentUser.lastName);
    const [address, SetAddress] = useState(currentUser.address);
    const [phone,setPhone] = useState(currentUser.phone);
    const [description, setDescription] = useState(currentUser.description);
    const [email, setEmail] = useState(currentUser.email);

    const handleSubmit = async () =>{
        const data = {firstName, lastName, address, phone, description};
        await dispatch(updateProfile(data));
    }

    return (
        <Card sx={{borderRadius:"20px"}}>
            <CardHeader
              title="Edit Profile"
            />
            <CardContent>
                <Grid container spacing={1} rowSpacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            id="outlined-name"
                            label="First Name"
                            value={firstName}
                            fullWidth 
                            onChange={(event)=>setFirstName(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="outlined-name"
                            label="Last Name"
                            value={lastName}
                            fullWidth
                            onChange={(event)=>setLastName(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                                id="outlined-name"
                                label="Email"
                                value={email}
                                fullWidth
                                onChange={event => setEmail(event.target.value)}
                            />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                                id="outlined-name"
                                label="Phone"
                                value={phone}
                                fullWidth
                                onChange={(event)=>setPhone(event.target.value)}
                            />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                                id="outlined-name"
                                label="Address"
                                value={address}
                                fullWidth
                                onChange={(event)=>SetAddress(event.target.value)}
                            />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Description"
                            fullWidth
                            multiline
                            rows={4}
                            value={description}
                            onChange={event=>setDescription(event.target.value)}
                            />
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={handleSubmit}
                >
                    Save
                </Button>
            </CardActions>
        </Card>
    )
}

export default EditProfile;