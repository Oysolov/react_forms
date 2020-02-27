import React, { Component } from 'react';

import classes from './ProfilePage.css';
import BackgroundPicture from '../../assets/images/login_background.png';
import axios from '../../axios';

class ProfilePage extends Component {
    state = {
        profileDetails: {
            id: '',
            username: '',
            email: '',
            gender: '',
            devSkills: ''
        }
    }

    componentDidMount() {
        axios.get('/profile')
            .then(response => {
                const profileDetails = response.data;
                this.setState({profileDetails: profileDetails});
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const gender = this.state.profileDetails.gender === 'Male' ? 'Mr.' : 'Mrs.';


        return (
            <div className={classes.Container}>
                <div className={classes.ImageContainer}>
                    <img src={BackgroundPicture} alt="login" className={classes.Image}/>
                </div>
                <div className={classes.ProfileDetails}>
                    <h1>Hello, {gender} {this.state.profileDetails.username}</h1>
                    <h3>This are the details of your profile:</h3>
                    <p>Email: {this.state.profileDetails.email}</p>
                    <p>DevSkills: {this.state.profileDetails.devSkills}</p>
                </div>
            </div>
        );
    }
}

export default ProfilePage;
