import { QuizQuestion } from "@/lib/quizData";
import { cn } from "@/lib/utils";
import { Check, CheckCircle2, X, XCircle } from "lucide-react";

// FeedbackMessage component
interface FeedbackMessageProps {
  isCorrect: boolean;
  correctAnswerText: string;
}

const FeedbackMessage = ({ isCorrect, correctAnswerText }: FeedbackMessageProps) => {
  return (
    <div className="mb-6 animate-[fadeIn_0.3s_ease-in-out]">
      {isCorrect ? (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-5 shadow-md">
          <div className="flex items-center">
            <CheckCircle2 className="h-6 w-6 mr-3 text-green-600" />
            <div>
              <p className="font-bold text-green-800">Correct!</p>
              <p className="text-green-700">Great job! You got this one right.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-5 shadow-md">
          <div className="flex items-center">
            <XCircle className="h-6 w-6 mr-3 text-red-600" />
            <div>
              <p className="font-bold text-red-800">Incorrect</p>
              <p className="text-red-700">The correct answer is <span className="font-medium">{correctAnswerText}</span>.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// AnswerOptions component
interface AnswerOptionsProps {
  options: string[];
  selectedAnswer: number | null;
  isAnswerSubmitted: boolean;
  correctAnswer: number;
  onOptionSelect: (optionIndex: number) => void;
}

const AnswerOptions = ({
  options,
  selectedAnswer,
  isAnswerSubmitted,
  correctAnswer,
  onOptionSelect
}: AnswerOptionsProps) => {
  return (
    <div className="space-y-4 mb-8">
      {options.map((option, index) => {
        const isSelected = selectedAnswer === index;
        const isCorrect = index === correctAnswer;
        const isSelectedAndCorrect = isAnswerSubmitted && isSelected && isCorrect;
        const isSelectedAndIncorrect = isAnswerSubmitted && isSelected && !isCorrect;
        const isCorrectAnswer = isAnswerSubmitted && isCorrect;
        
        return (
          <button
            key={index}
            onClick={() => onOptionSelect(index)}
            disabled={isAnswerSubmitted}
            className={cn(
              "w-full text-left p-5 border rounded-xl transition-all duration-300 flex items-center",
              "hover:shadow-md hover:-translate-y-0.5 relative overflow-hidden",
              !isAnswerSubmitted && "border-gray-200 bg-white shadow-sm",
              isSelected && !isAnswerSubmitted && "border-blue-300 bg-blue-50 shadow",
              isAnswerSubmitted && "cursor-default",
              isSelectedAndCorrect && "bg-green-50 border-green-300 shadow",
              isSelectedAndIncorrect && "bg-red-50 border-red-300 shadow",
              isCorrectAnswer && !isSelected && "bg-green-50 border-green-300 shadow"
            )}
          >
            {/* Option indicator */}
            <span className={cn(
              "h-7 w-7 rounded-full flex-shrink-0 mr-4 flex items-center justify-center text-sm font-semibold",
              !isAnswerSubmitted && !isSelected && "bg-gray-100 text-gray-700",
              isSelected && !isAnswerSubmitted && "bg-blue-500 text-white",
              isSelectedAndCorrect && "bg-green-500 text-white",
              isSelectedAndIncorrect && "bg-red-500 text-white",
              isCorrectAnswer && !isSelected && "bg-green-500 text-white"
            )}>
              {String.fromCharCode(65 + index)}
            </span>
            
            {/* Option text */}
            <span className="font-medium">{option}</span>
            
            {/* Correct/incorrect indicators */}
            {isAnswerSubmitted && (
              <span className="absolute right-4">
                {isCorrect && (
                  <CheckCircle2 className={cn(
                    "h-5 w-5",
                    isSelected ? "text-green-600" : "text-green-500"
                  )} />
                )}
                {isSelected && !isCorrect && (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

// Main QuestionCard component
interface QuestionCardProps {
  question: QuizQuestion;
  selectedAnswer: number | null;
  isAnswerSubmitted: boolean;
  onOptionSelect: (optionIndex: number) => void;
}

const QuestionCard = ({
  question,
  selectedAnswer,
  isAnswerSubmitted,
  onOptionSelect
}: QuestionCardProps) => {
  return (
    <div className="mb-6 animate-[fadeIn_0.5s_ease-in-out]">
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">{question.question}</h2>
        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded mb-6"></div>
        
        <AnswerOptions
          options={question.options}
          selectedAnswer={selectedAnswer}
          isAnswerSubmitted={isAnswerSubmitted}
          correctAnswer={question.correctAnswer}
          onOptionSelect={onOptionSelect}
        />
      </div>
      
      {isAnswerSubmitted && (
        <FeedbackMessage
          isCorrect={selectedAnswer === question.correctAnswer}
          correctAnswerText={question.options[question.correctAnswer]}
        />
      )}
    </div>
  );
};

export default QuestionCard;