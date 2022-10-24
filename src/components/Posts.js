import React from "react";
import { Link } from "react-router-dom";

const Posts = ({ posts }) => {
  return (
    <>
      <header>
        <h1>Posts</h1>
      </header>
      <section>
        {posts.map((posts) => {
          return (
            <div key={posts._id} className="ui card">
              <div className="content">
                <div className="center aligned header">
                  <h1>{posts.title}</h1>
                </div>

                <p className="description">{posts.description}</p>

                <p className="center aligned extra content">{posts.price}</p>
                <p className="center aligned extra content">
                  {posts.author.username}
                </p>
                <p className="center aligned extra content">{posts.location}</p>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default Posts;
