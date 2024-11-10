import { useTransContext } from "@mbarzda/solid-i18next";
import { useNavigate, useParams } from "@solidjs/router";
import { Show, createResource, createSignal } from "solid-js";

import { Font } from "~/components/content/Font";
import { DeleteConfirmationDialog } from "~/components/form/DeleteConfirmationDialog";
import { Breadcrumbs } from "~/components/layout/Breadcrumbs";
import { ResourceBoundary } from "~/components/layout/ResourceBoundary";
import { Section } from "~/components/layout/Section";
import { EditDetails } from "~/components/offers/EditDetails";
import { EditOfferImages } from "~/components/offers/EditOfferImages";
import { EditPrice } from "~/components/offers/EditPrice";
import { EditShippingRates } from "~/components/offers/EditShippingRates";
import { EditVisibility } from "~/components/offers/EditVisibility";
import { EditableField } from "~/components/offers/EditableField";
import { buildUrl } from "~/lib/env";
import { TKEYS } from "~/locales";
import { offerService } from "~/services/commerce";
import { OfferType } from "~/services/sited_io/commerce/v1/offer_pb";
import { offersPath } from "../(offers)";
import { offerMediaPath } from "./media";
import { Page } from "~/layout/Page";

export const offerDetailPath = (offerId: string) => "/offers/" + offerId;
export const offerDetailUrl = (offerId: string) =>
  buildUrl(offerDetailPath(offerId));

export default function OfferDetail() {
  const navigate = useNavigate();
  const [trans] = useTransContext();
  const { offerId } = useParams();

  const [offer, { refetch }] = createResource(
    () => offerId,
    async (offerId: string) => offerService.getOffer({ offerId }),
  );

  const [showDeleteOffer, setShowDeleteOffer] = createSignal(false);

  function handleShowDeleteOffer() {
    setShowDeleteOffer(true);
  }

  function handleCloseDeleteOffer() {
    setShowDeleteOffer(false);
  }

  async function handleDeleteOffer() {
    try {
      await offerService.deleteOffer({ offerId });
      navigate(offersPath());
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUpdate() {
    await refetch();
  }

  return (
    <Page>
      <Section>
        <Breadcrumbs
          paths={[
            { label: trans(TKEYS.navigation.pages.Offers), path: offersPath() },
          ]}
        />

        <ResourceBoundary resource={offer}>
          <EditOfferImages offer={offer()!} onUpdate={handleUpdate} />

          <EditDetails offer={offer()!} onUpdate={handleUpdate} />

          <EditPrice offer={offer()!} onUpdate={handleUpdate} />

          <EditShippingRates offer={offer()!} onUpdate={handleUpdate} />

          <Show when={offer()?.type === OfferType.DIGITAL}>
            <EditableField
              openInNew
              onClick={() => navigate(offerMediaPath(offer()!.offerId))}
            >
              <Font type="label" key={TKEYS.offers["edit-media"]} />
            </EditableField>
          </Show>

          <EditVisibility offer={offer()!} onUpdate={handleUpdate} />

          <EditableField onClick={handleShowDeleteOffer}>
            <Font type="label" key={TKEYS.offers["delete-offer"]} />
          </EditableField>

          <DeleteConfirmationDialog
            show={showDeleteOffer()}
            item={trans(TKEYS.offers.offer)}
            itemName={offer()!.name}
            onCancel={handleCloseDeleteOffer}
            onConfirmation={handleDeleteOffer}
          />
        </ResourceBoundary>
      </Section>
    </Page>
  );
}
