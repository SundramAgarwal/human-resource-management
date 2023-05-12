import React from 'react'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import EmployeeHeader from '../header/EmployeeHeader'
import { ShowWhenEmployeeIsLoggedInAndAdminIsLoggedOut, ShowWhenEmployeeIsLoggedOutAndAdminIsLoggedIn } from '../../components/protect/HiddenLink';

const Layout = ({children}) => {
  return (
    <>
      <ShowWhenEmployeeIsLoggedOutAndAdminIsLoggedIn>
          <Header/>
          <div style = {{minHeight: "80vh"}} className = '--pad'>
              {children}
          </div>
          <Footer/>

      </ShowWhenEmployeeIsLoggedOutAndAdminIsLoggedIn> 
      
      <ShowWhenEmployeeIsLoggedInAndAdminIsLoggedOut>
          <EmployeeHeader/>
          <div style = {{minHeight: "80vh"}} className = '--pad'>
              {children}
          </div>
          <Footer/>
      </ShowWhenEmployeeIsLoggedInAndAdminIsLoggedOut>
    </>
  )
}

export default Layout;