import { useNavigate } from "@solidjs/router";
import { createResource } from "solid-js";

import { useWebsiteContext } from "~/contexts/WebsiteContext";
import { buildUrl } from "~/lib/env";
import { fetchSession } from "~/services/auth";

export const indexPath = "/";
export const indexUrl = () => buildUrl(indexPath);

export default function Home() {
  const navigate = useNavigate();

  const { selectedWebsite } = useWebsiteContext();

  const [session] = createResource(fetchSession);

  return (
    <main>
      <h1>Dashboard | {selectedWebsite()?.name}</h1>

      <p>
        {JSON.stringify(
          selectedWebsite(),
          (_, v) => (typeof v === "bigint" ? v.toString() : v),
          2
        )}
      </p>
    </main>
  );
}
