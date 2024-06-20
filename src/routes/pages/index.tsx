import { For, Suspense, createResource } from "solid-js";

import { MdList } from "~/components/content/MdList";
import { MdListItem } from "~/components/content/MdListItem";
import { Section } from "~/components/layout/Section";
import { useWebsiteContext } from "~/contexts/WebsiteContext";
import { buildUrl } from "~/lib/env";
import { pageService } from "~/services/website";
import styles from "./index.module.scss";
import { A } from "@solidjs/router";
import { pageDetailPath } from "./[pageId]";

export const pagesPath = "/pages";
export const pagesUrl = () => buildUrl(pagesPath);

export default function Pages() {
  const { selectedWebsite } = useWebsiteContext();

  const [pagesResponse] = createResource(
    () => selectedWebsite()?.websiteId,
    async (websiteId: string) => pageService.listPages({ websiteId })
  );

  return (
    <>
      <Section>
        <h1>Pages</h1>

        <MdList>
          <Suspense>
            <For each={pagesResponse()?.pages}>
              {(page) => (
                <MdListItem class={styles.ListItem}>
                  <p slot="headline">
                    Title: {page.title} Path: {page.path}
                  </p>
                  <A slot="end" href={pageDetailPath(page.pageId.toString())}>
                    more
                  </A>
                </MdListItem>
              )}
            </For>
          </Suspense>
        </MdList>
      </Section>
    </>
  );
}
