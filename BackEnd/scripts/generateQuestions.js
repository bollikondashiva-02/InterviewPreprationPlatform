const fs = require("fs");

const questions = [];

function addQuestion(
  category,
  difficulty,
  question,
  options,
  answer,
  explanation
) {
  questions.push({
    category,
    difficulty,
    question,
    options,
    answer,
    explanation,
  });
}
for (let i = 1; i <= 20; i++) {
  addQuestion(
    "Quantitative",
    "Easy",
    `What is the square of ${i}?`,
    [
      `${i * i}`,
      `${i * i + 1}`,
      `${i * i - 1}`,
      `${i * i + 2}`
    ],
    `${i * i}`,
    `${i} × ${i} = ${i * i}`
  );
}
for (let i = 1; i <= 20; i++) {
  const num = i * 100;

  addQuestion(
    "Quantitative",
    "Easy",
    `What is 25% of ${num}?`,
    [
      `${num / 8}`,
      `${num / 4}`,
      `${num / 2}`,
      `${num}`
    ],
    `${num / 4}`,
    `25% of ${num} = ${num / 4}`
  );
}
for (let i = 1; i <= 20; i++) {
  const cp = i * 100;
  const sp = cp + 50;

  addQuestion(
    "Quantitative",
    "Medium",
    `A product is bought for ₹${cp} and sold for ₹${sp}. Find the profit.`,
    [
      "₹20",
      "₹30",
      "₹40",
      "₹50"
    ],
    "₹50",
    "Profit = Selling Price - Cost Price = ₹50"
  );
}

for (let i = 1; i <= 20; i++) {
  const p = i * 1000;

  addQuestion(
    "Quantitative",
    "Medium",
    `Find the simple interest on ₹${p} at 10% per annum for 1 year.`,
    [
      `₹${p / 20}`,
      `₹${p / 10}`,
      `₹${p / 5}`,
      `₹${p / 2}`
    ],
    `₹${p / 10}`,
    `SI = (P × R × T) / 100 = ₹${p / 10}`
  );
}
for (let i = 1; i <= 20; i++) {
  const days = i + 2;

  addQuestion(
    "Quantitative",
    "Hard",
    `If A can complete a work in ${days} days, what part of the work can he complete in one day?`,
    [
      `1/${days - 1}`,
      `1/${days}`,
      `1/${days + 1}`,
      `1/${days + 2}`
    ],
    `1/${days}`,
    `One day's work = 1/${days}`
  );
}
for (let i = 1; i <= 20; i++) {
  const first = i;
  const second = i + 2;
  const third = i + 4;
  const fourth = i + 6;
  const answer = i + 8;

  addQuestion(
    "Logical",
    "Easy",
    `Find the next number in the series: ${first}, ${second}, ${third}, ${fourth}, ?`,
    [
      `${answer}`,
      `${answer + 1}`,
      `${answer + 2}`,
      `${answer - 1}`
    ],
    `${answer}`,
    "The pattern increases by 2."
  );
}
for (let i = 1; i <= 20; i++) {
  addQuestion(
    "Logical",
    "Easy",
    `If CAT is coded as DBU, then DOG is coded as ?`,
    [
      "EPH",
      "EOH",
      "FPH",
      "DPH"
    ],
    "EPH",
    "Each letter is shifted by one position: D→E, O→P, G→H."
  );
}
for (let i = 1; i <= 20; i++) {
  addQuestion(
    "Logical",
    "Medium",
    `Pointing to a man, Ravi said, "He is the son of my grandfather's only son." How is the man related to Ravi?`,
    [
      "Brother",
      "Father",
      "Uncle",
      "Cousin"
    ],
    "Brother",
    "Grandfather's only son is Ravi's father. Father's son is Ravi's brother."
  );
}
for (let i = 1; i <= 20; i++) {
  addQuestion(
    "Logical",
    "Medium",
    `A person walks 10 m towards North and then turns right and walks 10 m. In which direction is he now moving?`,
    [
      "East",
      "West",
      "North",
      "South"
    ],
    "East",
    "When a person turns right from North, he faces East."
  );
}
for (let i = 1; i <= 20; i++) {
  addQuestion(
    "Logical",
    "Easy",
    `Find the odd one out: Apple, Mango, Banana, Carrot`,
    [
      "Apple",
      "Mango",
      "Banana",
      "Carrot"
    ],
    "Carrot",
    "Carrot is a vegetable while the others are fruits."
  );
}
for (let i = 1; i <= 20; i++) {
  addQuestion(
    "Verbal",
    "Easy",
    `Choose the synonym of "Happy".`,
    [
      "Sad",
      "Joyful",
      "Angry",
      "Tired"
    ],
    "Joyful",
    "Happy and Joyful have similar meanings."
  );
}
for (let i = 1; i <= 20; i++) {
  addQuestion(
    "Verbal",
    "Easy",
    `Choose the antonym of "Increase".`,
    [
      "Grow",
      "Rise",
      "Decrease",
      "Expand"
    ],
    "Decrease",
    "Decrease is the opposite of Increase."
  );
}
for (let i = 1; i <= 20; i++) {
  addQuestion(
    "Verbal",
    "Medium",
    `She _____ to school every day.`,
    [
      "go",
      "goes",
      "gone",
      "going"
    ],
    "goes",
    "The subject 'She' takes 'goes'."
  );
}
for (let i = 1; i <= 20; i++) {
  addQuestion(
    "Verbal",
    "Medium",
    `Identify the incorrect part: "He do not play cricket."`,
    [
      "He",
      "do not",
      "play",
      "cricket"
    ],
    "do not",
    "The correct sentence is 'He does not play cricket.'"
  );
}
for (let i = 1; i <= 20; i++) {
  addQuestion(
    "Verbal",
    "Hard",
    `Passage: The sun rises in the east. Question: Where does the sun rise?`,
    [
      "North",
      "South",
      "East",
      "West"
    ],
    "East",
    "According to the passage, the sun rises in the east."
  );
}
fs.writeFileSync(
  "./data/aptitudeQuestions.json",
  JSON.stringify(questions, null, 2)
);

console.log("Questions Generated");