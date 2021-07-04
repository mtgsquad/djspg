#!/usr/bin/env node

const sleep = require("./functions/sleep");

const { execSync } = require("child_process"),
  { existsSync, rmSync } = require("fs"),
  quit = require("./functions/quit"),
  prompt = require("prompts"),
  execOpts = { encoding: "utf8", shell: true, cwd: process.cwd() },
  exec = (command, opts) => execSync(command, { ...execOpts, ...opts }),
  chalk = require("chalk"),
  blurple = chalk.hex("#7289DA"),
  error = chalk.red,
  info = chalk.blue;

(async () => {
  console.log(
    blurple(`\nDJSPG v${require(`${__dirname}/package.json`).version}\n\n`)
  );

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
  console.log(info("Cloning The Starter Repository..."));
  exec(
    `git clone https://github.com/mtgsquad/simple-discord-bot-project.git ${args[0]}`
  );
  console.log();

  console.log(
    info(
      `Installing ${Object.keys(
        require(`${process.cwd()}/${args[0]}/package.json`).dependencies
      ).join(", ")}`
    )
  );
  exec("npm install", { cwd: `${process.cwd()}/${args[0]}` });
  require("./prompt")(args[0]);
})();
