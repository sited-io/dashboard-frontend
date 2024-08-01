import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show } from "solid-js";
import { createStore } from "solid-js/store";
import { Font } from "~/components/content/Font";
import { Form } from "~/components/form/Form";
import { MdButton } from "~/components/form/MdButton";
import { MdTextField } from "~/components/form/MdTextField";
import { MdDialog } from "~/components/layout/MdDialog";
import { TKEYS } from "~/locales";
import { mediaService } from "~/services/media";
import { OfferResponse } from "~/services/sited_io/commerce/v1/offer_pb";
import { MediaResponse } from "~/services/sited_io/media/v1/media_pb";

type Props = {
  readonly show: boolean;
  readonly media: MediaResponse;
  readonly offer?: OfferResponse;
  readonly onClose: () => void;
  readonly onUpdate: () => void;
};

export function EditMediaDialog(props: Props) {
  const [trans] = useTransContext();

  const emptyRequest = {
    mediaId: props.media.mediaId,
    name: props.media.name,
    ordering: props.media.ordering,
  };

  const [request, setRequest] = createStore(_.clone(emptyRequest));

  const emptyErrors = {
    name: [] as string[],
    ordering: [] as string[],
  };

  const [erros, setErrors] = createStore(_.clone(emptyErrors));

  function resetErrors() {
    setErrors(_.clone(emptyErrors));
  }

  function handleNameInput(name: string) {
    resetErrors();
    setRequest("name", name);
  }

  function handleOrderingInput(orderingStr: string) {
    resetErrors();
    try {
      const ordering = BigInt(orderingStr);
      setRequest("ordering", ordering);
    } catch (err: any) {
      setErrors("ordering", [err.toString()]);
    }
  }

  async function handleEditMedia(event: SubmitEvent) {
    event.preventDefault();

    try {
      await mediaService.updateMedia({
        mediaId: request.mediaId,
        name: request.name,
      });
      if (!_.isNil(props.offer) && request.ordering !== props.media.ordering) {
        await mediaService.updateMediaOfferOrdering({
          mediaId: request.mediaId,
          offerId: props.offer.offerId,
          ordering: request.ordering,
        });
      }
      handleUpdate();
    } catch (err) {
      console.error(err);
    }
  }

  function handleClose() {
    props.onClose();
  }

  function handleUpdate() {
    props.onUpdate();
  }
  return (
    <>
      <MdDialog open={props.show} onClose={handleClose}>
        <div slot="headline">
          <div>
            <Font type="title" inline key={TKEYS.media["edit-file"]} />:{" "}
            <Font type="title" inline>
              {props.media.fileName}
            </Font>
          </div>
        </div>

        <div slot="content">
          <Form onSubmit={handleEditMedia}>
            <MdTextField
              value={request.name}
              label={trans(TKEYS.media.labels.name)}
              onValue={handleNameInput}
              error={!_.isEmpty(erros.name)}
              errorText={erros.name}
            />

            <Show when={!_.isNil(props.offer)}>
              <MdTextField
                value={Number(request.ordering)}
                type="number"
                label={trans(TKEYS.media.labels.ordering)}
                onValue={handleOrderingInput}
                error={!_.isEmpty(erros.ordering)}
                errorText={erros.ordering}
              />
            </Show>
          </Form>
        </div>

        <div slot="actions">
          <MdButton type="text" onClick={handleClose}>
            <Trans key={TKEYS.form.action.Close} />
          </MdButton>
          <MdButton type="filled" onClick={handleEditMedia}>
            <Trans key={TKEYS.form.action.Save} />
          </MdButton>
        </div>
      </MdDialog>
    </>
  );
}
