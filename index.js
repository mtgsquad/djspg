#!/usr/bin/env node

const sleep = require("./functions/sleep");

const { execSync } = require("child_process"),
  { existsSync, rmSync } = require("fs"),
  { resolve } = require("path"),
  quit = require("./functions/quit"),
  prompt = require("prompts"),
  execOpts = { encoding: "utf8", shell: true },
  exec = (command, opts) => execSync(command, { ...opts, ...execOpts }),
  chalk = require("chalk"),
  blurple = chalk.hex("#7289DA"),
  error = chalk.red,
  info = chalk.blue;

(async () => {
  console.log(blurple(`\nDJSPG v${require("./package.json").version}\n\n`));

  sleep(3000);

  const args = process.argv.slice(2);

  if (args.length === 0)
    return console.log(
      error("No bot directory provided, make sure the directory exists.")
    );

  if (existsSync(args[0]))
    (await prompt({
      type: "multiselect",
      name: "override",
      message: "Override Previous Directory?",
      choices: [
        { title: "Yes", value: true },
        { title: "No", value: false },
      ],
    }))
      ? rmSync(args[0], { recursive: true, force: true })
      : quit("");

  exec(`mkdir ${args[0]}`);
  if (args.length === 2) {
    console.log(info("Cloning Your Custom Repository..."));
    exec(`git clone ${args[1]} ${args[0]}`);
  }
  console.log(info("Cloning The Starter Repository..."));
  exec(
    `git clone https://github.com/mtgsquad/simple-discord-bot-project.git ${args[0]}`
  );
  console.log();
  exec(`cd ${args[0]}`);
  console.log(
    info(
      `Installing ${Object.keys(
        require(`./${args[0]}/package.json`).dependencies
      ).join(", ")}`
    )
  );
  exec(`npm install --prefix ${args[0]}`);
  require("./prompt")(args[0]);
})();
