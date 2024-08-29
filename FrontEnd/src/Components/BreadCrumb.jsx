
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);
    let breadcrumbPath = "";
    
    return (
        <div className="breadcrumbs text-lg">
            <Link to="/Home/Dashboard">Home</Link>
            {pathnames.map((name, index) => {
                breadcrumbPath += `/${name}`;
                const isLast = index === pathnames.length - 1;
                return isLast && (
                    <span key={breadcrumbPath}> {'>'} <span className="underline font-bold ">{name}</span></span>
                ) 
            })}
        </div>
    );
};

export default Breadcrumbs;