import React, { useEffect } from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./pages/Home/Home";
import Reset from "./pages/authentication/Reset";
import EmployeeReset from "./pages/employeeAuthentication/EmployeeReset";
import Forgot from "./pages/authentication/Forgot";
import EmployeeForgot from "./pages/employeeAuthentication/EmployeeForgot";
import Login from "./pages/authentication/Login";
import EmployeeLogin from "./pages/employeeAuthentication/EmployeeLogin";
import Register from "./pages/authentication/Register";
import Dashboard from './pages/dashboard/Dashboard';
import EmployeeDashboard from './pages/dashboard/EmployeeDashboard';
import MarkAttendance from './pages/Attendance/MarkAttendance';
import ViewAttendance from './pages/Attendance/ViewAttendance';
import Sidebar from './components/sidebar/Sidebar';
import EmployeeSidebar from './components/sidebar/EmployeeSidebar';
import Layout from './components/layout/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { getLoginStatus } from './services/authService';
import { SET_LOGIN } from './redux/features/auth/authSlice';
import AddEmployee from "./pages/addEmployee/AddEmployee";
import EmployeeDetail from './components/employee/employeeDetail/EmployeeDetail';
import Profile from './pages/profile/Profile';
import EditEmployee from './pages/editEmployee/EditEmployee';
import EditProfile from './pages/profile/EditProfile';
import EmployeeEditProfile from './pages/profile/EmployeeEditProfile'
import Contact from './pages/contact/Contact';
import LeaveApplications from "./pages/leaveApplication/LeaveApplications"
import AppliedApplications from "./pages/leaveApplication/AppliedApplications"
import EmployeeAttendance from './components/employee/employeeAttendance/EmployeeAttendance';
import EmployeeAllApplications from './components/employee/employeeApplication/EmployeeAllApplications'
import { ShowWhenEmployeeIsLoggedInAndAdminIsLoggedOut, ShowWhenEmployeeIsLoggedOutAndAdminIsLoggedIn } from './components/protect/HiddenLink';

axios.defaults.withCredentials = true;

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus()
      dispatch(SET_LOGIN(status))
      // here status is passing as a payload
    }
    loginStatus()
  }, [dispatch])
  
  return (
    // browser router surrounds all our routes
    <BrowserRouter>  
    <ToastContainer/>
      <Routes>
        <Route path = "/" element = {<Home/>} />
        <Route path = "/login" element = {<Login/>} />
        <Route path = "/employeelogin" element = {<EmployeeLogin/>} />
        <Route path = "/register" element = {<Register/>} />
        <Route path = "/forgot" element = {<Forgot/>} />
        <Route path = "/employeeforgot" element = {<EmployeeForgot/>} />
        <Route path = "/resetpassword/:resetToken" element = {<Reset/>} />
        <Route path = "/employeeresetpassword/:resetToken" element = {<EmployeeReset/>} />
        <Route path = "/dashboard" element = {
          <Sidebar>
            <Layout>
              <Dashboard/>
            </Layout>
          </Sidebar>
        } />
        <Route path = "/employeedashboard" element = {
          <EmployeeSidebar>
            <Layout>
              <EmployeeDashboard/>
            </Layout>
          </EmployeeSidebar>
        } />
        <Route
          path="/add-employee" element={
            <Sidebar>
              <Layout>
                <AddEmployee />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/employee-detail/:id" element={
            <Sidebar>
              <Layout>
                <EmployeeDetail />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-employee/:id" element={
            <Sidebar>
              <Layout>
                <EditEmployee />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/profile" element={
            <Sidebar>
              <Layout>
                <Profile />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-profile" element={
            <Sidebar>
              <Layout>
                <EditProfile />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/employee-edit-profile" element={
            <EmployeeSidebar>
              <Layout>
                <EmployeeEditProfile />
              </Layout>
            </EmployeeSidebar>
          }
        />
        <Route
          path="/contact-us" element={
            <>
              <ShowWhenEmployeeIsLoggedOutAndAdminIsLoggedIn>
                <Sidebar>
                  <Layout>
                    <Contact />
                  </Layout>
                </Sidebar>
              </ShowWhenEmployeeIsLoggedOutAndAdminIsLoggedIn>

              <ShowWhenEmployeeIsLoggedInAndAdminIsLoggedOut>
                <EmployeeSidebar>
                  <Layout>
                    <Contact />
                  </Layout>
                </EmployeeSidebar>
              </ShowWhenEmployeeIsLoggedInAndAdminIsLoggedOut>
            </>
          }
        />
        <Route
          path="/mark-attendance" element={
            <Sidebar>
              <Layout>
                <MarkAttendance />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/view-attendance" element={
            <Sidebar>
              <Layout>
                <ViewAttendance />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/employee-attendance/:id" element={
            <Sidebar>
              <Layout>
                <EmployeeAttendance />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/leave-applications" element={
            <Sidebar>
              <Layout>
                <LeaveApplications />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/applied-applications" element={
            <Sidebar>
              <Layout>
                <AppliedApplications />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/employee-all-applications/:id" element={
            <Sidebar>
              <Layout>
                <EmployeeAllApplications />
              </Layout>
            </Sidebar>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
