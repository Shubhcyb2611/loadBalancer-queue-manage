import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
export const { LOADBALANCER_PORT, REST_PORT, GRAPHQL_PORT, GRPC_PORT } = process.env;
