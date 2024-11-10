import { useTransContext } from "@mbarzda/solid-i18next";
import {
  DragDropProvider,
  DragDropSensors,
  SortableProvider,
  closestCenter,
  createSortable,
} from "@thisbeyond/solid-dnd";
import _ from "lodash";
import { For, Show, createSignal } from "solid-js";

import { MdIcon } from "~/components/assets/MdIcon";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
} from "~/components/content/table";
import { DeleteConfirmationDialog } from "~/components/form/DeleteConfirmationDialog";
import { MdIconButton } from "~/components/form/MdIconButton";
import { TKEYS } from "~/locales";
import { mediaService } from "~/services/media";
import { OfferResponse } from "~/services/sited_io/commerce/v1/offer_pb";
import { MediaResponse } from "~/services/sited_io/media/v1/media_pb";
import { EditMediaDialog } from "./EditMediaDialog";

type Props = {
  readonly offer: OfferResponse;
  readonly medias: MediaResponse[];
  readonly onUpdate: () => void;
};

export function EditMedia(props: Props) {
  const [trans] = useTransContext();

  const [mediaToDelete, setMediaToDelete] = createSignal<MediaResponse>();
  const [mediaToEdit, setMediaToEdit] = createSignal<MediaResponse>();

  function mediaIds() {
    return props.medias.map((m) => m.mediaId);
  }

  function handleStartDeleteMedia(media: MediaResponse) {
    setMediaToDelete(media);
  }

  function handleCloseDeleteMedia() {
    setMediaToDelete();
  }

  function handleEditMedia(media: MediaResponse) {
    setMediaToEdit(media);
  }

  function handleCloseEditMedia() {
    setMediaToEdit();
  }

  async function handleDragEnd({ draggable, droppable }: any) {
    if (_.isNil(props.offer)) {
      return;
    }

    if (draggable && droppable && draggable.id !== droppable.id) {
      const fromMedia = _.find(props.medias, { mediaId: draggable.id });
      const toMedia = _.find(props.medias, { mediaId: droppable.id });

      if (!_.isNil(fromMedia) && !_.isNil(toMedia)) {
        await mediaService.updateMediaOfferOrdering({
          offerId: props.offer.offerId,
          mediaId: fromMedia.mediaId,
          ordering: toMedia.ordering,
        });
        handleUpdate();
      }
    }
  }

  async function handleDeleteMedia() {
    const media = mediaToDelete();

    if (!_.isNil(media)) {
      try {
        await mediaService.removeMediaFromOffer({
          offerId: props.offer.offerId,
          mediaId: media.mediaId,
        });
        await mediaService.deleteMedia({ mediaId: media.mediaId });
        handleUpdate();
      } catch (err) {
        console.error(err);
      }
    }
  }

  function handleUpdate() {
    setMediaToDelete();
    setMediaToEdit();
    props.onUpdate();
  }

  return (
    <>
      <Table cols={3}>
        <TableHead>
          <TableCell header>Name</TableCell>
          <TableCell header>Ordering</TableCell>
          <TableCell justifyEnd></TableCell>
        </TableHead>
        <DragDropProvider
          onDragEnd={handleDragEnd}
          collisionDetector={closestCenter}
        >
          <DragDropSensors />

          <SortableProvider ids={mediaIds()}>
            <For each={props.medias}>
              {(media) => {
                const sortable = createSortable(media.mediaId);
                false && sortable; // eslint-disable-line

                return (
                  <TableRow
                    style={{ "touch-action": "none" }}
                    sortable={sortable}
                  >
                    <TableCell>{media.name}</TableCell>
                    <TableCell>{media.ordering.toString()}</TableCell>
                    <TableCell justifyEnd>
                      <MdIconButton
                        onClick={() => handleStartDeleteMedia(media)}
                      >
                        <MdIcon icon="delete" />
                      </MdIconButton>
                      <MdIconButton onClick={() => handleEditMedia(media)}>
                        <MdIcon icon="edit" />
                      </MdIconButton>
                      <MdIcon icon="drag_handle" />
                    </TableCell>
                  </TableRow>
                );
              }}
            </For>
          </SortableProvider>
        </DragDropProvider>
      </Table>

      <Show when={!_.isNil(mediaToEdit())}>
        <EditMediaDialog
          show={!_.isNil(mediaToEdit())}
          media={mediaToEdit()!}
          offer={props.offer}
          onClose={handleCloseEditMedia}
          onUpdate={handleUpdate}
        />
      </Show>

      <DeleteConfirmationDialog
        show={!_.isNil(mediaToDelete())}
        item={trans(TKEYS.media.media)}
        itemName={mediaToDelete()?.name}
        onCancel={handleCloseDeleteMedia}
        onConfirmation={handleDeleteMedia}
      />
    </>
  );
}

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      sortable: boolean;
    }
  }
}
