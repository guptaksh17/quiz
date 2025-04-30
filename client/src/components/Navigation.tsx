import { Badge, Button } from "@/pages/ui-components";
import { Award, Circle } from "lucide-react";

// ProgressBar component
interface ProgressBarProps {
  current: number;
  total: number;
  score: number;
}

const ProgressBar = ({ current, total, score }: ProgressBarProps) => {
  const progressWidth = `${(current / total) * 100}%`;
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3 bg-white rounded-xl shadow-md p-4">
        <div className="flex items-center">
          <div className="bg-blue-100 p-2 rounded-lg mr-3">
            <Circle className="h-5 w-5 text-blue-600" fill="rgba(59, 130, 246, 0.5)" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Progress</span>
            <p className="font-bold text-gray-800">
              Question {current} of {total}
            </p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="bg-indigo-100 p-2 rounded-lg mr-3">
            <Award className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Current Score</span>
            <p className="font-bold text-gray-800">
              {score}/{current-1} <span className="text-xs text-gray-500">points</span>
            </p>
          </div>
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
        <div 
          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-300 shadow-sm" 
          style={{ width: progressWidth }}
        />
      </div>
      
      <div className="flex justify-between px-1 mt-2">
        {Array.from({ length: total }).map((_, idx) => (
          <div 
            key={idx} 
            className={`relative ${idx < current ? 'text-indigo-600 font-medium' : 'text-gray-400'}`}
          >
            {idx < current - 1 && (
              <div className="absolute -top-1 -right-1">
                <Badge 
                  variant={idx < score ? "default" : "secondary"}
                  className={`h-4 w-4 rounded-full text-[10px] flex items-center justify-center p-0 ${
                    idx < score ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  {idx < score ? "✓" : "×"}
                </Badge>
              </div>
            )}
            {idx + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

// NavigationButtons component
interface NavigationButtonsProps {
  isAnswerSelected: boolean;
  isLastQuestion: boolean;
  isAnswerSubmitted: boolean;
  onSubmitAnswer: () => void;
  onNextQuestion: () => void;
}

const NavigationButtons = ({
  isAnswerSelected,
  isLastQuestion,
  isAnswerSubmitted,
  onSubmitAnswer,
  onNextQuestion
}: NavigationButtonsProps) => {
  return (
    <div className="flex justify-center">
      {!isAnswerSubmitted ? (
        <Button
          onClick={onSubmitAnswer}
          disabled={!isAnswerSelected}
          className={`
            relative overflow-hidden px-8 py-4 text-lg shadow-lg rounded-xl font-medium 
            transition-all duration-300 transform
            ${isAnswerSelected ? 
              'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:-translate-y-1 hover:shadow-xl' : 
              'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          {isAnswerSelected && (
            <span className="absolute inset-0 flex justify-center overflow-hidden opacity-10">
              <svg className="h-full" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                <circle cx="25" cy="25" r="20" fill="white" />
              </svg>
            </span>
          )}
          Submit Answer
        </Button>
      ) : (
        <Button
          onClick={onNextQuestion}
          className={`
            relative overflow-hidden px-8 py-4 text-lg shadow-lg rounded-xl font-medium text-white
            bg-gradient-to-r from-green-500 to-emerald-600
            transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl
          `}
        >
          <span className="absolute inset-0 flex justify-center overflow-hidden opacity-10">
            <svg className="h-full" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
              <circle cx="25" cy="25" r="20" fill="white" />
            </svg>
          </span>
          {isLastQuestion ? "See Your Results" : "Next Question"}
        </Button>
      )}
    </div>
  );
};

export { ProgressBar, NavigationButtons };