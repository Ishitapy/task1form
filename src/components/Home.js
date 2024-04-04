import React from "react";
import { Link } from "react-router-dom";
import FormDataList from "./FormDataList";

function Home() {
  return (
    <div className="App">
      <h1>
        <strong>Welcome to Home Page</strong>
      </h1>
      <Link to="/Form">
        <button>Create</button>
      </Link>
      <FormDataList></FormDataList>
    </div>
  );
}

export default Home;
