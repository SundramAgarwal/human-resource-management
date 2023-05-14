import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SpinnerImg } from "../../components/loader/Loader";
import {
  FILTER_EMPLOYEES,
  selectFilteredEmployees,
} from "../../redux/features/employee/filterSlice";
import ReactPaginate from "react-paginate";
import Search from "../search/Search";

import AttendanceCard from "./AttendanceCard";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Attendance = ({
  attendance,
  employees,
  isLoading,
  saveAttendance,
  handleAttendanceChange,
}) => {
  const [search, setSearch] = useState("");
  const filteredEmployees = useSelector(selectFilteredEmployees);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const today = new Date();
  const date = today.toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const messageOnSubmit = () => {
    toast.success("Attendance Marked Successfully!");
    navigate("/dashboard");
  };

  //begin pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(filteredEmployees.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredEmployees.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredEmployees]);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % filteredEmployees.length;
    setItemOffset(newOffset);
  };
  //end pagination

  useEffect(() => {
    dispatch(FILTER_EMPLOYEES({ employees, search }));
  }, [employees, search, dispatch]);

  return (
    <div className="product-list">
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h1>Mark Attendance</h1>
            <h2>Date: {date}</h2>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        </div>

        {isLoading && <SpinnerImg />}

        <form onSubmit={messageOnSubmit}>
          <div className="table">
            {!isLoading && employees.length === 0 ? (
              <p>No employee Found please add a employee</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Name</th>
                    <th>Mark Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((employee, index) => {
                    const { _id, first_name, last_name } = employee;
                    return (
                      <AttendanceCard
                        key={_id}
                        _id={_id}
                        first_name={first_name}
                        last_name={last_name}
                        index={index}
                      />
                    );
                  })}
                </tbody>
              </table>
            )}
            <div className="--my">
              <button type="submit" className="--btn --btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={10}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeClassName="activePage"
        />
      </div>
    </div>
  );
};

export default Attendance;
