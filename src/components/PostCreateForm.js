import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createPost } from "../api/api";

const PostCreateForm = ({ token, setPosts, post }) => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  return (
    <div className="container">
      <div className="ui fluid card">
        <div className="content">
          <form
            className="ui form"
            onSubmit={async (event) => {
              event.preventDefault();

              const { error, post } = await createPost(
                token,
                title,
                description,
                price,
                location
              );

              console.log("posts onSubmit");

              if (post) {
                console.log("post", post);
                setPosts((prevPosts) => [...prevPosts, post]);
                setTitle("");
                setDescription("");
                setPrice("");
                setLocation("");
                history.push("/posts");
              } else {
                setErrorMessage(error);
              }
            }}
          >
            <>
              <h2>Create Post</h2>
              <div className="field">
                <label htmlFor="Title">Title</label>
                <input
                  type="text"
                  className="field"
                  placeholder="Title"
                  required
                  autoComplete="off"
                  value={title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                ></input>
              </div>
              <div className="field">
                <label htmlFor="Description">Description</label>
                <input
                  type="text"
                  className="field"
                  placeholder="Description"
                  required
                  autoComplete="off"
                  value={description}
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                ></input>
              </div>

              <div className="field">
                <label htmlFor="Price">Price</label>
                <input
                  type="text"
                  className="field"
                  placeholder="Price"
                  required
                  autoComplete="off"
                  value={price}
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                ></input>
              </div>
              <div className="field">
                <label htmlFor="Location">Location</label>
                <input
                  type="text"
                  className="field"
                  placeholder="Location"
                  autoComplete="off"
                  value={location}
                  onChange={(event) => {
                    setLocation(event.target.value);
                  }}
                ></input>
              </div>

              {errorMessage ? (
                <p className="ui negative message">{errorMessage}</p>
              ) : null}

              <button type="submit" className="ui button">
                Create
              </button>
            </>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostCreateForm;
