export default function Paper(){
    return {
        MuiPaper: {
            styleOverrides: {
                root: {
                    '& .MuiPaper-root': {
                        backGround: 'red'
                    }
                }
            }
        }
    }
}