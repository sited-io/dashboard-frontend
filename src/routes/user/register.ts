import type { APIEvent } from "@solidjs/start/server";
import { indexUrl } from "..";
import { signIn } from "~/services/auth";

export async function GET(event: APIEvent) {
  const clientId = import.meta.env.VITE_AUTH_OAUTH_CLIENT_ID;
  const redirectTo = indexUrl().toString();
  const url = await signIn(clientId, redirectTo, "create");

  if (!url) {
    return new Response();
  }

  return new Response(null, {
    headers: {
      Location: url.toString(),
    },
    status: 302,
  });
}
