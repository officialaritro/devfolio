import fs from "fs";
import os from "os";
import path from "path";

import { serverEnv } from "../env/server";

export function initGCPAuth() {
  // Already set
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS)
    return;

  const base64Key = serverEnv().GCP_KEY_BASE64;
  if (!base64Key) {
    throw new Error("Missing GCP_KEY_BASE64 env variable");
  }

  const keyJson = Buffer.from(base64Key, "base64").toString("utf-8");

  // Local dev: use project root path, not /tmp
  const filePath =
    process.env.NODE_ENV === "development"
      ? path.join(process.cwd(), "gcp-key.json")
      : path.join(os.tmpdir(), "gcp-key.json");

  fs.writeFileSync(filePath, keyJson, { encoding: "utf8" });

  process.env.GOOGLE_APPLICATION_CREDENTIALS = filePath;

  // Cleanup the temporary key file on process exit
  process.on("exit", () => {
    console.log("Cleaning up temporary GCP key file...");
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Delete the file
      console.log("Temporary GCP key file removed.");
    }
  });

  // Handle termination signals (like Ctrl+C)
  process.on("SIGINT", () => {
    console.log("Cleaning up temporary GCP key file...");
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Delete the file
      console.log("Temporary GCP key file removed.");
    }
    process.exit();
  });
}
