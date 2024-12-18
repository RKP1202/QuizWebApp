
import React, { useState } from 'react';
import InitialDisplay from './components/InitialDispaly';
import Quiz from './components/Quiz';

function App() {
  const [user, setUser] = useState(null);
  const [numQuestions, setNumQuestions] = useState(10);

  return (
    <div>
      {!user ? (
        <InitialDisplay 
          setUser={setUser} 
          setNumQuestions={setNumQuestions} 
        />
      ) : (
        <Quiz 
          user={user} 
          numQuestions={numQuestions} 
        />
      )}
    </div>
  );
}

export default App;


