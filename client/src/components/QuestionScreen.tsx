import { QuizQuestion } from "@/lib/quizData";
import { ProgressBar, NavigationButtons } from "./Navigation";
import QuestionCard from "./Question";

interface QuestionScreenProps {
  currentQuestion: number;
  totalQuestions: number;
  score: number;
  question: QuizQuestion;
  selectedAnswer: number | null;
  isAnswerSubmitted: boolean;
  onOptionSelect: (optionIndex: number) => void;
  onSubmitAnswer: () => void;
  onNextQuestion: () => void;
}

const QuestionScreen = ({
  currentQuestion,
  totalQuestions,
  score,
  question,
  selectedAnswer,
  isAnswerSubmitted,
  onOptionSelect,
  onSubmitAnswer,
  onNextQuestion
}: QuestionScreenProps) => {
  const isLastQuestion = currentQuestion === totalQuestions - 1;

  return (
    <div className="animate-[fadeIn_0.5s_ease-in-out]">
      <ProgressBar
        current={currentQuestion + 1}
        total={totalQuestions}
        score={score}
      />
      
      <QuestionCard
        question={question}
        selectedAnswer={selectedAnswer}
        isAnswerSubmitted={isAnswerSubmitted}
        onOptionSelect={onOptionSelect}
      />
      
      <NavigationButtons
        isAnswerSelected={selectedAnswer !== null}
        isLastQuestion={isLastQuestion}
        isAnswerSubmitted={isAnswerSubmitted}
        onSubmitAnswer={onSubmitAnswer}
        onNextQuestion={onNextQuestion}
      />
    </div>
  );
};

export default QuestionScreen;
