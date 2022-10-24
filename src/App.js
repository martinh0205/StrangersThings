import React, { useEffect, useState } from "react";
import { Home, Posts, AccountForm } from "./components";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import { fetchPosts, fetchUser } from "./api/api";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(
    window.localStorage.getItem("token") || ""
  );
  const [user, setUser] = useState(null);

  const history = useHistory();

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
    window.localStorage.setItem("token", token);
  }, [token]);

  const logOut = () => {
    setToken(null);
    setGuest(null);
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
          <Home user={user} />
        </Route>
        <Route className="item" path="/Posts">
          <Posts posts={posts} />
        </Route>
        <Route className="item" path="/Account/:action">
          <AccountForm setToken={setToken} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
