import { useTransContext } from "@mbarzda/solid-i18next";
import { useParams } from "@solidjs/router";
import { Match, Suspense, Switch, createResource } from "solid-js";

import { Breadcrumbs } from "~/components/layout/Breadcrumbs";
import { ContentLoading } from "~/components/layout/ContentLoading";
import { Section } from "~/components/layout/Section";
import { EditStaticPage } from "~/components/pages/EditStaticPage";
import { buildUrl } from "~/lib/env";
import { TKEYS } from "~/locales";
import { PageType } from "~/services/sited_io/websites/v1/page_pb";
import { pageService } from "~/services/website";
import { pagesPath } from "../(pages)";
import _ from "lodash";

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

  return (
    <>
      <Suspense fallback={<ContentLoading />}>
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
            <EditStaticPage />
          </Match>
        </Switch>
      </Suspense>
    </>
  );
}
