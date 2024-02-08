import { createServer } from "nice-grpc";
import { dbService } from "./db/jobs";
import { getQueueService } from "./queue/service";
import { db } from "./db/knexConn";
import {
  DBServiceDefinition,
  QueueServiceDefinition,
} from "@livestack/vault-interface";

async function main() {
  const server = createServer();
  server.add(DBServiceDefinition, dbService(db));
  server.add(QueueServiceDefinition, getQueueService());

  const HOST = process.env.HOST || "0.0.0.0";
  const PORT = Number(process.env.PORT) || 50051;
  const address = `${HOST}:${PORT}`;

  await server.listen(address);
  console.info(`🌌🔒 Vault dev server started. Listening on ${address}.`);
}

main();