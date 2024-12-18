import React, { useState } from "react";
import Home from "./components/InitialDispaly";
import Quiz from "./components/Quiz";
import { submitQuiz } from "./services/Question";

const App = () => {
  const [user, setUser] = useState("");

  if (!user) {
    return <Home setUser={setUser} />;
  }

  return <Quiz user={user} submitQuiz={submitQuiz} />;
};

export default App;
