import React from 'react';
import { GiHumanPyramid } from "react-icons/gi"
import {Link} from 'react-router-dom'
import './Home.css';
import heroImg from "../../assets/img_1485.jpg";
import { ShowOnLogin, ShowOnLogout } from '../../components/protect/HiddenLink';
const Home = () => {
  return (
    <div className='home --hom'>
        <nav className='container --flex-between'>
            <div className='logo'>
                <GiHumanPyramid size = {80}/>
            </div>
            <ul className='home-links'>
            <ShowOnLogout>
                <li>
                    <Link to='/register'>Register</Link>
                </li>
                <li>
                    <button className='--btn --btn-primary'>
                        <Link to='/login'>Login</Link>
                    </button>
                </li>
            </ShowOnLogout>
            <ShowOnLogin>
                <li>
                    <button className='--btn --btn-primary'>
                        <Link to='/dashboard'>Dashboard</Link>
                    </button>
                </li>
            </ShowOnLogin>
            </ul>

        </nav>

        <section className='container hero'>

            <div className='hero-text'>
                <h2>HUMAN RESOURCE MANAGEMENT</h2>
                <p>Human Resource Management is to manage the data of University Staff in real time and integrate to make it easier to manage all staff activities. </p>
                <div className='hero-buttons'>
                    <button className='--btn --btn-secondary'>
                        {/* <Link to='/minorDetails'>Minor Details of Employees.</Link> */}
                    </button>
                </div>
                <div className='--flex-start'>
                    <NumberText num = "0" text="Brand Owners" />
                    <NumberText num = "3" text="Active Users" />
                    <NumberText num = "0" text="Partners" />
                </div> 
            </div> 

            <div className='hero-image'>
                <img src={heroImg}  alt = "HR Management"></img>
            </div>
        </section>
    </div>
  )
};

const NumberText = ({num,text}) => {
    return (
        <div className='--mr'>
            <h3 className='--color-white'>{num}</h3>
            <p className='--color-white'>{text}</p>
        </div>
    )
};

export default Home;
