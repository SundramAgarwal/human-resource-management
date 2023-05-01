import React, { useEffect, useState } from 'react'
import {AiOutlineEye} from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom'
import { SpinnerImg } from '../../components/loader/Loader'
import { FILTER_EMPLOYEES, selectFilteredEmployees } from '../../redux/features/employee/filterSlice'
import Search from '../../components/search/Search'
import { getEmployees } from '../../redux/features/employee/employeeSlice'
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice'


const ViewAttendance = () => {

  const [search, setSearch] = useState("")
  const filteredEmployees = useSelector(selectFilteredEmployees)
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const {employees,
    isLoading,
    isError,
    message
   } = useSelector((state) => state.employee)

  const shortenText = (text, n) => { 
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...")
      return shortenedText
    }
    return text
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getEmployees())
    }
    if (isError) {
      console.log(message)
    }
  },[isLoggedIn, isError, message, dispatch])


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

  return (
    <div className='product-list'>
      <div className='table'>
        <div className='--flex-between --flex-dir-column'>
          <span>
            <h1>View Attendance</h1>
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
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {
                  currentItems.map((employee, index) => {
                    const {_id,first_name,last_name} = employee
                    return (
                      <tr key = {_id}>
                        <td>{index + 1}</td>
                        <td>{shortenText(first_name + " " + last_name, 20)}</td>
                        <td className='icons'>
                          <span className='test'>
                            <Link to={`/employee-attendance/${_id}`}>
                              <AiOutlineEye size={25} color={"purple"} />
                            </Link>
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

export default ViewAttendance