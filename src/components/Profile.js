import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Posts.css";

const Profile = (props) => {
  const { token, posts, getPosts, username } = props;

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
        <div className="container">
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
                          Price:{posts.price}
                        </p>
                        <p className="center aligned extra content">
                          By:{posts.author.username}
                        </p>
                        <p className="center aligned extra content">
                          Location:{posts.location}
                        </p>
                      </div>
                      <div className="center aligned header">
                        <Link to={`/posts/${posts._id}`} className="link">
                          View Post
                        </Link>
                      </div>

                      <div
                        role="list"
                        className="ui divided relaxed list"
                        style={{ color: "#444", clear: "both" }}
                      >
                        <div className="ui comments">
                          <h3 className="ui dividing header">Messages</h3>
                          {posts.messages.map((messages) => {
                            return (
                              <>
                                {messages.fromUser.username !== username ? (
                                  <div
                                    role="listitem"
                                    className="item"
                                    key={messages._id}
                                  >
                                    <div className="avatar">
                                      <img src="https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg" />
                                    </div>
                                    <div className="author">
                                      <b className="comments">
                                        {messages.fromUser.username}{" "}
                                      </b>
                                      <p className="content">
                                        {messages.content}
                                      </p>
                                    </div>
                                  </div>
                                ) : null}
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Profile;
