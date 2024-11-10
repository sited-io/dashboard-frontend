import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { For, createSignal } from "solid-js";

import { TKEYS } from "~/locales";
import {
  DomainResponse,
  DomainStatus,
} from "~/services/sited_io/websites/v1/domain_pb";
import { WebsiteResponse } from "~/services/sited_io/websites/v1/website_pb";
import { domainService } from "~/services/website";
import { MdIcon } from "../assets/MdIcon";
import { Font } from "../content/Font";
import { Table, TableCell, TableHead, TableRow } from "../content/table";
import { CreateDomainDialog } from "../domains/CreateDomainDialog";
import { DeleteConfirmationDialog } from "../form/DeleteConfirmationDialog";
import { MdButton } from "../form/MdButton";
import { MdIconButton } from "../form/MdIconButton";
import { SectionTitle } from "../layout/SectionTitle";

type Props = {
  website: WebsiteResponse;
  onUpdate: () => void;
};

export function UpdateDomainsForm(props: Props) {
  const [trans] = useTransContext();

  const [showCreateDomain, setShowCreateDomain] = createSignal(false);
  const [showDeleteDomain, setShowDeleteDomain] = createSignal(false);
  const [domainToDelete, setDomainToDelete] = createSignal<DomainResponse>();

  function handleShowCreateDomain() {
    setShowCreateDomain(true);
  }

  function handleCloseCreateDomain() {
    setShowCreateDomain(false);
  }

  function handleStartDeleteDomain(domain: DomainResponse) {
    setDomainToDelete(domain);
    setShowDeleteDomain(true);
  }

  function handleCancelDeleteDomain() {
    setShowDeleteDomain(false);
    setDomainToDelete();
  }

  async function handleConfirmDeleteDomain() {
    try {
      await domainService.deleteDomain({
        domainId: domainToDelete()?.domainId,
      });
      handleUpdate();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleCheckDomainStatus(domain: DomainResponse) {
    try {
      await domainService.checkDomainStatus({
        domainId: domain.domainId,
      });
      handleUpdate();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUpdate() {
    handleCloseCreateDomain();
    handleCancelDeleteDomain();
    props.onUpdate();
  }

  return (
    <>
      <SectionTitle type="label" key={TKEYS.websites.labels.domains}>
        <MdButton
          type="filled-tonal"
          icon="add"
          onClick={handleShowCreateDomain}
        >
          <Font type="body" key={TKEYS.domain["add-domain"]} />
        </MdButton>
      </SectionTitle>

      <Table cols={3}>
        <TableHead>
          <TableCell header>Domain</TableCell>
          <TableCell header>Status</TableCell>
          <TableCell justifyEnd></TableCell>
        </TableHead>

        <For each={props.website.domains}>
          {(domain) => (
            <>
              <TableRow>
                <TableCell>{domain.domain}</TableCell>
                <TableCell>
                  <Trans key={TKEYS.domain["domain-status"][domain.status]} />
                </TableCell>
                <TableCell justifyEnd>
                  <MdIconButton
                    onClick={() => handleStartDeleteDomain(domain)}
                    disabled={domain.status === DomainStatus.INTERNAL}
                  >
                    <MdIcon icon="delete" />
                  </MdIconButton>
                  <MdIconButton
                    onClick={() => handleCheckDomainStatus(domain)}
                    disabled={domain.status === DomainStatus.INTERNAL}
                  >
                    <MdIcon icon="refresh" />
                  </MdIconButton>
                </TableCell>
              </TableRow>
            </>
          )}
        </For>
      </Table>

      <CreateDomainDialog
        show={showCreateDomain()}
        website={props.website}
        onClose={handleCloseCreateDomain}
        onUpdate={handleUpdate}
      />

      <DeleteConfirmationDialog
        show={showDeleteDomain()}
        item={trans(TKEYS.domain.domain)}
        itemName={domainToDelete()?.domain}
        onCancel={handleCancelDeleteDomain}
        onConfirmation={handleConfirmDeleteDomain}
      />
    </>
  );
}
