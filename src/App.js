import React, { useEffect, useState } from "react";
import {
  Home,
  Posts,
  AccountForm,
  PostCreateForm,
  PostDetail,
  Profile,
} from "./components";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import { fetchPosts, fetchUser } from "./api/api";

const App = ({ username, filteredPosts }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(
    window.localStorage.getItem("token") || null
  );
  const [user, setUser] = useState(null);

  const history = useHistory();

  const getPosts = async () => {
    const { error, posts } = await fetchPosts(token);

    if (error) {
      console.error(error);
    }
    setPosts(posts);
  };

  useEffect(() => {
    getPosts();
  }, [token]);

  /* useEffect(() => {
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

  */

  useEffect(() => {
    console.log("HERE");
    if (token) {
      const getUser = async () => {
        const { username } = await fetchUser(token);
        console.log("username", username);
        setUser(username);
      };
      getUser();
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      window.localStorage.setItem("token", token);
    } else {
      window.localStorage.removeItem("token");
    }
  }, [token]);

  const logOut = () => {
    setToken(null);
    setUser(null);
    history.push("/");
  };

  return (
    <div className="container">
      <nav className="ui pointing secondary menu">
        <Link className="item" to="/">
          Home
        </Link>
        <Link className="item" to="/Posts">
          Posts
        </Link>
        <div className="right menu">
          <Link className="item" to="/Profile">
            Profile
          </Link>
          {token ? (
            <button onClick={logOut} className="item">
              Log Out
            </button>
          ) : (
            <>
              <Link className="item" to="/Account/login">
                Login
              </Link>
              <Link className="item" to="/Account/register">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
      <Switch>
        <Route className="item" exact path="/">
          <Home username={user} />
        </Route>
        <Route className="item" path="/posts/create">
          <PostCreateForm token={token} setPosts={setPosts} />
        </Route>
        <Route className="item" path="/posts/:postId">
          <PostDetail
            posts={posts}
            token={token}
            getPosts={getPosts}
            username={user}
          />
        </Route>
        <Route className="item" path="/Posts">
          <Posts
            posts={posts}
            token={token}
            setPosts={setPosts}
            username={user}
          />
        </Route>
        <Route className="item" path="/Account/:action">
          <AccountForm setToken={setToken} />
        </Route>

        <Route className="item" path="/Profile">
          <Profile
            posts={posts}
            token={token}
            getPosts={getPosts}
            username={user}
            filteredPosts={filteredPosts}
          />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
