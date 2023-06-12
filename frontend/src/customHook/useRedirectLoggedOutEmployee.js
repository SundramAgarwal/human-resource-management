import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_EMPLOYEE_LOGIN } from "../redux/features/employee/employeeAuthSlice";
import { loginStatus } from "../redux/features/employee/employeeAuthServices";
import { toast } from "react-toastify";

const useRedirectLoggedOutEmployee = (path) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const redirectLoggedOutEmployee = async () => {
      const employeeIsLoggedIn = await loginStatus();
      dispatch(SET_EMPLOYEE_LOGIN(employeeIsLoggedIn));

      if (!employeeIsLoggedIn) {
        toast.info("Session expired, please login to continue.");
        navigate(path);
        return;
      }
    };
    redirectLoggedOutEmployee();
  }, [navigate, path, dispatch]);
};

export default useRedirectLoggedOutEmployee;