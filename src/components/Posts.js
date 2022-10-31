import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deletePost } from "../api/api";
import "./Posts.css";

const Posts = ({ posts, setPosts, token, username }) => {
  console.log(posts);
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
      <header>
        <h1 className="ui centered header">Posts</h1>
      </header>
      <div className="post-nav">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        ></input>
        {token ? (
          <Link to="/posts/create" className="ui button">
            Create Post
          </Link>
        ) : null}
      </div>

      <section>
        {filteredPosts.map((posts) => {
          return (
            <>
              <div className="posts-container " key={posts._id}>
                <div className="ui fluid card">
                  <div className="content">
                    <div className="left floated aligned header">
                      <h1>{posts.title}</h1>
                    </div>

                    <p className="description">{posts.description}</p>

                    <p className="center aligned extra content">
                      {posts.price}
                    </p>
                    <p className="center aligned extra content">
                      {posts.author.username}
                    </p>
                    <p className="center aligned extra content">
                      {posts.location}
                    </p>
                  </div>
                  <div className="center aligned header">
                    <Link to={`/posts/${posts._id}`}>View Post</Link>
                  </div>
                  {posts.isAuthor && token ? (
                    <button
                      className="negative ui button left floated"
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
    </>
  );
};

export default Posts;
