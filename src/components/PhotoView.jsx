import React from "react";
import { Link, NavLink, useOutletContext, useParams } from "react-router-dom";
import styles from "./Styles/Post.module.css";

export default function PhotoView() {
  const params = useParams();
  const context = useOutletContext();
  const ids = context?.map((element) => element.id);

  const Key = ({ isRight }) => {
    const nextID =
      ids.findIndex((item) => item === params.photoid) + (isRight ? 1 : -1);
    return (
      (isRight ? nextID < ids.length : nextID > -1) && (
        <NavLink
          tag={Link}
          to={"../photo/" + ids[nextID]}
          className={`${styles.key} ${
            isRight ? styles.keyRight : styles.keyLeft
          }`}
        >
          <div
            className={`${styles.arrowContainer} ${!isRight && styles.left}`}
          >
            <i className={`${styles.arrow}`} />
          </div>
        </NavLink>
      )
    );
  };
  console.log(context.find((object) => object.id === params.photoid));
  return (
    <div className={styles.photoView}>
      <NavLink to="../" tag={Link} className={styles.photoViewBackground} />
      <div className={styles.imageContainer}>
        <img
          src={`${context.find((object) => object.id === params.photoid)?.url}`}
          alt=" "
          draggable={false}
        />
        <Key isRight={false} />
        <Key isRight={true} />
      </div>
    </div>
  );
}
