import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain, Loader2, Stars } from "lucide-react";
import { checkQuizStatus } from "../services/Question";

const InitialDisplay = ({ setUser, setNumQuestions }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showQuizLengthSelection, setShowQuizLengthSelection] = useState(false);

  const handleStartQuiz = async () => {
    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }

    setLoading(true);
    try {
      const response = await checkQuizStatus(username);
      setShowQuizLengthSelection(true);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleQuizLengthSelection = (numQuestions) => {
    setUser(username);
    setNumQuestions(numQuestions);
  };

  if (showQuizLengthSelection) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 opacity-20 animate-pulse"></div>
        <Card className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl z-10 relative">
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-purple-400 rounded-full opacity-20"></div>
          <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-blue-400 rounded-full opacity-20"></div>
          <CardHeader className="relative z-20">
            <CardTitle className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
                <Stars className="w-6 h-6 text-purple-500" />
                Select Quiz Length
                <Stars className="w-6 h-6 text-purple-500" />
              </h2>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 relative z-20">
            {[10, 20, 30, 50].map((num) => (
              <Button 
                key={num} 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                onClick={() => handleQuizLengthSelection(num)}
              >
                {num} Questions
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/10 rounded-full animate-float-slow"></div>
        <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-float-delay"></div>
      </div>

      <Card className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl z-10 relative">
        {/* Decorative background shapes */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-purple-400 rounded-full opacity-20"></div>
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-blue-400 rounded-full opacity-20"></div>

        <CardHeader className="relative z-20">
          <CardTitle className="text-center flex flex-col items-center gap-4">
            <Brain className="w-16 h-16 text-blue-500 animate-pulse" />
            <h1 className="text-2xl font-bold text-gray-800 text-center">
              Ready to Challenge Your Brain? 🚀
            </h1>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 relative z-20">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value.toUpperCase());
                setError(''); // Clear error when user starts typing
              }}
              className="w-full bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500 rounded-lg shadow-sm transition-all duration-300"
            />
            {error && (
              <p className="text-sm text-red-500 animate-shake">
                {error}
              </p>
            )}
          </div>
          <Button 
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
            onClick={handleStartQuiz}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Start Quiz'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default InitialDisplay;

