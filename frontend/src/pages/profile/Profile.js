import React, { useEffect, useState } from 'react';
import './Profile.scss';
import useRedirectLoggedOutAdmin from '../../customHook/useRedirectLoggedOutAdmin';
import { useDispatch } from 'react-redux';
import { getAdmin } from '../../services/authService';
import { SET_ADMIN } from '../../redux/features/auth/authSlice';
import { SET_NAME } from '../../redux/features/auth/authSlice';
import { SpinnerImg } from '../../components/loader/Loader';
import Card from '../../components/card/Card';
import { Link } from 'react-router-dom';

const Profile = () => {
    useRedirectLoggedOutAdmin('/login')
    const dispatch = useDispatch()

    const [profile, setProfile] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        async function getAdminData() {
            const data = await getAdmin()

            setProfile(data)
            setIsLoading(false)
            await dispatch(SET_ADMIN(data))
            await dispatch(SET_NAME(data.name))
        }
        getAdminData()
    },[dispatch])


  return (
    <div className='profile --my2'>
        {isLoading && <SpinnerImg/>}
        <>
            {!isLoading && profile === null ? (
                <p>Something went wrong,please reload the page...</p>
            ) : (
                <Card cardClass={"card  --flex-dir-column"}>
                    <span className='profile-photo'>
                        <img src = {profile?.photo} alt = "ProfilePic"/>
                    </span>
                    <span className='profile-data'>
                        <p>
                            <b>Name : </b> {profile?.name}
                        </p>
                        <p>
                            <b>Email : </b> {profile?.email}
                        </p>
                        <p>
                            <b>Phone : </b> {profile?.phone}
                        </p>
                        <p>
                            <b>Bio : </b> {profile?.bio}
                        </p>
                        <div>
                            <Link to = '/edit-profile'>
                                <button className='--btn --btn-primary'>Edit Profile</button>
                            </Link>
                        </div>
                    </span>
                </Card>
            )}
        </>
    </div>
  )
}

export default Profile