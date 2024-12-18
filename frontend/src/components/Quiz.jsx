// import React, { useEffect, useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
// import { Award, Loader2 } from "lucide-react";
// import { getRandomQuestions, submitQuizResults } from '../services/Question';

// const Quiz = ({ user, submitQuiz , numQuestions = 10 }) => {
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showResults, setShowResults] = useState(false);
//   const [score, setScore] = useState(0);
//   const [correctAnswers, setCorrectAnswers] = useState(0);

//   const fetchQuestions = async (numQuestions) => {
//     try {
//       const fetchedQuestions = await getRandomQuestions(numQuestions);

//       // Add a console log to debug
//       console.log("Fetched Questions:", fetchedQuestions);

//       if (fetchedQuestions.length === 0) {
//         setError("No questions available. Please try again.");
//         setLoading(false);
//         return;
//       }

//       setQuestions(fetchedQuestions);
//       setLoading(false);
//     } catch (error) {
//       console.error("Question Fetching Error:", error);
//       setError("Failed to load questions: " + error.message);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchQuestions(numQuestions);
//   }, [numQuestions]);

//   const handleAnswerSelect = (questionIndex, optionId) => {
//     setSelectedAnswers({
//       ...selectedAnswers,
//       [questionIndex]: optionId
//     });
//   };

//   const calculateScore = () => {
//     let correctCount = 0;
//     const totalQuestions = questions.length;

//     questions.forEach((question, index) => {
//       const selectedOptionId = selectedAnswers[index];
//       const selectedOption = question.options.find(opt => opt.id === selectedOptionId);

//       if (selectedOption && selectedOption.is_correct) {
//         correctCount++;
//       }
//     });

//     const scorePercentage = (correctCount / totalQuestions) * 100;

//     setScore(correctCount);
//     setCorrectAnswers(correctCount);
//     return scorePercentage;
//   };

//   const handleSubmit = async () => {
//     try {
//       const scorePercentage = calculateScore();

//       await submitQuizResults(
//         user,
//         scorePercentage,
//         questions.length,
//         score
//       );

//       setShowResults(true);
//     } catch (error) {
//       setError("Failed to submit quiz");
//     }
//   };


//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Loader2 className="h-8 w-8 animate-spin" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-red-500">{error}</p>
//       </div>
//     );
//   }

//   if (showResults) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//         <Card className="w-full max-w-2xl">
//           <CardHeader>
//             <CardTitle className="text-center flex flex-col items-center gap-4">
//               <Award className="w-16 h-16 text-yellow-500" />
//               <h2 className="text-2xl font-bold">Quiz Completed!</h2>
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="text-center space-y-4">
//             <p className="text-xl">Your score: {score} out of {questions.length}</p>
//             <Progress
//               value={(score / questions.length) * 100}
//               className="w-full"
//             />
//             <p className="text-gray-500">
//               Percentage: {((score / questions.length) * 100).toFixed(1)}%
//             </p>
//             {questions.map((question, index) => {
//               const selectedOption = question.options.find(
//                 opt => opt.id === selectedAnswers[index]
//               );
//               const correctOption = question.options.find(opt => opt.is_correct);

//               return (
//                 <div
//                   key={question.id}
//                   className={`p-4 rounded-lg ${selectedOption?.is_correct ? 'bg-green-50' : 'bg-red-50'
//                     }`}
//                 >
//                   <p className="font-medium">{question.question}</p>
//                   <p className="text-sm mt-2">
//                     Your answer: {selectedOption?.option}
//                   </p>
//                   {!selectedOption?.is_correct && (
//                     <p className="text-sm text-green-600 mt-1">
//                       Correct answer: {correctOption?.option}
//                     </p>
//                   )}
//                 </div>
//               );
//             })}
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <Card className="max-w-2xl mx-auto">
//         <CardHeader>
//           <CardTitle className="flex justify-between items-center">
//             <span>Quiz for {user}</span>
//             <span className="text-sm">
//               Question {currentQuestion + 1} of {questions.length}
//             </span>
//           </CardTitle>
//           <Progress value={(currentQuestion / questions.length) * 100} />
//         </CardHeader>
//         <CardContent className="space-y-6">
//           {questions.length > 0 && (
//             <div className="space-y-4">
//               <h3 className="text-lg font-medium">
//                 {questions[currentQuestion].question}
//               </h3>
//               <div className="space-y-2">
//                 {questions[currentQuestion].options.map((option) => (
//                   <Button
//                     key={option.id}
//                     variant={selectedAnswers[currentQuestion] === option.id ? "default" : "outline"}
//                     className="w-full justify-start text-left h-auto py-4 px-6"
//                     onClick={() => handleAnswerSelect(currentQuestion, option.id)}
//                   >
//                     {option.option}
//                   </Button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </CardContent>
//         <CardFooter className="flex justify-between">
//           <Button
//             variant="outline"
//             onClick={() => setCurrentQuestion(curr => Math.max(0, curr - 1))}
//             disabled={currentQuestion === 0}
//           >
//             Previous
//           </Button>
//           {currentQuestion < questions.length - 1 ? (
//             <Button
//               onClick={() => setCurrentQuestion(curr => curr + 1)}
//               disabled={selectedAnswers[currentQuestion] === undefined}
//             >
//               Next
//             </Button>
//           ) : (
//             <Button
//               onClick={handleSubmit}
//               disabled={Object.keys(selectedAnswers).length !== questions.length}
//             >
//               Submit Quiz
//             </Button>
//           )}
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// export default Quiz;


