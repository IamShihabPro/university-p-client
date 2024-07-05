import { Outlet } from "react-router-dom";

const AdminLayuot = () => {
    return (
        <div>
            <h1>This is admin navbar</h1>
            <Outlet></Outlet>
        </div>
    );
};

export default AdminLayuot;