import type { APIEvent } from "@solidjs/start/server";

export async function GET(event: APIEvent) {
  const lines = ["User-agent: *", "Disallow: /"];

  return new Response(lines.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
