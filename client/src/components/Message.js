import { useSelector, useDispatch } from 'react-redux';
import { destroyMessage } from 'store/reducers/message'
import {
    Snackbar,
    Alert
} from '@mui/material'

const Message = () => {
    const message = useSelector(state => state.message);
    const dispatch = useDispatch();

    const typeMessage = message.error ? 'error' :  'success';
    const open = ( message.error || message.success) ? true : false;
    const messageContent = message.error || message.success;
    const handleClose = () =>{
        dispatch(destroyMessage());
    }

    return (
       open && <Snackbar open={open} 
                  autoHideDuration={2000}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Alert onClose={handleClose} 
                            severity={typeMessage} 
                            sx={{ width: '100%'}}>
                        {messageContent}
                    </Alert>
                </Snackbar>
            )
}

export default Message;