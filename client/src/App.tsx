import { Toaster, TooltipProvider } from "@/pages/ui-components";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import QuizContainer from "./components/QuizContainer";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen font-sans text-gray-800 bg-gradient-to-b from-blue-50 to-indigo-100">
          <div className="container mx-auto px-4 py-12 max-w-2xl">
            <header className="text-center mb-10">
              <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Interactive Quiz
              </h1>
              <p className="text-gray-600 text-lg">Test your knowledge and challenge yourself!</p>
            </header>
            <QuizContainer />
          </div>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
