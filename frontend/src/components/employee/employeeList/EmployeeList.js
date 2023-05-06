import React, { useEffect, useState } from 'react'
import './EmployeeList.scss'
import { SpinnerImg } from '../../loader/Loader'
import {FaEdit, FaTrashAlt} from "react-icons/fa"
import {AiOutlineEye} from "react-icons/ai"
import Search from '../../search/Search'
import { useDispatch, useSelector } from 'react-redux'
import { FILTER_EMPLOYEES, selectFilteredEmployees } from '../../../redux/features/employee/filterSlice'
import ReactPaginate from 'react-paginate'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { deleteEmployee, getEmployees } from '../../../redux/features/employee/employeeSlice'
import { Link } from 'react-router-dom'


const EmployeeList = ({employees,isLoading}) => {

  const [search, setSearch] = useState("")
  const filteredEmployees = useSelector(selectFilteredEmployees)
  const dispatch = useDispatch()

  const shortenText = (text, n) => { 
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...")
      return shortenedText
    }
    return text
  };

  const delEmployee = async (id) => {
      await dispatch(deleteEmployee(id))
      await dispatch(getEmployees())
  }

  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Delete Employee',
      message: 'Are you sure you want to delete Employee?',
      buttons: [
        {
          label: 'Delete',
          onClick: () => delEmployee(id)
        },
        {
          label: 'Cancel',
          onClick: () => alert('Employee Not Deleted')
        }
      ]
    });
  }


  //begin pagination
  const [currentItems, setCurrentItems] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(filteredEmployees.slice(itemOffset,endOffset));
    setPageCount(Math.ceil(filteredEmployees.length / itemsPerPage));
  },[itemOffset,itemsPerPage,filteredEmployees]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredEmployees.length;
    setItemOffset(newOffset);
  }
  //end pagination

useEffect(() => {
  dispatch(FILTER_EMPLOYEES({employees,search}))
},[employees,search,dispatch]);

// useEffect(() => {
//   currentItems.map((employee) => {
//     const {employeeId} = employee
//     return (
//       dispatch(FILTER_ATTENDANCE({attendances,employeeId,searchDate}))
//     )
//   })},[employee,attendances,searchDate,dispatch])

  return (
    <div className='product-list'>
      <hr/>
      <div className='table'>
        <div className='--flex-between --flex-dir-column'>
          <span>
            <h2>Employees</h2>
          </span>
          <span>
            <Search value={search} onChange={(e) => setSearch(e.target.value)}/>
          </span>
        </div>

        {isLoading && <SpinnerImg/>}

        <div className='table'>
          {!isLoading && employees.length === 0 ? (
            <p>No employee Found please add a employee</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Role</th>
                  <th>Gender</th>
                  <th>Blood Group</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  currentItems.map((employee, index) => {
                    const {_id,first_name,last_name,department,role,gender,blood_group} = employee
                    return (
                      <tr key = {_id}>
                        <td>{index + 1}</td>
                        <td>{shortenText(first_name + "  " + last_name, 20)}</td>
                        <td>{department}</td>
                        <td>{role}</td>
                        <td>{gender}</td>
                        <td>{blood_group}</td>
                        <td className='icons'>
                          <span className='test'>
                            <Link to={`/employee-detail/${_id}`}>
                              <AiOutlineEye size={25} color={"purple"} />
                            </Link>
                          </span>
                          <span>
                            <Link to={`/edit-employee/${_id}`}>
                              <FaEdit size={20} color={"green"} />
                            </Link>
                          </span>
                          <span>
                            <FaTrashAlt size = {18} color = {'red'} onClick={() => confirmDelete(_id)}/>
                          </span>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={10}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName='pagination'
          pageLinkClassName='page-num'
          previousLinkClassName='page-num'
          nextLinkClassName='page-num'
          activeClassName='activePage'
        />
      </div>
    </div>
  )
}

export default EmployeeList