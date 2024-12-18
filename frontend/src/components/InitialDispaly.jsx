import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain, Loader2 } from "lucide-react";
import {
  checkQuizStatus
} from "../services/Question";

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">
              <h2 className="text-2xl font-bold">Select Quiz Length</h2>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[10, 20, 30, 50].map((num) => (
              <Button
                key={num}
                className="w-full"
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center flex flex-col items-center gap-4">
            <Brain className="w-12 h-12 text-blue-500" />
            <h1 className="text-2xl font-bold">Ready to Challenge Your Brain? 🚀</h1>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value.toUpperCase())}
              className="w-full"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <Button
            className="w-full"
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