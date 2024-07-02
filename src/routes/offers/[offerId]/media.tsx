import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { useParams } from "@solidjs/router";
import { createResource, createSignal } from "solid-js";
import { MdButton } from "~/components/form/MdButton";
import { Breadcrumbs } from "~/components/layout/Breadcrumbs";
import { ResourceBoundary } from "~/components/layout/ResourceBoundary";
import { Section } from "~/components/layout/Section";
import { SectionTitle } from "~/components/layout/SectionTitle";
import { EditMedia } from "~/components/offers/media/EditMedia";
import { buildUrl } from "~/lib/env";
import { TKEYS } from "~/locales";
import { offerService } from "~/services/commerce";
import { mediaService } from "~/services/media";
import { OfferResponse } from "~/services/sited_io/commerce/v1/offer_pb";
import {
  MediaFilterField,
  MediaOrderBy,
  MediaOrderByField,
} from "~/services/sited_io/media/v1/media_pb";
import { Direction } from "~/services/sited_io/ordering/v1/ordering_pb";
import { offersPath } from "../(offers)";
import { offerDetailPath } from "./(offerId)";
import { Font } from "~/components/content/Font";
import { UploadMediaDialog } from "~/components/offers/media/UploadMediaDialog";
import _ from "lodash";
import { Pagination } from "~/components/content/Pagination";
import { PaginationRequest } from "~/services/sited_io/pagination/v1/pagination_pb";
import { PartialMessage } from "@bufbuild/protobuf";

export const offerMediaPath = (offerId: string) =>
  "/offers/" + offerId + "/media";
export const offerMediaUrl = (offerId: string) =>
  buildUrl(offerMediaPath(offerId));

export default function OfferMedia() {
  const { offerId } = useParams();

  const [trans] = useTransContext();

  const [offer, { refetch }] = createResource(
    () => offerId,
    async (offerId: string) => offerService.getOffer({ offerId })
  );

  const [pagination, setPagination] = createSignal<
    PartialMessage<PaginationRequest>
  >({
    page: 1,
    size: 10,
  });

  const [medias, mediaActions] = createResource(
    () => [offer(), pagination()] as const,
    async ([offer, pagination]) =>
      mediaService.listMedia({
        shopId: offer?.shopId,
        filter: {
          field: MediaFilterField.OFFER_ID,
          query: offer?.offerId,
        },
        orderBy: {
          field: MediaOrderByField.ORDERING,
          direction: Direction.ASC,
        },
        pagination,
      })
  );

  const [showUploadMedia, setShowUploadMedia] = createSignal(false);

  function nextMediaOrdering() {
    const lastOrdering = _.max(medias()?.medias.map((m) => m.ordering));
    if (!_.isNil(lastOrdering)) {
      return lastOrdering + BigInt(1);
    }
  }

  function handleShowUploadMedia() {
    setShowUploadMedia(true);
  }

  function handleCloseUploadMedia() {
    setShowUploadMedia(false);
  }

  function handleMediaPagination(
    pagination: PartialMessage<PaginationRequest>
  ) {
    setPagination(pagination);
  }

  async function handleUpdate() {
    await refetch();
  }

  async function handleUpdateMedia() {
    await mediaActions.refetch();
  }

  return (
    <>
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

        <SectionTitle key={TKEYS.navigation.pages["Offer-Media"]}>
          <MdButton
            type="filled-tonal"
            icon="add"
            onClick={handleShowUploadMedia}
          >
            <Font type="body" key={TKEYS.media["upload-media"]} />
          </MdButton>
        </SectionTitle>

        <ResourceBoundary resource={offer}>
          <ResourceBoundary resource={medias}>
            <EditMedia
              offer={offer()!}
              medias={medias()!.medias}
              onUpdate={handleUpdateMedia}
            />

            <Section centered>
              <Pagination
                pagination={() => medias()?.pagination}
                onValue={handleMediaPagination}
              />
            </Section>

            <UploadMediaDialog
              show={showUploadMedia()}
              offer={offer()!}
              nextOrdering={nextMediaOrdering()}
              onClose={handleCloseUploadMedia}
              onUpdate={handleUpdate}
            />
          </ResourceBoundary>
        </ResourceBoundary>
      </Section>
    </>
  );
}
