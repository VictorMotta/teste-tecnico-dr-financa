import * as dotenv from "dotenv";

const nodeEnv = process.env.NODE_ENV;

const envFile =
  nodeEnv === "test"
    ? ".env.test"
    : nodeEnv === "development"
    ? ".env.development"
    : ".env";

dotenv.config({ path: envFile });

import { defineConfig, env } from "prisma/config";

export default defineConfig({
  datasource: {
    url: env("DATABASE_URL"),
  },
});
