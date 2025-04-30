import { QuestionResult } from "@/lib/quizData";
import { Badge, Button } from "@/pages/ui-components";
import { Award, Check, CheckCircle2, Medal, Share2, Trophy, X, XCircle, RefreshCw } from "lucide-react";

// ResultsSummary component
interface ResultsSummaryProps {
  questionResults: QuestionResult[];
}

const ResultsSummary = ({ questionResults }: ResultsSummaryProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Question Summary</h3>
        <div className="ml-3 h-1 flex-grow bg-gradient-to-r from-blue-100 to-indigo-100 rounded"></div>
      </div>
      
      <div className="space-y-4">
        {questionResults.map((result, index) => {
          const userAnswer = questionResults[index].question 
            ? 
            questionResults[index].question.split('?')[0] === 'What is the capital of France'
              ? ['Paris', 'London', 'Berlin', 'Madrid'][result.userAnswer]
              : questionResults[index].question.split('?')[0] === 'Which planet is known as the Red Planet'
                ? ['Venus', 'Mars', 'Jupiter', 'Saturn'][result.userAnswer]
                : questionResults[index].question.split('?')[0] === 'What is the largest ocean on Earth'
                  ? ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'][result.userAnswer]
                  : questionResults[index].question.split('?')[0] === 'Which of these is not a programming language'
                    ? ['Python', 'Java', 'Cobra', 'Photoshop'][result.userAnswer]
                    : ['Isaac Newton', 'Nikola Tesla', 'Albert Einstein', 'Galileo Galilei'][result.userAnswer]
            : '';
            
          const correctAnswer = questionResults[index].question 
            ? 
            questionResults[index].question.split('?')[0] === 'What is the capital of France'
              ? ['Paris', 'London', 'Berlin', 'Madrid'][result.correctAnswer]
              : questionResults[index].question.split('?')[0] === 'Which planet is known as the Red Planet'
                ? ['Venus', 'Mars', 'Jupiter', 'Saturn'][result.correctAnswer]
                : questionResults[index].question.split('?')[0] === 'What is the largest ocean on Earth'
                  ? ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'][result.correctAnswer]
                  : questionResults[index].question.split('?')[0] === 'Which of these is not a programming language'
                    ? ['Python', 'Java', 'Cobra', 'Photoshop'][result.correctAnswer]
                    : ['Isaac Newton', 'Nikola Tesla', 'Albert Einstein', 'Galileo Galilei'][result.correctAnswer]
            : '';
            
          return (
            <div key={index} className="bg-white rounded-xl p-4 shadow">
              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  <Badge 
                    className={`h-7 w-7 rounded-full text-sm flex items-center justify-center p-0 ${
                      result.isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    }`}
                  >
                    {index + 1}
                  </Badge>
                </div>
                
                <div className="flex-grow">
                  <p className="font-medium text-gray-800 mb-2">{result.question}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1">
                      <span className="mr-2 text-sm text-gray-600">Your answer:</span>
                      <span className={`font-medium ${result.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                        {userAnswer}
                      </span>
                      {result.isCorrect ? (
                        <CheckCircle2 className="ml-1 h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="ml-1 h-4 w-4 text-red-600" />
                      )}
                    </div>
                    
                    {!result.isCorrect && (
                      <div className="flex items-center bg-green-50 rounded-lg px-3 py-1">
                        <span className="mr-2 text-sm text-gray-600">Correct answer:</span>
                        <span className="font-medium text-green-700">{correctAnswer}</span>
                        <CheckCircle2 className="ml-1 h-4 w-4 text-green-600" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Main ResultsScreen component
interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  questionResults: QuestionResult[];
  onRestartQuiz: () => void;
  onShareResults: () => void;
}

const ResultsScreen = ({
  score,
  totalQuestions,
  questionResults,
  onRestartQuiz,
  onShareResults
}: ResultsScreenProps) => {
  const scorePercentage = (score / totalQuestions) * 100;
  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (scorePercentage / 100) * circumference;
  
  let message = '';
  if (scorePercentage === 100) {
    message = 'Perfect! You got all questions correct.';
  } else if (scorePercentage >= 80) {
    message = 'Great job! You scored very well.';
  } else if (scorePercentage >= 60) {
    message = 'Good effort! You passed the quiz.';
  } else if (scorePercentage >= 40) {
    message = 'Not bad, but you can do better.';
  } else {
    message = 'Keep practicing to improve your score.';
  }

  return (
    <div className="text-center py-8 animate-[fadeIn_0.6s_ease-in-out]">
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div className="mb-10">
          {/* Trophy icon for perfect score or medal for good score */}
          {scorePercentage >= 80 ? (
            <div className="w-28 h-28 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute inset-4 bg-yellow-300 rounded-full opacity-30"></div>
              <div className="relative w-full h-full flex items-center justify-center">
                {scorePercentage === 100 ? (
                  <Trophy className="h-16 w-16 text-yellow-500" />
                ) : (
                  <Medal className="h-16 w-16 text-yellow-500" />
                )}
              </div>
            </div>
          ) : (
            <div className="relative w-40 h-40 mx-auto mb-6">
              <svg className="h-full w-full" viewBox="0 0 100 100">
                <circle 
                  className="text-gray-100" 
                  strokeWidth="10" 
                  stroke="currentColor" 
                  fill="transparent" 
                  r="40" 
                  cx="50" 
                  cy="50"
                />
                <circle 
                  className={`
                    ${scorePercentage >= 60 ? 'text-green-500' : 
                      scorePercentage >= 40 ? 'text-yellow-500' : 'text-red-500'}
                  `}
                  strokeWidth="10" 
                  stroke="currentColor" 
                  fill="transparent" 
                  r="40" 
                  cx="50" 
                  cy="50"
                  strokeLinecap="round"
                  strokeDasharray={`${circumference}, ${circumference}`}
                  strokeDashoffset={offset}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <div>
                  <span className="block text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-gray-800 to-gray-600">
                    {scorePercentage}%
                  </span>
                  <span className="text-sm text-gray-500">Score</span>
                </div>
              </div>
            </div>
          )}

          <h2 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Quiz Completed!
          </h2>
          <div className="flex justify-center items-center mb-2">
            <Badge className="bg-blue-100 text-blue-800 mr-2">{score} correct</Badge>
            <Badge className="bg-gray-100 text-gray-800">{totalQuestions - score} incorrect</Badge>
          </div>
          <p className="text-gray-600 mb-8 text-lg">
            {message}
          </p>
        </div>
        
        <ResultsSummary questionResults={questionResults} />
      </div>
      
      <div className="flex justify-center space-x-4">
        <Button 
          onClick={onRestartQuiz}
          className="px-6 py-3 text-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center"
        >
          <RefreshCw className="mr-2 h-5 w-5" />
          Restart Quiz
        </Button>
        <Button 
          onClick={onShareResults}
          variant="outline" 
          className="px-6 py-3 text-lg bg-white text-gray-700 font-medium rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center"
        >
          <Share2 className="mr-2 h-5 w-5 text-gray-600" />
          Share Results
        </Button>
      </div>
    </div>
  );
};

export default ResultsScreen;