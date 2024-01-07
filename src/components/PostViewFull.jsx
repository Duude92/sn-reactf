import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_API_URL, fetchAspData } from "../App";
import Post from "./Post";
import PostForm from "./PostForm";

export default function PostViewFull() {
  const parameters = useParams();
  const [post, setPost] = useState();
  const [answers, setAnswers] = useState();
  console.log(parameters);
  useEffect(() => {
    fetchPost();
  }, [parameters]);

  let fetchPost = async () => {
    const response = await fetchAspData("api/posts/" + parameters.id, "GET");
    // const response = await fetch(BASE_API_URL + "api/posts/" + parameters.id, {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json, text/javascript",
    //     "Content-Type": "application/json",
    //   },
    //   mode: "cors",
    // });
    let element = await response.json();
    setPost(<Post key={element.id.toString()} data={element} />);
    let answerArray = [];
    element.answers.forEach((answer) => {
      answerArray.push(<Post key={answer.id} data={answer} linkedPost />);
    });
    setAnswers(answerArray);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {post}
      <PostForm answerFor={parameters.id} />
      {answers}
    </Box>
  );
}
