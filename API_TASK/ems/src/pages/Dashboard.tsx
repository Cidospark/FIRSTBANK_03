import { Outlet } from "react-router-dom";

function DashboardLayout(){
    return (
        <div>
          <h1>Dashboard</h1>
          <Outlet /> {/* Renders the matched child route component */}
        </div>
      );
}

export default DashboardLayout