import { useParams } from "@solidjs/router";

import { buildUrl } from "~/lib/env";

export const pageDetailPath = (pageId: string) => "/pages/" + pageId;
export const pageDetailUrl = (pageId: string) =>
  buildUrl(pageDetailPath(pageId));

export default function PageDetail() {
  const { pageId } = useParams();

  return (
    <>
      <h1>Page detail {pageId}</h1>
    </>
  );
}
