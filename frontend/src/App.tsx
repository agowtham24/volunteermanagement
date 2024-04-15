import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./home/home";
import { AdminLogin } from "./admin/login/login";
import { ViewOrganizations } from "./admin/viewOrganizations/viewOrganizations";
import { ViewVolunteers } from "./admin/viewVolunteers/viewVolunteers";
import { ViewTasks } from "./admin/viewTasks/viewTasks";
import { OrganizationLogin } from "./organization/login/login";
import { OrgTasks } from "./organization/tasks/tasks";
import { VolunteerLogin } from "./volunteer/login/login";
import { VolunteerTasks } from "./volunteer/tasks/tasks";
import { Performance } from "./volunteer/performanceTracking/performance";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/organizations" element={<ViewOrganizations />} />
        <Route path="/admin/volunteers" element={<ViewVolunteers />} />
        <Route path="/admin/tasks" element={<ViewTasks />} />
        <Route path="/organization/login" element={<OrganizationLogin />} />
        <Route path="/organization/tasks" element={<OrgTasks />} />
        <Route path="/volunteer/login" element={<VolunteerLogin />} />
        <Route path="/volunteer/tasks" element={<VolunteerTasks />} />
        <Route path="/volunteer/performance" element={<Performance />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
