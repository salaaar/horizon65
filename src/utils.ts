import * as crypto from "crypto";

/**
 * This function is responsible for create guid.
 * @returns 16 chars string created randomly.
 */
export function guid(): string {
  return (
    crypto.randomBytes(8).toString("hex") +
    crypto.randomBytes(8).toString("hex")
  );
}
