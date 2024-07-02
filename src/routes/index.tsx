import { useNavigate } from "@solidjs/router";
import _ from "lodash";
import { For, createResource, onMount } from "solid-js";
import { Font } from "~/components/content/Font";
import { Section } from "~/components/layout/Section";
import { SectionTitle } from "~/components/layout/SectionTitle";

import { useWebsiteContext } from "~/contexts/WebsiteContext";
import { buildUrl } from "~/lib/env";
import { TKEYS } from "~/locales";
import { fetchSession } from "~/services/auth";

export const indexPath = () => "/";
export const indexUrl = () => buildUrl(indexPath());

export default function Home() {
  const navigate = useNavigate();

  const { selectedWebsite, websites } = useWebsiteContext();

  const [session] = createResource(fetchSession);

  return (
    <>
      <Section>
        <SectionTitle title="Dashboard" />

        <Font type="title" key={TKEYS.websites.labels.domains} />
        <For each={selectedWebsite()?.domains}>
          {(domain) => <p>{domain.domain}</p>}
        </For>

        <Font type="title" key={TKEYS.websites.labels.pages} />
        <For each={selectedWebsite()?.pages}>
          {(page) => (
            <p>
              {page.title} {page.path}
            </p>
          )}
        </For>
      </Section>
    </>
  );
}
