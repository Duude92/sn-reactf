import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_API_URL } from "../App";
import { useInit } from "../Init";
import authService from "./api-authorization/AuthorizeService";
import Posts from "./Posts";
import ProfileImage from "./ProfileImage";
import styles from "./Styles/Profile.module.css";

export default function Profile() {
  let parameters = useParams();
  const [profiledata, setProfileData] = useState({});
  const [isLocalUser, setIsLocalUser] = useState(false);

  let fetchProfile = async () => {
    const response = await fetch(
      BASE_API_URL + "api/profile/" + parameters.name,
      {
        method: "GET",
        headers: {
          Accept: "application/json, text/javascript",
          "Content-Type": "application/json",
        },
        mode: "cors",
      }
    );
    let profileData = await response.json();
    setIsLocalUser(
      profileData.userName === (await authService.getUser()).username
    );
    console.log(profileData.userName, (await authService.getUser()).username);

    await setProfileData(profileData);
  };

  useInit(() => fetchProfile());

  return (
    <div>
      <div className={styles.profile}>
        <ProfileImage authorPicture={profiledata.profileImage} />
        <div className={styles.username}>
          <h5>{profiledata.userName}</h5>
          {profiledata.fullName}
        </div>
        {isLocalUser && <div className={styles.setupUser} />}
      </div>
      {console.log(profiledata.posts)}
      <Posts data={profiledata.posts} />
    </div>
  );
}
