import React, { useEffect, useState } from "react";
import { Home, Posts } from "./components";
import { Route, Switch, Link } from "react-router-dom";
import { fetchPosts } from "./api/api";

const App = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const result = await fetchPosts();
        setPosts(result);
      } catch (error) {
        console.error(error);
      }
    };
    getPosts();
  }, []);
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/Posts">Posts</Link>
      </nav>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/Posts">
          <Posts posts={posts} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
