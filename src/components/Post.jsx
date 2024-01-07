import React from "react";
import styles from "./Styles/Post.module.css";
import { NavLink } from "reactstrap";
import { Link, Outlet, useParams } from "react-router-dom";
import ProfileImage from "./ProfileImage";
import moment from "moment/moment";
import { Paper } from "@mui/material";

export const ContentType = {
  NONE: 0,
  PICTURE: 1,
  VIDEO: 2,
  MUSIC: 3,
  LINK: 4,
  STREAM: 5,
};

function Post(props) {
  const postId = props.data.id;
  const contentID = useParams().photoid;
  const createDate = moment(props.data.createdAt).toDate();
  const dateOptions = { year: "numeric", month: "long", day: "numeric" };

  const contentData = () => {
    switch (props.data.contentType) {
      case ContentType.NONE:
        return <></>;
      case ContentType.PICTURE:
        const elements = props.data.url.map((element) => {
          return (
            <NavLink
              key={100 + element.id}
              tag={Link}
              to={`/posts/${postId}/photo/${element.id}`}
              className={styles.contentLink}
            >
              <div
                key={200 + element.id}
                className={styles.image}
                style={{ backgroundImage: `url(${element.url})` }}
              />
            </NavLink>
          );
        });

        return <div className={styles.contentContainer}>{elements}</div>;
      default:
        break;
    }
  };

  let postData = (_) => {
    return (
      <>
        <article className={styles.postMessage}>
          {props.data.postMessage}
        </article>
        {contentData()}
        <div className={styles.dataField}>
          {createDate.toLocaleString("uk-UA")}
        </div>
      </>
    );
  };

  return (
    // <div className={styles.postContainer + ' ' + (props.linkedPost && styles.postHover)}>
    <Paper
      sx={{ mb: 1, position: "relative", width: "100%" }}
      className={props.linkedPost && styles.postHover}
      elevation={3}
    >
      <ProfileImage
        authorPicture={props.data.authorPicture}
        link={"/" + props.data.authorName}
        smallImage
      />
      <div className={styles.header}>
        <NavLink
          tag={Link}
          to={"/" + props.data.authorName}
          className={styles.profileName}
        >
          {" "}
          {props.data.authorFullName}
        </NavLink>
        <NavLink
          tag={Link}
          to={"/" + props.data.authorName}
          className={styles.profileId}
        >
          {" "}
          {"@" + props.data.authorName}
        </NavLink>
      </div>
      {postData()}
      {props.linkedPost && (
        <NavLink
          tag={Link}
          to={"/posts/" + postId}
          className={styles.postLink}
        />
      )}
      {/* <Outlet context={props.data.url?.map((element) => element.id)} /> */}
      <Outlet context={props.data.url} />
    </Paper>
    // {/* </div> */}
  );
}

Post.propTypes = {};

export default Post;
