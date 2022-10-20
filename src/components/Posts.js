import React from "react";

const Posts = ({ posts }) => {
  return (
    <>
      <header>
        <h1>Posts</h1>
      </header>
      <section>
        {posts.map((posts, index) => {
          return (
            <div key={index}>
              <h1>{posts.title}</h1>
              <p>{posts.description}</p>
              <p>{posts.price}</p>
              <p>{posts.author.username}</p>
              <p>{posts.location}</p>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default Posts;
