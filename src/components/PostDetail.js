import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { addComment } from "../api/api";
import "./Posts.css";

const PostDetail = (props) => {
  const { token, posts, getPosts, username } = props;
  const { postId } = useParams();
  const [commentText, setCommentText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const singlePost = posts.find((onePost) => {
    const foundPost = onePost._id == postId;
    return foundPost;
  });

  console.log(singlePost);
  console.log("post detail username", username, singlePost);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const { success, error, content } = await addComment(
      token,
      postId,
      commentText
    );

    if (success) {
      console.log("we succesfully added a comment");
      setCommentText("");
      await getPosts();
    } else {
      setErrorMessage(error);
      console.log("failed to add a comment");
    }
  };

  if (singlePost) {
    return (
      <div className="container">
        <div className="posts-container">
          <div className="ui fluid card">
            <div className="content">
              <div className="left floated aligned header">
                <h1>{singlePost.title}</h1>
              </div>

              <p className="description">{singlePost.description}</p>

              <p className="center aligned extra content">
                Price: {singlePost.price}
              </p>
              <p className="center aligned extra content">
                By: {singlePost.author.username}
              </p>
              <p className="center aligned extra content">
                Location:{singlePost.location}
              </p>

              <>
                <div
                  role="list"
                  className="ui divided relaxed list"
                  style={{ color: "#444", clear: "both" }}
                >
                  {singlePost.messages.map((messages) => {
                    return (
                      <div role="listitem" className="item" key={messages._id}>
                        {messages.fromUser.username !== username ? (
                          <>
                            <b>{messages.fromUser.username} </b>
                            <p className="content">{messages.content}</p>
                          </>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
                {token ? (
                  <form className="ui comments" onSubmit={handleOnSubmit}>
                    <h3 className="ui diving header">Comments</h3>
                    <input
                      type="text"
                      placeholder="New Comment"
                      value={commentText}
                      onChange={(event) => {
                        setCommentText(event.target.value);
                      }}
                    ></input>
                    <button type="submit">Send</button>
                    {errorMessage ? (
                      <p style={{ color: "red", backgroundColor: "pink" }}>
                        Operation Failed {errorMessage}{" "}
                      </p>
                    ) : null}
                  </form>
                ) : null}
              </>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
};

export default PostDetail;
