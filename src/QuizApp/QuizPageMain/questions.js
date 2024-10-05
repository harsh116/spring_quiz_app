const question1 = {
  question: "What is Java?",
  options: [
    "Java is island",
    "Java is programmingsdfgufvdshfvsdhfvsf language",
  ],
};

const question2 = {
  question: "What is Java?",
  options: [
    "Java is island",
    "Java is programmingsdfgufvdshfvsdhfvsf language",
  ],
};

const question3 = {
  question: "What is Python?",
  options: [
    "Python is snake",
    "Python is programmingsdfgufvdshfvsdhfvsf language",
  ],
};

const question4 = {
  question: "What is Python?",
  options: [
    "Python is snake",
    "Python is programmingsdfgufvdshfvsdhfvsf language",
  ],
};

const quiz1 = {
  technology: "Java",
  questions: [question1],
};

const quiz2 = {
  technology: "Java",
  questions: [question1, question2],
};

const quiz3 = {
  technology: "Python",
  questions: [question3],
};

const quiz4 = {
  technology: "Python",
  questions: [question3, question4],
};

export const technologies = {
  ["Java"]: { ["Quiz1"]: quiz1, ["Quiz2"]: quiz2 },
  ["Python"]: { ["Quiz3"]: quiz3, ["Quiz4"]: quiz4 },
};
