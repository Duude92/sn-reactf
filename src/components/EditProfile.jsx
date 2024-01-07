import { param, post } from 'jquery';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from 'reactstrap';
import { fetchAspData } from '../App'
import { FetchData } from './FetchData';
import ProfileImage from './ProfileImage';
import styles from './Styles/EditProfile.module.css'

export default function EditProfile() {
  let params = useParams()
  console.log(params);
  const [profile, setProfile] = useState({});
  const [username, setUsername] = useState('')
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [image, setImage] = useState('')

  useEffect(() => {
    fetchAspData('api/editprofile').then(data => {
      setProfile(data);
      setEmail(data.email);
      setUsername(data.userName);
      setFullname(data.fullName);
      setImage(data.profileImage)
    });
  }, []);
  const updateProfile = async event => {
    event.preventDefault();
    let sendProfile = profile;
    sendProfile.name = username;
    sendProfile.nameNormalized = username.toUpperCase();
    sendProfile.fullName = fullname;
    sendProfile.email = email;
    sendProfile.normalizedEmail = email.toUpperCase();
    sendProfile.profileImage = image;
    let response = (await fetchAspData('api/editprofile', 'PUT', JSON.stringify(sendProfile)).json());
  }
  return (
    <div>
      <form onSubmit={updateProfile}>
        <input placeholder='Username' value={username} onChange={event => setUsername(event.target.value)} />
        <input placeholder='User fullname' value={fullname} onChange={event => setFullname(event.target.value)} />
        {console.log(profile)}
        <ProfileImage authorPicture={image} />
        <input placeholder='User e-mail' value={email} onChange={event => setEmail(event.target.value)} />
        <Button type='text' value='Submit'>Update profile</Button>
      </form>
    </div>
  )
}
