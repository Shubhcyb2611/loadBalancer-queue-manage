import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const {
  LOG_PATH,
  LOG_LEVEL,
  LOADBALANCER_PORT,
  REST_PORT,
  GRAPHQL_PORT,
  GRPC_PORT,
} = process.env;
