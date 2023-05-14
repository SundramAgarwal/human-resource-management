import React, { useEffect, useState } from 'react'
import "./Profile.scss"
import useRedirectLoggedOutEmployee from '../../customHook/useRedirectLoggedOutEmployee'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectEmployee } from '../../redux/features/employee/employeeAuthSlice'
import { updateEmployeeItself } from '../../redux/features/employee/employeeAuthServices'
import { toast } from 'react-toastify'
import EmployeeChangePassword from '../../components/employeeChangePassword/EmployeeChangePassword'
import Loader from '../../components/loader/Loader'
import Card from '../../components/card/Card'

const EmployeeEditProfile = () => {
  useRedirectLoggedOutEmployee('/employeelogin')

  const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const employee = useSelector(selectEmployee);
    const {email} = employee;

    useEffect(() => {
      if(!email) {
          navigate("/employeedashboard")
      }
  },[email,navigate])

  const initialState = {
    employee_code: employee?.employee_code,
    first_name: employee?.first_name,
    last_name: employee?.last_name,
    department: employee?.department,
    designation: employee?.designation,
    role: employee?.role,
    class_assigned: employee?.class_assigned,
    contact_number: employee?.contact_number,
    email: employee?.email,
    address: employee?.address,
    date_of_joining: employee?.date_of_joining,
    date_of_birth: employee?.date_of_birth,
    gender: employee?.gender,
    blood_group: employee?.blood_group,
    image: employee?.image,
  }

  const [employeeProfile, setEmployeeProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeProfile({ ...employeeProfile, [name]: value });
};

const handleImageChange = (e) => {
    setProfileImage(e.target.files[0])
};

const saveProfile = async (e) => {
  e.preventDefault()
  setIsLoading(true)
  try {
      //handle image upload
      let imageURL;
      if (
          profileImage && 
          (
              profileImage.type === 'image/jpeg' ||
              profileImage.type === 'image/jpg' ||
              profileImage.type === 'image/png'
          )
      ) {
          const image = new FormData()
          image.append('file',profileImage)
          image.append('cloud_name','ds0f5yl4y') 
          image.append('upload_preset','mcgko7q6')

          //first save image to cloudinary
          const response = await fetch(
              'https://api.cloudinary.com/v1_1/ds0f5yl4y/image/upload',
              { method: "post", body: image }
          );
          const imageData = await response.json()
          imageURL = imageData.url.toString()
          }
          // save profile
      const formData = {
          first_name: employeeProfile.first_name,
          last_name: employeeProfile.last_name,
          contact_number: employeeProfile.contact_number,
          email: employeeProfile.email,
          blood_group: employeeProfile.blood_group,
          address: employeeProfile.address,
          date_of_birth: employeeProfile.date_of_birth,
          image: profileImage ? imageURL : employeeProfile.image,
      }
      
      const data = await updateEmployeeItself(formData)
      console.log(data)
      toast.success("Employee updated")
      navigate('/employeedashboard')
      setIsLoading(false)
      
  } catch (error) {
      setIsLoading(false)
      toast.error(error.message)
  }
}

  return (
    <div className='profile --my2'>
      {isLoading && <Loader/>}
      <Card cardClass = {"card --flex-dir-column"}>
        <span className='profile-photo'>
            <img src = {employee?.image} alt = "ProfilePic"/>
        </span>
        <form className='--form-control --m' onSubmit={saveProfile}>
          <span className='profile-data'>
            <p>
              <label>ID:</label>
              <input type = "text" name='_id' value = {employeeProfile?.employee_code} disabled/>
            </p>
            <p>
              <label>First Name:</label>
              <input type = "text" name='first_name' value = {employeeProfile?.first_name} onChange={handleInputChange}/>
            </p>
            <p>
              <label>Last Name:</label>
              <input type = "text" name='last_name' value = {employeeProfile?.last_name} onChange={handleInputChange}/>
            </p>
            <p>
              <label>Email:</label>
              <input type = "text" name='email' value = {employeeProfile?.email} onChange={handleInputChange}/>
            </p>
            <p>
              <label>Contact:</label>
              <input type = "text" name='contact_number' value = {employeeProfile?.contact_number} onChange={handleInputChange}/>
            </p>
            <p>
              <label>DOB:</label>
              <input type = "date" 
                     name='date_of_birth' 
                     value = {employeeProfile?.date_of_birth} 
                     onChange={handleInputChange}
                     style={{ width: "40.5%",
                              height: "3.5vh",
                              margin:"10px 0 10px 0 ",
                              padding: "8px 12px",
                              boxSizing: "border-box",
                              fontSize: "16px"  
                             }}/>
            </p>
            <p>
              <label>Gender:</label>
              <input type = "text" name='gender' value = {employeeProfile?.gender} disabled/>
            </p>
            <p>
              <label>Blood Group:</label><br/>
              <select
                name="blood_group"
                value={employeeProfile?.blood_group}
                onChange={handleInputChange}
              >
                <option value="">Select a blood group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </p>
            <p>
              <label>Department:</label>
              <input type = "text" name='department' value = {employeeProfile?.department} disabled/>
            </p>
            <p>
              <label>Designation:</label>
              <input type = "text" name='designation' value = {employeeProfile?.designation} disabled/>
            </p>
            <p>
              <label>Role:</label>
              <input type = "text" name='role' value = {employeeProfile?.role} disabled/>
            </p>
            <p>
              <label>Classes Assigned:</label>
              <input type = "text" name='class_assigned' value = {employeeProfile?.class_assigned} disabled/>
            </p>
            <p>
              <label>Date of Joining:</label>
              <input type = "text" name='date_of_joining' value = {employeeProfile?.date_of_joining} disabled/>
            </p>
            <p>
              <label>Address:</label><br/>
              <textarea
                     rows = '5' 
                     cols = '47' 
                     name='address' 
                     style={{fontSize: '16px',resize: "none"}}
                     value = {employeeProfile?.address} 
                     onChange={handleInputChange}></textarea>
            </p>
            <p>
                <label>Image:</label>
                <input type='file' name='image' onChange={handleImageChange}/>
            </p>
            <div>  
                <button className='--btn --btn-primary'>Save Changes</button>    
            </div>
          </span>
        </form>
      </Card>
      <br/>
        <EmployeeChangePassword/>
    </div>
  )
}

export default EmployeeEditProfile