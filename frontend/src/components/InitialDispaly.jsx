import React, { useState } from "react";
import { checkQuizStatus } from "../services/Question";

const InitialDisplay = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleStartQuiz = async () => {
    try {
      const response = await checkQuizStatus(username);
      alert(response.message);
      setUser(username);
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div>
      <h1>Ready to Challenge Your Brain? 🚀</h1>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value.toUpperCase())}
      />
      <button onClick={handleStartQuiz}>Start Quiz</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default InitialDisplay;
