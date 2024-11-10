import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { For, createResource, createSignal } from "solid-js";
import { MdIcon } from "~/components/assets/MdIcon";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
} from "~/components/content/table";
import { MdButton } from "~/components/form/MdButton";
import { MdIconButton } from "~/components/form/MdIconButton";
import { ResourceBoundary } from "~/components/layout/ResourceBoundary";
import { Section } from "~/components/layout/Section";
import { SectionTitle } from "~/components/layout/SectionTitle";
import { CreateOfferDialog } from "~/components/offers/CreateOfferDialog";
import { useWebsiteContext } from "~/contexts/WebsiteContext";
import { buildUrl } from "~/lib/env";
import { TKEYS } from "~/locales";
import { offerService, shopService } from "~/services/commerce";
import { offerDetailPath } from "./[offerId]/(offerId)";
import { Page } from "~/layout/Page";

export const offersPath = () => "/offers";
export const offersUrl = () => buildUrl(offersPath());

export default function Offers() {
  const [trans] = useTransContext();

  const { selectedWebsite } = useWebsiteContext();

  const [showCreateOffer, setShowCreateOffer] = createSignal(false);

  const [shop, { refetch }] = createResource(
    () => selectedWebsite()?.websiteId,
    async (websiteId: string) => shopService.getShop({ websiteId }),
  );
  const [offers] = createResource(
    () => shop()?.shopId,
    async (shopId: string) => offerService.listOffers({ shopId }),
  );

  function handleShowCreateOffer() {
    setShowCreateOffer(true);
  }

  function handleCloseCreateOffer() {
    setShowCreateOffer(false);
  }

  async function handleUpdate() {
    await refetch();
  }

  return (
    <Page>
      <Section>
        <SectionTitle title={trans(TKEYS.navigation.pages.Offers)}>
          <MdButton
            type="filled-tonal"
            icon="add"
            onClick={handleShowCreateOffer}
          >
            <Trans key={TKEYS.offers["create-offer"]} />
          </MdButton>
        </SectionTitle>

        <ResourceBoundary resource={shop}>
          <ResourceBoundary resource={offers}>
            <Table cols={3}>
              <TableHead>
                <TableCell header>Name</TableCell>
                <TableCell header>Visibility</TableCell>
                <TableCell justifyEnd></TableCell>
              </TableHead>
              <For each={offers()}>
                {(offer) => (
                  <TableRow>
                    <TableCell>{offer.name}</TableCell>
                    <TableCell>
                      {offer.isActive ? "visible" : "not visible"}
                    </TableCell>
                    <TableCell justifyEnd>
                      <MdIconButton href={offerDetailPath(offer.offerId)}>
                        <MdIcon icon="edit" />
                      </MdIconButton>
                    </TableCell>
                  </TableRow>
                )}
              </For>
            </Table>

            <CreateOfferDialog
              show={showCreateOffer()}
              shop={shop()!}
              onClose={handleCloseCreateOffer}
              onUpdate={handleUpdate}
            />
          </ResourceBoundary>
        </ResourceBoundary>
      </Section>
    </Page>
  );
}
