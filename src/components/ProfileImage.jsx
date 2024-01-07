import React from "react";
import { NavLink, Link } from "react-router-dom";
import styles from "./Styles/Profile.module.css";

function ProfileImage(props) {
  return props.link ? (
    <NavLink tag={Link} to={props.link}>
      <div
        className={
          props.smallImage ? styles.profileImageSmol : styles.profileImageBig
        }
        style={{ backgroundImage: `url(${props.authorPicture})` }}
      />
    </NavLink>
  ) : (
    <div
      className={
        props.smallImage ? styles.profileImageSmol : styles.profileImageBig
      }
      style={{ backgroundImage: `url(${props.authorPicture})` }}
    />
  );
}

export default ProfileImage;
