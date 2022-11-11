// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { ToastContainer } from 'material-react-toastify';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
    return (
        <ThemeCustomization>
            <ScrollTop>
                <Routes />
            </ScrollTop>
            <ToastContainer 
                autoClose={8000}
            />
        </ThemeCustomization>
    )
}



    


export default App;
