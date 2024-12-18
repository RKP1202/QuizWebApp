import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Award, Loader2 } from "lucide-react";
import { getRandomQuestions, submitQuizResults } from '../services/Question';

const Quiz = ({ user, submitQuiz , numQuestions = 10 }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const fetchQuestions = async (numQuestions) => {
    try {
      const fetchedQuestions = await getRandomQuestions(numQuestions);

      // Add a console log to debug
      console.log("Fetched Questions:", fetchedQuestions);

      if (fetchedQuestions.length === 0) {
        setError("No questions available. Please try again.");
        setLoading(false);
        return;
      }

      setQuestions(fetchedQuestions);
      setLoading(false);
    } catch (error) {
      console.error("Question Fetching Error:", error);
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
    const totalQuestions = questions.length;

    questions.forEach((question, index) => {
      const selectedOptionId = selectedAnswers[index];
      const selectedOption = question.options.find(opt => opt.id === selectedOptionId);

      if (selectedOption && selectedOption.is_correct) {
        correctCount++;
      }
    });

    const scorePercentage = (correctCount / totalQuestions) * 100;

    setScore(correctCount);
    setCorrectAnswers(correctCount);
    return scorePercentage;
  };

  const handleSubmit = async () => {
    try {
      const scorePercentage = calculateScore();

      await submitQuizResults(
        user,
        scorePercentage,
        questions.length,
        score
      );

      setShowResults(true);
    } catch (error) {
      setError("Failed to submit quiz");
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-center flex flex-col items-center gap-4">
              <Award className="w-16 h-16 text-yellow-500" />
              <h2 className="text-2xl font-bold">Quiz Completed!</h2>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-xl">Your score: {score} out of {questions.length}</p>
            <Progress
              value={(score / questions.length) * 100}
              className="w-full"
            />
            <p className="text-gray-500">
              Percentage: {((score / questions.length) * 100).toFixed(1)}%
            </p>
            {questions.map((question, index) => {
              const selectedOption = question.options.find(
                opt => opt.id === selectedAnswers[index]
              );
              const correctOption = question.options.find(opt => opt.is_correct);

              return (
                <div
                  key={question.id}
                  className={`p-4 rounded-lg ${selectedOption?.is_correct ? 'bg-green-50' : 'bg-red-50'
                    }`}
                >
                  <p className="font-medium">{question.question}</p>
                  <p className="text-sm mt-2">
                    Your answer: {selectedOption?.option}
                  </p>
                  {!selectedOption?.is_correct && (
                    <p className="text-sm text-green-600 mt-1">
                      Correct answer: {correctOption?.option}
                    </p>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Quiz for {user}</span>
            <span className="text-sm">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </CardTitle>
          <Progress value={(currentQuestion / questions.length) * 100} />
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
                    className="w-full justify-start text-left h-auto py-4 px-6"
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
            onClick={() => setCurrentQuestion(curr => Math.max(0, curr - 1))}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          {currentQuestion < questions.length - 1 ? (
            <Button
              onClick={() => setCurrentQuestion(curr => curr + 1)}
              disabled={selectedAnswers[currentQuestion] === undefined}
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={Object.keys(selectedAnswers).length !== questions.length}
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