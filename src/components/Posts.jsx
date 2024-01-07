import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BASE_API_URL } from "../App";
import Post from "./Post";
import PostForm from "./PostForm";

export default function Posts(props) {
  const [state, updateState] = useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const [posts, setPosts] = useState([]);

  const addPosts = (postsData) => {
    if (postsData === undefined) return;
    let Posts = [];
    postsData.forEach((element) => {
      Posts.push(<Post key={element.id} data={element} linkedPost />);
    });
    setPosts(Posts);
  };
  const fetchPosts = async () => {
    const response = await fetch(BASE_API_URL + "api/posts", {
      method: "GET",
      headers: {
        Accept: "application/json, text/javascript",
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
    const data = await response.json();
    addPosts(data);
  };

  if (props.data !== undefined && posts.length !== props.data.length) {
    addPosts(props.data);
  }

  useEffect(
    (_) => {
      document.addEventListener("onPostsUpdated", () => {
        console.log("updating");
        forceUpdate();
      });
      if (props.data === undefined && posts.length === 0) {
        fetchPosts();
      }
    },
    [state]
  );

  return (
    <Box>
      <PostForm />
      {posts}
    </Box>
  );
}
