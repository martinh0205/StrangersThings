import react from "react";

const Home = ({ username }) => {
  return (
    <>
      <h1 className="centered ui header">Welcome To Stranger's Things</h1>
      {username && (
        <h3 className="centered ui header">You are logged in as: {username}</h3>
      )}
    </>
  );
};

export default Home;
