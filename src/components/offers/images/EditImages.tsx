import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { For, Show, createSignal } from "solid-js";

import { Grid, GridItem } from "~/components/content/grid";
import { DeleteConfirmationDialog } from "~/components/form/DeleteConfirmationDialog";
import { MdButton } from "~/components/form/MdButton";
import { TKEYS } from "~/locales";
import { offerService } from "~/services/commerce";
import {
  OfferImageResponse,
  OfferResponse,
} from "~/services/sited_io/commerce/v1/offer_pb";
import styles from "./EditImages.module.scss";

type Props = {
  readonly offer: OfferResponse;
  readonly onUpdate: () => void;
};

export function EditImages(props: Props) {
  const [trans] = useTransContext();

  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    createSignal(false);
  const [selectedImage, setSelectedImage] = createSignal<OfferImageResponse>();

  function handleShowDeleteImage() {
    setShowDeleteConfirmation(true);
  }

  function handleCloseDeleteImage() {
    setShowDeleteConfirmation(false);
  }

  function handleSelectImage(image: OfferImageResponse) {
    setSelectedImage(image);
  }

  async function handleDeleteImage() {
    const image = selectedImage();
    if (_.isNil(image)) {
      console.log("no image selected");
      return;
    }

    try {
      await offerService.removeImageFromOffer({
        offerImageId: image.offerImageId,
      });
      handleUpdate();
    } catch (err) {
      console.error(err);
    }
  }

  function handleUpdate() {
    props.onUpdate();
  }

  return (
    <>
      <Grid class={styles.ImageGrid}>
        <For each={props.offer.images}>
          {(image) => (
            <GridItem>
              <div
                class={styles.ImageContainer}
                onClick={() => handleSelectImage(image)}
              >
                <img
                  class={styles.Image}
                  classList={{
                    [styles.Selected]:
                      image.offerImageId === selectedImage()?.offerImageId,
                  }}
                  src={image.imageUrl}
                />
              </div>
            </GridItem>
          )}
        </For>
      </Grid>

      <div class={styles.Actions}>
        <Show when={!_.isNil(selectedImage())}>
          <MdButton icon="delete" danger onClick={handleShowDeleteImage}>
            <Trans key={TKEYS.images["remove-image"]} />
          </MdButton>
        </Show>
      </div>

      <DeleteConfirmationDialog
        show={showDeleteConfirmation()}
        item={trans(TKEYS.offers.labels.image)}
        onCancel={handleCloseDeleteImage}
        onConfirmation={handleDeleteImage}
      />
    </>
  );
}
