import react from "react";
import { Route, Switch, Link, useHistory } from "react-router-dom";

const Home = ({ username }) => {
  return (
    <>
      <div className="container">
        <div className="ui floating message">
          <h3 className="centered ui header">Welcome To Stranger's Things</h3>
          {username && (
            <h3 className="centered ui header">
              You are logged in as: {username}
            </h3>
          )}
        </div>
        <div className="ui fluid card">
          <div className="content">
            <Link className="left floated aligned header" to="/posts">
              <h1>See Posts</h1>
            </Link>
          </div>
        </div>
        <div className="ui fluid card">
          <div className="content">
            <Link className="left floated aligned header" to="/posts/create">
              <h1>Make Post</h1>
            </Link>
          </div>
        </div>
        <div className="ui fluid card">
          <div className="content">
            <Link className="left floated aligned header" to="Profile">
              <h1>My Account</h1>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
