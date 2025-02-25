import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { useNavigate } from "@solidjs/router";
import _ from "lodash";
import { For, Show, Suspense, createResource, createSignal } from "solid-js";

import { MdIcon } from "~/components/assets/MdIcon";
import { Font } from "~/components/content/Font";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
} from "~/components/content/table";
import { DeleteConfirmationDialog } from "~/components/form/DeleteConfirmationDialog";
import { MdButton } from "~/components/form/MdButton";
import { MdIconButton } from "~/components/form/MdIconButton";
import { ContentLoading } from "~/components/layout/ContentLoading";
import { Section } from "~/components/layout/Section";
import { SectionTitle } from "~/components/layout/SectionTitle";
import { CreatePageDialog } from "~/components/pages/CreatePageDialog";
import { useWebsiteContext } from "~/contexts/WebsiteContext";
import { buildUrl } from "~/lib/env";
import { TKEYS } from "~/locales";
import {
  PageResponse,
  PageType,
} from "~/services/sited_io/websites/v1/page_pb";
import { pageService } from "~/services/website";
import { pageDetailPath } from "./[pageId]/(pageDetail)";
import { Page } from "~/layout/Page";
import { EditPageSettingsDialog } from "~/components/pages/EditPageSettingsDialog";

export const pagesPath = () => "/pages";
export const pagesUrl = () => buildUrl(pagesPath());

export default function Pages() {
  const navigate = useNavigate();

  const [trans] = useTransContext();

  const { selectedWebsite } = useWebsiteContext();

  const [showCreatePage, setShowCreatePage] = createSignal(false);
  const [pageToEditSettings, setPageToEditSettings] =
    createSignal<PageResponse>();
  const [pageToDelete, setPageToDelete] = createSignal<PageResponse>();

  const [pagesResponse, pagesActions] = createResource(
    () => selectedWebsite()?.websiteId,
    async (websiteId: string) => pageService.listPages({ websiteId }),
  );

  function pagesDisplay() {
    return _.orderBy(
      pagesResponse()?.pages,
      ["isHomePage", "path"],
      ["desc", "asc"],
    );
  }

  function handleShowCreatePage() {
    setShowCreatePage(true);
  }

  function handleCloseCreatePage() {
    setShowCreatePage(false);
  }

  function handleStartEditPageSettings(pageId: bigint) {
    setPageToEditSettings(
      pagesResponse()?.pages.find((p) => p.pageId === pageId),
    );
  }

  function handleCancelEditPageSettings() {
    setPageToEditSettings();
  }

  function handleStartDeletePage(pageId: bigint) {
    setPageToDelete(pagesResponse()?.pages.find((p) => p.pageId === pageId));
  }

  function handleCancelDeletePage() {
    setPageToDelete();
  }

  async function handleConfirmDeletePage() {
    try {
      await pageService.deletePage({ pageId: pageToDelete()?.pageId });
      handleUpdate();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUpdate() {
    setShowCreatePage(false);
    setPageToEditSettings();
    setPageToDelete();
    await pagesActions.refetch();
  }

  return (
    <Page>
      <Section>
        <SectionTitle title={trans(TKEYS.navigation.pages.Pages)}>
          <MdButton
            type="filled-tonal"
            icon="add"
            onClick={handleShowCreatePage}
          >
            <Trans key={TKEYS.page["create-page"]} />
          </MdButton>
        </SectionTitle>

        <Table cols={4}>
          <TableHead>
            <TableCell header>Title</TableCell>
            <TableCell header>Path</TableCell>
            <TableCell header>Type</TableCell>
            <TableCell justifyEnd></TableCell>
          </TableHead>
          <Suspense fallback={<ContentLoading />}>
            <For
              each={pagesDisplay()}
              fallback={
                <div>
                  <Font type="body" key={TKEYS.page["no-pages-yet"]} />
                </div>
              }
            >
              {(page) => (
                <>
                  <TableRow>
                    <TableCell>{page.title}</TableCell>
                    <TableCell>{page.path}</TableCell>
                    <TableCell>
                      <Font
                        type="body"
                        key={TKEYS.page["page-type"][page.pageType]}
                      />
                    </TableCell>
                    <TableCell justifyEnd>
                      <Show when={page.pageType === PageType.STATIC}>
                        <MdIconButton
                          onClick={() => navigate(pageDetailPath(page.pageId))}
                        >
                          <MdIcon icon="edit" />
                        </MdIconButton>
                      </Show>
                      <MdIconButton
                        onClick={() => handleStartEditPageSettings(page.pageId)}
                      >
                        <MdIcon icon="settings" />
                      </MdIconButton>
                      <MdIconButton
                        onClick={() => handleStartDeletePage(page.pageId)}
                      >
                        <MdIcon icon="delete" />
                      </MdIconButton>
                    </TableCell>
                  </TableRow>
                </>
              )}
            </For>
          </Suspense>
        </Table>
      </Section>

      <Show when={!_.isNil(selectedWebsite())}>
        <CreatePageDialog
          show={showCreatePage()}
          website={selectedWebsite()!}
          onClose={handleCloseCreatePage}
          onUpdate={handleUpdate}
        />

        <EditPageSettingsDialog
          show={!_.isNil(pageToEditSettings())}
          page={pageToEditSettings()}
          onClose={handleCancelEditPageSettings}
          onUpdate={handleUpdate}
        />

        <DeleteConfirmationDialog
          show={!_.isNil(pageToDelete())}
          item={trans(TKEYS.page.page)}
          itemName={pageToDelete()?.title}
          onCancel={handleCancelDeletePage}
          onConfirmation={handleConfirmDeletePage}
        />
      </Show>
    </Page>
  );
}
