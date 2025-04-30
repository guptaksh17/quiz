import { useState } from "react";
import { QuestionResult, quizData } from "@/lib/quizData";
import StartScreen from "./StartScreen";
import QuestionScreen from "./QuestionScreen";
import ResultsScreen from "./Results";

type QuizState = "start" | "question" | "results";

const QuizContainer = () => {
  const [quizState, setQuizState] = useState<QuizState>("start");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [questionResults, setQuestionResults] = useState<QuestionResult[]>([]);

  const startQuiz = () => {
    setQuizState("question");
    resetQuiz();
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setQuestionResults([]);
  };

  const handleOptionSelect = (optionIndex: number) => {
    if (!isAnswerSubmitted) {
      setSelectedAnswer(optionIndex);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setIsAnswerSubmitted(true);
    
    const currentQuestionData = quizData[currentQuestion];
    const isCorrect = selectedAnswer === currentQuestionData.correctAnswer;
    
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }
    
    const result: QuestionResult = {
      question: currentQuestionData.question,
      userAnswer: selectedAnswer,
      correctAnswer: currentQuestionData.correctAnswer,
      isCorrect
    };
    
    setQuestionResults(prev => [...prev, result]);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizState("results");
    }
  };

  const handleRestartQuiz = () => {
    setQuizState("question");
    resetQuiz();
  };

  const handleShareResults = () => {
    const percentage = Math.round((score / quizData.length) * 100);
    alert(`Quiz completed! You scored ${score}/${quizData.length} (${percentage}%)`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 animate-[scaleIn_0.3s_ease-in-out]">
      {quizState === "start" && (
        <StartScreen onStartQuiz={startQuiz} />
      )}
      
      {quizState === "question" && (
        <QuestionScreen
          currentQuestion={currentQuestion}
          totalQuestions={quizData.length}
          score={score}
          question={quizData[currentQuestion]}
          selectedAnswer={selectedAnswer}
          isAnswerSubmitted={isAnswerSubmitted}
          onOptionSelect={handleOptionSelect}
          onSubmitAnswer={handleSubmitAnswer}
          onNextQuestion={handleNextQuestion}
        />
      )}
      
      {quizState === "results" && (
        <ResultsScreen
          score={score}
          totalQuestions={quizData.length}
          questionResults={questionResults}
          onRestartQuiz={handleRestartQuiz}
          onShareResults={handleShareResults}
        />
      )}
    </div>
  );
};

export default QuizContainer;
