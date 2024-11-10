import { For } from "solid-js";

import { Font } from "~/components/content/Font";
import { Section } from "~/components/layout/Section";
import { SectionTitle } from "~/components/layout/SectionTitle";
import { useWebsiteContext } from "~/contexts/WebsiteContext";
import { Page } from "~/layout/Page";
import { buildUrl } from "~/lib/env";
import { TKEYS } from "~/locales";

export const indexPath = () => "/";
export const indexUrl = () => buildUrl(indexPath());

export default function Home() {
  const { selectedWebsite } = useWebsiteContext();

  return (
    <Page>
      <Section>
        <SectionTitle title="Dashboard" />

        <Font type="title" key={TKEYS.websites.labels.domains} />
        <For each={selectedWebsite()?.domains}>
          {(domain) => (
            <div>
              <a
                class="underline"
                target="__blank"
                href={"https://" + domain.domain}
              >
                {domain.domain}
              </a>
            </div>
          )}
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
    </Page>
  );
}
