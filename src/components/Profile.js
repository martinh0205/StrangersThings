import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Posts.css";

const Profile = (props) => {
  const { token, posts, getPosts, username } = props;

  console.log(posts, "profile posts");
  return (
    <>
      <header>
        {token ? (
          <h3 className="ui centered header">{username}'s Profile</h3>
        ) : (
          <h3 className="ui centered header">Please Log In To View Profile</h3>
        )}
      </header>
      <section>
        {posts.map((posts) => {
          return (
            <>
              {posts.isAuthor && token && posts.messages.length > 0 ? (
                <div className="posts-container" key={posts._id}>
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

                    <div
                      role="list"
                      className="ui divided relaxed list"
                      style={{ color: "#444", clear: "both" }}
                    >
                      {posts.messages.map((messages) => {
                        return (
                          <>
                            {messages.fromUser.username !== username ? (
                              <div
                                role="listitem"
                                className="item"
                                key={messages._id}
                              >
                                <b className="comments">
                                  {messages.fromUser.username}{" "}
                                </b>
                                <p className="comments">{messages.content}</p>
                              </div>
                            ) : null}
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : null}
            </>
          );
        })}
      </section>
    </>
  );
};

export default Profile;
