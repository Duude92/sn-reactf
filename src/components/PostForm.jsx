import { Button, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { BASE_API_URL, fetchAspData } from "../App";
import authService from "./api-authorization/AuthorizeService";
import { ContentType } from "./Post";
import styles from "./Styles/PostForm.module.css";
import UploadThumbnail from "./UploadThumbnail";

export default function PostForm(properties) {
  const [initState, setInitState] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false);
  if (!initState) {
    authService.isAuthenticated().then((data) => setAuthenticated(data));
    setInitState(true);
  }

  const [contentType, setContentType] = useState(ContentType.NONE);
  const [contentLinks, setContentLinks] = useState([]);
  const [inputVisibility, setInputVisibility] = useState(true);

  const [message, setMessage] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState(null);
  const fileTypes = ["jpg", "png", "tga", "mp4"];

  const toggleEmojis = () => {
    setShowEmojis(!showEmojis);
  };

  let sendData = async (event) => {
    let user = await authService.getUser();
    const token = await authService.getAccessToken();

    let Post = {
      id: 0,
      PostMessage: message,
      ContentType: contentType,
      url: contentLinks,
      User: user.sub,
      Answer: properties.answerFor,
    };
    event.preventDefault();
    let response = await fetchAspData(
      "api/posts",
      "POST",
      JSON.stringify(Post)
    );

    if (response.status === 201) {
      const RerenderPosts = new CustomEvent("onPostsUpdated");

      document.dispatchEvent(RerenderPosts);

      setUploadedFiles(null);
      setMessage("");
      setContentLinks([]);
      setContentType(ContentType.NONE);
    }
    console.log(response);
  };
  let handleChange = (event) => {
    setMessage(event.target.value);
  };
  const handleFileInput = (files) => {
    let fileArray = Array.from(files);
    const ext = fileArray[0].type.split("/")[0];
    switch (ext) {
      case "image":
        if (fileArray.length > 5) {
          setUploadedFiles("Only 5 pictures upload allowed.");
          return;
        }
        setContentType(ContentType.PICTURE);
        break;
      default:
        break;
    }
    console.log(ext);
    let formData = new FormData();
    fileArray
      .filter((file) => file.type.includes(ext))
      .forEach((file) => {
        console.log(file.type);
        formData.append("files", file, file.name);
      });
    fetchAspData("api/content", "POST", formData, "multipart/form-data")
      .then((result) => result.json())
      .then((result) => {
        console.log(result);
        let files = Array.from(result.links);
        let urls = files.map((link) => {
          return {
            id: link.split(".")[0],
            url: BASE_API_URL + "api/content/" + link,
          };
        });
        setContentLinks(urls);
        console.log(urls);

        setUploadedFiles(
          <div className={styles.uploadedFilesPanel}>
            {urls.map((link, key) => (
              <UploadThumbnail src={link.url} key={key} />
            ))}
          </div>
        );
      });
  };

  const toggleInputDrag = () => {
    setInputVisibility(!inputVisibility);
  };
  const revertVisibility = (state) => {
    if (!state && !inputVisibility) setInputVisibility(true);
  };
  const fileUploaded = () => {};
  const postForm = (
    <Paper sx={{ width: "100%", mb: 1 }} elevation={1}>
      <form onSubmit={sendData} className={styles.postForm}>
        <div className={styles.inputField}>
          <input
            type="button"
            onClick={toggleEmojis}
            className={`${styles.emojiButton} ${styles.emojiPosition}`}
            value=":)"
          />
          <div className={`${styles.fileUploader} ${styles.messageInput}`}>
            <FileUploader
              types={fileTypes}
              handleChange={handleFileInput}
              onDraggingStateChange={revertVisibility}
              onDrop={toggleInputDrag}
              classes={styles.fileUploaderComponent}
              multiple
            />
          </div>
          <TextField
            onDragOver={toggleInputDrag}
            sx={{
              mt: 1,
              position: "absolute",
              left: 0,
              width: "100%",
              backgroundColor: "white",
            }}
            style={{ visibility: inputVisibility ? "visible" : "hidden" }}
            value={message}
            onChange={handleChange}
            label="Send a message to the world."
          />
          {/* <LEmojiPicker /> */}
        </div>
        <div className={styles.bottomPanel}>
          {uploadedFiles}
          <Button type="text" variant="contained" value="Submit">
            Send post
          </Button>
        </div>
      </form>
    </Paper>
  );
  return (
    <>{isAuthenticated && postForm}</>
    // <form encType=''="multipart/form-data" method="post" className={styles.postForm}>
  );
}
