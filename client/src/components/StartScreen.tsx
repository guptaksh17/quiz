import { Button } from "@/pages/ui-components";
import { BrainCircuit, CheckCircle2, Trophy } from "lucide-react";

interface StartScreenProps {
  onStartQuiz: () => void;
}

const StartScreen = ({ onStartQuiz }: StartScreenProps) => {
  return (
    <div className="text-center py-8 px-4 bg-white rounded-2xl shadow-lg">
      <div className="mb-8">
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <BrainCircuit className="h-48 w-48 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-bold mb-4 relative bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
            Welcome to the Quiz!
          </h2>
          <p className="text-gray-600 mb-6 text-lg relative">
            Test your knowledge and challenge yourself with 5 questions!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <CheckCircle2 className="h-8 w-8 mx-auto text-blue-500 mb-2" />
            <p className="text-gray-700 font-medium">Answer multiple-choice questions</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
            <Trophy className="h-8 w-8 mx-auto text-indigo-500 mb-2" />
            <p className="text-gray-700 font-medium">Get immediate feedback</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <BrainCircuit className="h-8 w-8 mx-auto text-purple-500 mb-2" />
            <p className="text-gray-700 font-medium">See your final score</p>
          </div>
        </div>
      </div>
      <Button 
        onClick={onStartQuiz}
        className="px-8 py-4 text-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
      >
        Start Quiz
      </Button>
    </div>
  );
};

export default StartScreen;
