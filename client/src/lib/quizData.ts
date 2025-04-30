export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuestionResult {
  question: string;
  userAnswer: number;
  correctAnswer: number;
  isCorrect: boolean;
}

export const quizData: QuizQuestion[] = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswer: 0
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: 3
  },
  {
    question: "Which of these is not a programming language?",
    options: ["Python", "Java", "Cobra", "Photoshop"],
    correctAnswer: 3
  },
  {
    question: "Which famous scientist developed the theory of relativity?",
    options: ["Isaac Newton", "Nikola Tesla", "Albert Einstein", "Galileo Galilei"],
    correctAnswer: 2
  }
];
