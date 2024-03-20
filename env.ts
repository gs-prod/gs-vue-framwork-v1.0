const path = require("path");

const load = () => {
  let envFile = "";
  switch (process.env.NODE_ENV) {
    case "development":
      envFile = ".env.dev";
      break;
    case "staging":
      envFile = ".env.stg";
      break;
    case "production":
      envFile = ".env.production";
      break;
    default:
      envFile = ".env";
  }

  console.log(
    "Load env in [" + envFile + "] with [" + process.env.NODE_ENV + "] MODE...",
  );

  return require("dotenv").config({
    path: path.resolve(process.cwd(), envFile),
  });
};

module.exports = load;
