import { useParams } from "@solidjs/router";
import { createResource } from "solid-js";
import { ResourceBoundary } from "~/components/layout/ResourceBoundary";
import { PreviewStaticPage } from "~/components/pages/PreviewStaticPage";
import { Header } from "~/layout/Header";
import { Page } from "~/layout/Page";
import { buildUrl } from "~/lib/env";
import { pageService } from "~/services/website";

export const pagePreviewPath = (pageId: string) =>
  "/pages/" + pageId.toString() + "/preview";
export const pageDetailUrl = (pageId: string) =>
  buildUrl(pagePreviewPath(pageId));

export default function Preview() {
  const { pageId } = useParams();

  const [page] = createResource(
    () => BigInt(pageId),
    async (pageId: bigint) => pageService.getPage({ pageId })
  );

  return (
    <Page>
      <ResourceBoundary resource={page}>
        <PreviewStaticPage class="mt-[56px] overflow-auto" page={page()!} />
      </ResourceBoundary>
    </Page>
  );
}
