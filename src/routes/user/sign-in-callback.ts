import type { APIEvent } from "@solidjs/start/server";

import { signInCallback } from "~/services/auth";
import { indexUrl } from "..";

export async function GET(event: APIEvent) {
  const requestUrl = new URL(event.request.url);

  const error = requestUrl.searchParams.get("error");

  if (error === "interaction_required") {
    return new Response(null, {
      status: 302,
      headers: {
        Location: indexUrl().toString(),
      },
    });
  }

  return signInCallback(event);
}
