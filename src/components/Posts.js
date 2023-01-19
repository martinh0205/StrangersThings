import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deletePost } from "../api/api";

import "./Posts.css";

const Posts = ({ posts, setPosts, token, username }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    const searchTermLower = searchTerm.toLowerCase().split(" ");
    if (searchTermLower) {
      const filtered = posts.filter((postObject) => {
        const filterableValues = [
          postObject.title,
          postObject.description,
          postObject.location,
          postObject.price,
          postObject.author.username,
        ];

        for (let value of filterableValues) {
          if (value.toLowerCase().includes(searchTermLower)) {
            return true;
          }
        }
        return false;
      });
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [searchTerm, posts]);

  const handleDeleteClick = async (postId) => {
    await deletePost(token, postId);
    setPosts((prevPosts) => prevPosts.filter((post) => post.Id !== postId));
  };

  return (
    <>
      <div className="ui secondary menu">
        <div className="post-item">Posts</div>
        <div className="right menu">
          <div className="ui icon input">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            ></input>
          </div>
          {token ? (
            <Link to="/posts/create" className="ui button">
              Create Post
            </Link>
          ) : null}
        </div>
      </div>
      <div className="container">
        <section>
          {filteredPosts.map((posts) => {
            return (
              <>
                <div className="grid" key={posts._id}>
                  <div className="ui fluid card">
                    <div className="content">
                      <div className="left floated aligned header">
                        <h1>{posts.title}</h1>
                      </div>

                      <p className="description">{posts.description}</p>

                      <p className="center aligned extra content">
                        Price: {posts.price}
                      </p>
                      <p className="center aligned extra content">
                        By: {posts.author.username}
                      </p>
                      <p className="center aligned extra content">
                        Location: {posts.location}
                      </p>
                    </div>
                    <div className="center aligned header">
                      <Link to={`/posts/${posts._id}`} className="link">
                        View Post
                      </Link>
                    </div>
                    {posts.isAuthor && token ? (
                      <button
                        className="negative ui button"
                        onClick={() => {
                          handleDeleteClick(posts._id);
                        }}
                      >
                        Delete
                      </button>
                    ) : null}

                    <div
                      role="list"
                      className="ui divided relaxed list"
                      style={{ color: "#444", clear: "both" }}
                    >
                      {posts.messages.map((messages) => {
                        return (
                          <div
                            role="listitem"
                            className="item"
                            key={messages._id}
                          >
                            {messages.fromUser.username !== username ? (
                              <>
                                <b className="comments">
                                  {messages.fromUser.username}{" "}
                                </b>
                                <p className="comments">{messages.content}</p>
                              </>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </section>
      </div>
    </>
  );
};

export default Posts;