import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Award, Loader2, Clock, CheckCircle, XCircle } from "lucide-react";
import { getRandomQuestions, submitQuizResults } from '../services/Question';

const Quiz = ({ user, submitQuiz, numQuestions = 10 }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!showResults) {
        setTimer(prev => prev + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [showResults]);

  const fetchQuestions = async (numQuestions) => {
    try {
      const fetchedQuestions = await getRandomQuestions(numQuestions);
      if (fetchedQuestions.length === 0) {
        setError("No questions available. Please try again.");
        setLoading(false);
        return;
      }
      setQuestions(fetchedQuestions);
      setLoading(false);
    } catch (error) {
      setError("Failed to load questions: " + error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions(numQuestions);
  }, [numQuestions]);

  const handleAnswerSelect = (questionIndex, optionId) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: optionId
    });
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach((question, index) => {
      const selectedOptionId = selectedAnswers[index];
      const selectedOption = question.options.find(opt => opt.id === selectedOptionId);
      if (selectedOption?.is_correct) correctCount++;
    });
    setScore(correctCount);
    setCorrectAnswers(correctCount);
    return (correctCount / questions.length) * 100;
  };

  const handleSubmit = async () => {
    try {
      const scorePercentage = calculateScore();
      await submitQuizResults(user, scorePercentage, questions.length, score);
      setIsTransitioning(true);
      setTimeout(() => {
        setShowResults(true);
        setIsTransitioning(false);
      }, 500);
    } catch (error) {
      setError("Failed to submit quiz");
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNavigateQuestion = (direction) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentQuestion(curr => direction === 'next' ? curr + 1 : Math.max(0, curr - 1));
      setIsTransitioning(false);
    }, 300);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
          <p className="text-lg animate-pulse">Loading your quiz...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-6">
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-500 text-lg">{error}</p>
            <Button className="mt-4" onClick={() => fetchQuestions(numQuestions)}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className={`w-full max-w-2xl transform transition-all duration-500 ${isTransitioning ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
          <CardHeader>
            <CardTitle className="text-center flex flex-col items-center gap-4">
              <Award className={`w-16 h-16 ${score / questions.length >= 0.7 ? 'text-yellow-500' : 'text-blue-500'} animate-bounce`} />
              <h2 className="text-2xl font-bold">Quiz Completed!</h2>
              <div className="flex items-center gap-2 text-gray-500">
                <Clock className="w-4 h-4" />
                <span>Time taken: {formatTime(timer)}</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="space-y-2">
              <p className="text-xl font-semibold">Your score: {score} out of {questions.length}</p>
              <Progress
                value={(score / questions.length) * 100}
                className="w-full h-4 rounded-full transition-all duration-1000"
              />
              <p className="text-gray-500">
                Percentage: {((score / questions.length) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="space-y-4">
              {questions.map((question, index) => {
                const selectedOption = question.options.find(opt => opt.id === selectedAnswers[index]);
                const correctOption = question.options.find(opt => opt.is_correct);
                const isCorrect = selectedOption?.is_correct;

                return (
                  <div
                    key={question.id}
                    className={`p-4 rounded-lg border transition-all duration-300 hover:shadow-md ${
                      isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 mt-1" />
                      )}
                      <div>
                        <p className="font-medium">{question.question}</p>
                        <p className={`text-sm mt-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                          Your answer: {selectedOption?.option}
                        </p>
                        {!isCorrect && (
                          <p className="text-sm text-green-600 mt-1">
                            Correct answer: {correctOption?.option}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Card className={`max-w-2xl mx-auto transform transition-all duration-300 ${isTransitioning ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Quiz for {user}</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{formatTime(timer)}</span>
              </div>
              <span className="text-sm">
                Question {currentQuestion + 1} of {questions.length}
              </span>
            </div>
          </CardTitle>
          <Progress 
            value={(currentQuestion / questions.length) * 100}
            className="transition-all duration-300"
          />
        </CardHeader>
        <CardContent className="space-y-6">
          {questions.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                {questions[currentQuestion].question}
              </h3>
              <div className="space-y-2">
                {questions[currentQuestion].options.map((option) => (
                  <Button
                    key={option.id}
                    variant={selectedAnswers[currentQuestion] === option.id ? "default" : "outline"}
                    className={`w-full justify-start text-left h-auto py-4 px-6 transition-all duration-200 ${
                      selectedAnswers[currentQuestion] === option.id 
                        ? 'ring-2 ring-offset-2 ring-primary'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleAnswerSelect(currentQuestion, option.id)}
                  >
                    {option.option}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => handleNavigateQuestion('prev')}
            disabled={currentQuestion === 0}
            className="transition-all duration-200 hover:bg-gray-100"
          >
            Previous
          </Button>
          {currentQuestion < questions.length - 1 ? (
            <Button
              onClick={() => handleNavigateQuestion('next')}
              disabled={selectedAnswers[currentQuestion] === undefined}
              className="transition-all duration-200"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={Object.keys(selectedAnswers).length !== questions.length}
              className="transition-all duration-200 bg-green-600 hover:bg-green-700"
            >
              Submit Quiz
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Quiz;