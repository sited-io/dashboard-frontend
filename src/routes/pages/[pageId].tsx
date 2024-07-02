import { useTransContext } from "@mbarzda/solid-i18next";
import { useParams } from "@solidjs/router";
import { Show, Suspense, createResource } from "solid-js";

import { Font } from "~/components/content/Font";
import { Breadcrumbs } from "~/components/layout/Breadcrumbs";
import { Section } from "~/components/layout/Section";
import { buildUrl } from "~/lib/env";
import { TKEYS } from "~/locales";
import { pageService } from "~/services/website";
import { pagesPath } from "./(pages)";
import { ContentLoading } from "~/components/layout/ContentLoading";

export const pageDetailPath = (pageId: bigint) => "/pages/" + pageId.toString();
export const pageDetailUrl = (pageId: bigint) =>
  buildUrl(pageDetailPath(pageId));

export default function PageDetail() {
  const { pageId } = useParams();

  const [trans] = useTransContext();

  const [page] = createResource(
    () => BigInt(pageId),
    async (pageId: bigint) => pageService.getPage({ pageId })
  );

  function isHomePage() {
    return page()?.path === "/";
  }

  return (
    <>
      <Section>
        <Breadcrumbs
          paths={[
            { label: trans(TKEYS.navigation.pages.Pages), path: pagesPath() },
          ]}
        />

        <Suspense fallback={<ContentLoading />}>
          <Font type="title">{page()?.title}</Font>
          <Show
            when={isHomePage()}
            fallback={<Font type="body">{page()?.path}</Font>}
          >
            <Font type="body" active key={TKEYS.page["home-page"]} />
          </Show>
        </Suspense>
      </Section>
    </>
  );
}
