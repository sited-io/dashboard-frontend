import { PlainMessage, toPlainMessage } from "@bufbuild/protobuf";
import { A } from "@solidjs/router";
import { clientOnly } from "@solidjs/start";
import { createResource } from "solid-js";

import { MdIcon } from "~/components/assets/MdIcon";
import { pagesPath } from "~/routes/pages/(pages)";
import { PageResponse } from "~/services/sited_io/websites/v1/page_pb";
import { Component } from "~/services/sited_io/websites/v1/static_page_pb";
import { staticPageService } from "~/services/website";
import { ResourceBoundary } from "../layout/ResourceBoundary";

const StaticPageEditor = clientOnly(() => import("./StaticPageEditor"));

type Props = {
  readonly page: PageResponse;
};

export function EditStaticPage(props: Props) {
  const [staticPage] = createResource(
    () => props.page.pageId,
    async (pageId: bigint) => staticPageService.getStaticPage({ pageId })
  );

  async function handleSave(components: PlainMessage<Component>[]) {
    try {
      await staticPageService.updateStaticPage({
        pageId: staticPage()?.pageId,
        components: components.map(toPlainMessage),
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div class="realative flex flex-col w-full h-screen items-center">
        <nav class="flex justify-between items-center w-full py-1 bg-gray-200 sticky">
          <A
            class="w-12 h-12 ml-1 flex justify-center items-center"
            href={pagesPath()}
          >
            <MdIcon icon="arrow_back" />
          </A>

          <span class="text-lg">{props.page.title}</span>

          <div class="mr-3"></div>
        </nav>

        <div class="flex flex-col gap-1 max-w-screen-lg w-full flex-1 overflow-y-auto ">
          <ResourceBoundary resource={staticPage}>
            <StaticPageEditor
              class="flex-1 p-4"
              staticPage={staticPage()}
              onSave={handleSave}
            />
          </ResourceBoundary>
        </div>
      </div>
    </>
  );
}
