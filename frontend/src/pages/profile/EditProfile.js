import React, { useEffect, useState } from 'react'
import "./Profile.scss"
import useRedirectLoggedOutAdmin from '../../customHook/useRedirectLoggedOutAdmin'
import { useSelector } from 'react-redux'
import { selectAdmin } from '../../redux/features/auth/authSlice'
import Loader from '../../components/loader/Loader'
import Card from '../../components/card/Card'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { updateAdmin } from '../../services/authService'
import ChangePassword from '../../components/changePassword/ChangePassword'

const EditProfile = () => {
    useRedirectLoggedOutAdmin('/login')

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const admin = useSelector(selectAdmin);
    const {email} = admin;

    useEffect(() => {
        if(!email) {
            navigate("/profile")
        }
    },[email,navigate])

    const initialState = {
        name: admin?.name,
        email: admin?.email,
        phone: admin?.phone,
        bio: admin?.bio,
        photo: admin?.photo,
    }
    const [profile, setProfile] = useState(initialState);
    const [profileImage, setProfileImage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
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
                name: profile.name,
                phone: profile.phone,
                bio: profile.bio,
                photo: profileImage ? imageURL : profile.photo,
            }
            
            const data = await updateAdmin(formData)
            console.log(data)
            toast.success("Admin updated")
            navigate('/profile')
            setIsLoading(false)
            
        } catch (error) {
            setIsLoading(false)
            toast.error(error.message)
        }
    }

  return (
    <div className='profile --my2'>
    {/* if isLoading is true loader will be active */}
        {isLoading && <Loader/>} 
        <Card cardClass={"card  --flex-dir-column"}>
            <span className='profile-photo'>
                <img src = {admin?.photo} alt = "ProfilePic"/>
            </span>
            <form className='--form-control --m' onSubmit={saveProfile}>
                <span className='profile-data'>
                    <p>
                        <label>Name:</label>
                        <input type='text' name='name' value={profile?.name} onChange={handleInputChange}/>
                    </p>
                    <p>
                        <label>Email:</label>
                        <input type='text' name='email' value={profile?.email} disabled/>
                        <br/>
                        <code>Email cannot be changed</code>
                    </p>
                    <p>
                        <label>Phone:</label>
                        <input type='text' name='phone' value={profile?.phone} onChange={handleInputChange}/>
                    </p>
                    <p>
                        <label>Bio:</label>
                    </p>
                    <textarea name='bio' value={profile?.bio} onChange={handleInputChange} cols='30' rows='10'></textarea>
                    <p>
                        <label>Photo:</label>
                        <input type='file' name='image' onChange={handleImageChange}/>
                    </p>
                    <div>  
                        <button className='--btn --btn-primary'>Save Changes</button>    
                    </div>
                </span>
            </form>
        </Card>
        <br/>
        <ChangePassword/>
    </div>
  )
}

export default EditProfile
