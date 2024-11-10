import { useTransContext } from "@mbarzda/solid-i18next";
import { useParams } from "@solidjs/router";
import { createResource, createSignal } from "solid-js";
import { Font } from "~/components/content/Font";
import { MdButton } from "~/components/form/MdButton";
import { Breadcrumbs } from "~/components/layout/Breadcrumbs";
import { ResourceBoundary } from "~/components/layout/ResourceBoundary";
import { Section } from "~/components/layout/Section";
import { SectionTitle } from "~/components/layout/SectionTitle";
import { AddImageDialog } from "~/components/offers/images/AddImageDialog";
import { EditImages } from "~/components/offers/images/EditImages";
import { Page } from "~/layout/Page";
import { buildUrl } from "~/lib/env";
import { TKEYS } from "~/locales";
import { offerService } from "~/services/commerce";
import { offersPath } from "../(offers)";
import { offerDetailPath } from "./(offerId)";

export const offerImagesPath = (offerId: string) =>
  "/offers/" + offerId + "/images";
export const offerImagesUrl = (offerId: string) =>
  buildUrl(offerImagesPath(offerId));

export default function Images() {
  const [trans] = useTransContext();

  const { offerId } = useParams();

  const [offer, { refetch }] = createResource(
    () => offerId,
    async (offerId: string) => offerService.getOffer({ offerId }),
  );

  const [showAddImage, setShowAddImage] = createSignal(false);

  function handleShowAddImage() {
    setShowAddImage(true);
  }

  function handleCloseAddImage() {
    setShowAddImage(false);
  }

  async function handleUpdate() {
    await refetch();
  }

  return (
    <Page>
      <Section>
        <ResourceBoundary resource={offer}>
          <Breadcrumbs
            paths={[
              {
                label: trans(TKEYS.navigation.pages.Offers),
                path: offersPath(),
              },
              {
                label: offer()!.name,
                path: offerDetailPath(offer()!.offerId),
              },
            ]}
          />
        </ResourceBoundary>

        <SectionTitle key={TKEYS.navigation.pages["Offer-Images"]}>
          <MdButton type="filled-tonal" icon="add" onClick={handleShowAddImage}>
            <Font type="body" key={TKEYS.images["add-image"]} />
          </MdButton>
        </SectionTitle>

        <ResourceBoundary resource={offer}>
          <EditImages offer={offer()!} onUpdate={handleUpdate} />

          <AddImageDialog
            show={showAddImage()}
            offer={offer()!}
            onClose={handleCloseAddImage}
            onUpdate={handleUpdate}
          />
        </ResourceBoundary>
      </Section>
    </Page>
  );
}
