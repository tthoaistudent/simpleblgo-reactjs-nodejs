import { Suspense } from "react";
import LoaderHome from "./LoaderHome";

const HomeLoading = (Component) => (props) => {

    return (
        <Suspense fallback={<LoaderHome />}>
            <Component {...props}/>
        </Suspense>
    )
}

export default HomeLoading;