import React, { useEffect } from 'react'
import "./EmployeeSummary.scss"
import { AiOutlineFile } from 'react-icons/ai'
// import { GrProjects} from 'react-icons/gr'
import { IoIosMan } from 'react-icons/io'
// import { BiCategory } from 'react-icons/bi'
import InfoBox from '../../infoBox/InfoBox'
import { useDispatch, useSelector } from 'react-redux'
import { CALC_DEPARTMENT,
         selectDepartment,
       } from '../../../redux/features/employee/employeeSlice';

//Icons 
const departmentIcon = <AiOutlineFile size = {40} color = '#fff' />
const employeeIcon= <IoIosMan size = {40} color = 'white'/>
// const categoryIcon= <BiCategory size = {40} color = '#fff'/>
// const projectIcon= <GrProjects size = {30} color = 'white'/>


//Format Amount
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}

const EmployeeSummary = ({employees}) => {
  const dispatch = useDispatch();
  const department = useSelector(selectDepartment)

  useEffect(() => {
    dispatch(CALC_DEPARTMENT(employees))
  },[dispatch,employees])

  return (
    <div className='product-summary'>
      <h2>Employee Stats</h2>
      <div className='info-summary'>
        <InfoBox icon = {employeeIcon} title = {'Total Employees'} count = {employees.length} bgColor = 'card1'/>
        <InfoBox icon = {departmentIcon} title = {'Total Departments'} count = {department.length} bgColor = 'card2'/>
        {/* <InfoBox icon = {projectIcon} title = {'Running Projects'} count = {5} bgColor = 'card3'/>
        <InfoBox icon = {categoryIcon} title = {'Upcoming Projects'} count = {9} bgColor = 'card4'/> */}
        {/* <InfoBox icon = {earningIcon} title = {'Total Store Value'} count = {`$${formatNumbers(totalStoreValue.toFixed(2))}`} bgColor = 'card2'/> */}

      </div>
    </div>
  )
}

export default EmployeeSummary