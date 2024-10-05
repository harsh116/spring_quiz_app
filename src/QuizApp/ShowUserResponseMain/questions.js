const question1 = {
  question:
    "What is Java? What is Java? What is Java? What is Java? What is Java? What is Java? What is Java? What is Java? What is Java? What is Java? What is Java? What is Java? What is Java?",
  options: [
    "Java is object oriented language",
    " Java is not an object oriented language",
    "Java is annoying",
  ],
  correctOptionNumber: 2,

  technology: "Java",
};

const question2 = {
  question:
    "What is Java? What is Java? What is Java? What is Java? What is Java? What is Java? What is Java? What is Java? What is Java? What is Java? What is Java? What is Java? What is Java?",
  options: [
    "Java is object oriented language",
    " Java is not an object oriented language",
    "Java is annoying",
  ],
  correctOptionNumber: 2,

  technology: "Java",
};

const quiz1 = {
  id: "quiz101",
  name: "Quiz 1",
  questions: [question1, question2],
  selectedOptions: [2, 1],
  score: "1/2",
};

const quiz2 = {
  id: "quiz102",
  name: "Quiz 2",
  questions: [question1, question2],
  selectedOptions: [1, 1],
  score: "0/2",
};

const quiz3 = {
  id: "quiz103",
  name: "Quiz 3",
  questions: [question1, question2],
  selectedOptions: [3, 1],
  score: "0/2",
};

const quiz4 = {
  id: "quiz104",
  name: "Quiz 4",
  questions: [question1, question2],
  selectedOptions: [2, 2],
  score: "2/2",
};

const user1 = {
  id: "user101",
  name: "User 1",
  quizzes: { [quiz1.id]: quiz1, [quiz2.id]: quiz2 },
};

const user2 = {
  id: "user102",
  name: "User 2",
  quizzes: { [quiz3.id]: quiz3, [quiz4.id]: quiz4 },
};

// export const users = [user1, user2];
export const users = {
  [user1.id]: user1,
  [user2.id]: user2,
};
