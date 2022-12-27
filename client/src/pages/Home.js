import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Search from '../components/Search';
import AppsIcon from '@material-ui/icons/Apps';
import Avatar from '@mui/material/Avatar';


const Home = () => {

    return (
        <div className='home'>
            <div className='home__header'>
                <div className='home__headerLeft'>
                    <Link to='/dashboard'>Dashboard</Link>
                    <a target="_blank" href='https://github.com/joshuabecker91/googleclonewithads'>About</a>
                </div>
                <div className='home__headerRight'>
                    <a target="_blank" href='https://www.linkedin.com/in/beckerjoshua/'>LinkedIn</a>
                    <a target="_blank" href='https://s3practiceboto3.s3.us-west-2.amazonaws.com/joshua_becker_resume.pdf'>Resume</a>
                    <AppsIcon/>
                    <Avatar>G</Avatar>
                </div>
            </div>
            <div className='home__body'>
                <img src='https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png' alt=''></img>
                <div className="home__inputContainer">
                    <Search/>
                </div>
            </div>
        </div>
    )
}

export default Home;