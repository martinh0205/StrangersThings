import React, { useState } from "react";
import { registerUser } from "../api/api";
import { useParams, useHistory } from "react-router-dom";

const AccountForm = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { action } = useParams();
  const history = useHistory();
  console.log("action", action);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await registerUser(username, password);
      setToken(data.token);
      history.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const title = action === "login" ? "Log In" : "Sign Up";
  return (
    <div>
      <form className="ui form" onSubmit={onSubmitHandler}>
        <h1>{title}</h1>
        <div className="field">
          <label>Username</label>
          <input
            type="text"
            value={username}
            placeholder="username"
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            placeholder="password"
            minLength="8"
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button className="ui button" type="submit">
          {title}
        </button>
      </form>
    </div>
  );
};

export default AccountForm;
