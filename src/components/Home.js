import react from "react";

const Home = ({ user }) => {
  return (
    <>
      <h1>Welcome To Stranger's Things</h1>
      {user && <h3>You are logged in as: {user}</h3>}
    </>
  );
};

export default Home;
