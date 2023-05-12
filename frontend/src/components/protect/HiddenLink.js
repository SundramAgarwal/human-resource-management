import {useSelector} from "react-redux"
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { selectEmployeeIsLoggedIn } from "../../redux/features/employee/employeeAuthSlice";

export const ShowWhenBothAreLogout = ({children}) => {
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const employeeIsLoggedIn = useSelector(selectEmployeeIsLoggedIn)

    if (!isLoggedIn && !employeeIsLoggedIn) {
        return <>{children}</>
    }
    return null
}; 

export const ShowWhenEmployeeIsLoggedOutAndAdminIsLoggedIn = ({children}) => {
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const employeeIsLoggedIn = useSelector(selectEmployeeIsLoggedIn)

    if (isLoggedIn && !employeeIsLoggedIn) {
        return <>{children}</>
    }
    return null
};

export const ShowWhenEmployeeIsLoggedInAndAdminIsLoggedOut = ({children}) => {
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const employeeIsLoggedIn = useSelector(selectEmployeeIsLoggedIn)

    if (!isLoggedIn && employeeIsLoggedIn) {
        return <>{children}</>
    }
    return null
};





