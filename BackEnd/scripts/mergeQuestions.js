const fs = require("fs");
const path = require("path");

const allQuestions = [];

for (let i = 1; i <= 12; i++) {
  const filePath = path.join(
    __dirname,
    `../data/batches/batch${i}.json`
  );

  const questions = JSON.parse(
    fs.readFileSync(filePath, "utf-8")
  );

  allQuestions.push(...questions);
}

fs.writeFileSync(
  path.join(__dirname, "../data/aptitudeQuestions.json"),
  JSON.stringify(allQuestions, null, 2)
);

console.log(`✅ ${allQuestions.length} questions merged successfully!`);