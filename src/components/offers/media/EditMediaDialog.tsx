import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { createStore } from "solid-js/store";
import { Font } from "~/components/content/Font";
import { Form } from "~/components/form/Form";
import { MdButton } from "~/components/form/MdButton";
import { MdTextField } from "~/components/form/MdTextField";
import { MdDialog } from "~/components/layout/MdDialog";
import { TKEYS } from "~/locales";
import { mediaService } from "~/services/media";
import { MediaResponse } from "~/services/sited_io/media/v1/media_pb";

type Props = {
  readonly show: boolean;
  readonly media: MediaResponse;
  readonly onClose: () => void;
  readonly onUpdate: () => void;
};

export function EditMediaDialog(props: Props) {
  const [trans] = useTransContext();

  const emptyRequest = {
    mediaId: props.media.mediaId,
    name: props.media.name,
  };

  const [request, setRequest] = createStore(_.clone(emptyRequest));

  const [erros, setErrors] = createStore({
    name: [] as string[],
  });

  function resetErrors() {
    setErrors({ name: [] });
  }

  function handleNameInput(name: string) {
    resetErrors();
    setRequest("name", name);
  }

  async function handleEditMedia(event: SubmitEvent) {
    event.preventDefault();

    try {
      await mediaService.updateMedia(request);
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
