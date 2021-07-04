#!/usr/bin/env node
const { exec } = require("child_process");
const { questions } = require("./config.json");
const { sleep } = require("./functions/sleep");
const fs = require("fs");
const prompts = require("prompts");
console.log("DJSPG v1.0");

const args = process.argv.slice(2);

if (args.length === 0)
  return console.log(
    "No bot directory provided, make sure the directory does not exist."
  );

if (args[0]) {
  exec(`mkdir ${args[0]}`);
  exec(
    `git clone https://github.com/mtgsquad/simple-discord-bot-project.git ${args[0]}`
  );
  exec(`cd ${args[0]}`);
  require("./prompt")(args[0]);
}
