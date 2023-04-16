import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import EmployeeForm from "../../components/employee/employeeForm/EmployeeForm";
import {
  getEmployee,
  getEmployees,
  selectIsLoading,
  selectEmployee,
  updateEmployee,
} from "../../redux/features/employee/employeeSlice";

const EditEmployee = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const employeeEdit = useSelector(selectEmployee);

  const [employee, setEmployee] = useState(employeeEdit);
  const [employeeImage, setEmployeeImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  // const [address, setAddress] = useState("");

  useEffect(() => {
    dispatch(getEmployee(id));
  }, [dispatch, id]);

  useEffect(() => {
    setEmployee(employeeEdit);

    setImagePreview(
      employeeEdit && employeeEdit.image ? `${employeeEdit.image.filePath}` : null
    );

    // setAddress(
    //   employeeEdit && employeeEdit.address ? employeeEdit.address : ""
    // );
  }, [employeeEdit]);
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleImageChange = (e) => {
    setEmployeeImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveEmployee = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", employeeImage);
    formData.append("first_name", employee?.first_name);
    formData.append("last_name", employee?.last_name);
    formData.append("email", employee?.email);
    formData.append("department", employee?.department);
    formData.append("designation", employee?.designation);
    formData.append("class_assigned", employee?.class_assigned);
    formData.append("role", employee?.role);
    formData.append("contact_number", employee?.contact_number);
    formData.append("address", employee?.address);
    if (employeeImage) {
      formData.append("image", employeeImage);
    }

    console.log(...formData);

    await dispatch(updateEmployee({ id, formData }));
    await dispatch(getEmployees());
    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Edit Employee</h3>
      <EmployeeForm
        employee={employee}
        employeeImage={employeeImage}
        imagePreview={imagePreview}
        // address={address}
        // setAddress={setAddress}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveEmployee={saveEmployee}
      />
    </div>
  );
};

export default EditEmployee;