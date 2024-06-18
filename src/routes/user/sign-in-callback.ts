import type { APIEvent } from "@solidjs/start/server";

import { signInCallback } from "~/services/auth";

export async function GET(event: APIEvent) {
  return signInCallback(event);
}
