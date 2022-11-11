export default function DataGrid(){
    return {
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    '& .MuiDataGrid-cell:focus': {
                        border: 'none !important',
                        outline: 'none !important'
                    },
                    '& .MuiDataGrid-columnHeader': {
                        border: 'none !important',
                        outline: 'none !important'
                    }
                }
            }
        }
    }
}