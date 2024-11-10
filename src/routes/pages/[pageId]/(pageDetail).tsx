import { useTransContext } from "@mbarzda/solid-i18next";
import { useParams } from "@solidjs/router";
import { Match, Switch, createResource } from "solid-js";

import { Breadcrumbs } from "~/components/layout/Breadcrumbs";
import { ResourceBoundary } from "~/components/layout/ResourceBoundary";
import { EditStaticPage } from "~/components/pages/EditStaticPage";
import { buildUrl } from "~/lib/env";
import { TKEYS } from "~/locales";
import { pagesPath } from "~/routes/pages/(pages)";
import { PageType } from "~/services/sited_io/websites/v1/page_pb";
import { pageService } from "~/services/website";

export const pageDetailPath = (pageId: bigint) => "/pages/" + pageId.toString();
export const pageDetailUrl = (pageId: bigint) =>
  buildUrl(pageDetailPath(pageId));

export default function PageDetail() {
  const { pageId } = useParams();

  const [trans] = useTransContext();

  const [page] = createResource(
    () => BigInt(pageId),
    async (pageId: bigint) => pageService.getPage({ pageId }),
  );

  return (
    <>
      <ResourceBoundary resource={page}>
        <Switch>
          <Match when={page()?.pageType === PageType.SHOP}>
            <Breadcrumbs
              paths={[
                {
                  label: trans(TKEYS.navigation.pages.Pages),
                  path: pagesPath(),
                },
                { label: page()?.title },
              ]}
            />

            <p>Shop</p>
          </Match>
          <Match when={page()?.pageType === PageType.STATIC}>
            <EditStaticPage page={page()!} />
          </Match>
        </Switch>
      </ResourceBoundary>
    </>
  );
}
