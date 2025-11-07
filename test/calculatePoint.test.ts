import { describe, test, expect, beforeEach } from "vitest";
import type { Quiz, Question } from "@/api/quizzes";

// Mock enum
enum AnswerResult {
  CORRECT = "CORRECT",
  WRONG = "WRONG",
}

// Mock Attempt interface
interface Attempt {
  answers: {
    question: string;
    result: AnswerResult;
    accuracyFactor: number;
  }[];
}

// Global quiz variable (like in your function)
let quiz: Quiz;

// Function under test
const calculatePoint = (attempt: Attempt): number => {
  let point = 0;
  const questionIds = quiz?.questions?.map((q) => q.questionId);
  attempt.answers.forEach((answer) => {
    if (
      questionIds!.includes(answer.question) &&
      answer.result === AnswerResult.CORRECT
    ) {
      const question = quiz.questions?.find(
        (q) => q.questionId === answer.question
      );
      if (question) {
        point += (question.point * answer.accuracyFactor) / 100;
      }
    }
  });
  return point;
};

// Mock quiz before each test
beforeEach(() => {
  quiz = {
    quizId: "quiz1",
    title: "Mock Quiz",
    description: "A test quiz",
    totalQuestion: 3,
    totalAttempt: 0,
    visibility: "PUBLIC",
    createBy: {
      id: 1,
      profileImageUrl: "",
      username: "tester",
      email: "test@example.com",
    },
    createAt: new Date(),
    modifiedBy: {
      id: 1,
      profileImageUrl: "",
      username: "tester",
      email: "test@example.com",
    },
    modifiedAt: new Date(),
    questions: [
      {
        questionId: "q1",
        content: "Question 1",
        questionType: "SINGLE_CHOICE",
        fact: "Fact 1",
        point: 10,
        timeLimit: 30,
        createBy: 1,
        createAt: new Date(),
        modifiedBy: 1,
        modifiedAt: new Date(),
        choices: [],
      },
      {
        questionId: "q2",
        content: "Question 2",
        questionType: "SINGLE_CHOICE",
        fact: "Fact 2",
        point: 20,
        timeLimit: 30,
        createBy: 1,
        createAt: new Date(),
        modifiedBy: 1,
        modifiedAt: new Date(),
        choices: [],
      },
      {
        questionId: "q3",
        content: "Question 3",
        questionType: "SINGLE_CHOICE",
        fact: "Fact 3",
        point: 30,
        timeLimit: 30,
        createBy: 1,
        createAt: new Date(),
        modifiedBy: 1,
        modifiedAt: new Date(),
        choices: [],
      },
    ],
  };
});

describe("calculatePoint", () => {
  test("returns total points for correct answers", () => {
    const attempt: Attempt = {
      answers: [
        { question: "q1", result: AnswerResult.CORRECT, accuracyFactor: 100 },
        { question: "q2", result: AnswerResult.CORRECT, accuracyFactor: 50 },
        { question: "q3", result: AnswerResult.WRONG, accuracyFactor: 100 },
      ],
    };

    const point = calculatePoint(attempt);
    expect(point).toBe(20); // 10 + (20 * 0.5)
  });

  test("returns 0 if all answers are wrong", () => {
    const attempt: Attempt = {
      answers: [
        { question: "q1", result: AnswerResult.WRONG, accuracyFactor: 100 },
        { question: "q2", result: AnswerResult.WRONG, accuracyFactor: 100 },
      ],
    };

    const point = calculatePoint(attempt);
    expect(point).toBe(0);
  });

  test("ignores answers not in quiz", () => {
    const attempt: Attempt = {
      answers: [
        { question: "q999", result: AnswerResult.CORRECT, accuracyFactor: 100 },
      ],
    };

    const point = calculatePoint(attempt);
    expect(point).toBe(0);
  });
});
