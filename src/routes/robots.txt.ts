export async function GET() {
  const lines = ["User-agent: *", "Disallow: /"];

  return new Response(lines.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
