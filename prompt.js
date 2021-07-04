const prompts = require("prompts");
const { questions } = require("./config.json");
const fs = require("fs");
module.exports = async (arg0) => {
  fs.writeFileSync(
    `${process.cwd()}/${arg0}/config.json`,
    JSON.stringify(await prompts(questions))
  );
};
