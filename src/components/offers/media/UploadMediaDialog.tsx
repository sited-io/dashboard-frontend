import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { Font } from "~/components/content/Font";
import { ProgressBar } from "~/components/content/ProgressBar";
import { FileInput } from "~/components/form/FileInput";
import { Form } from "~/components/form/Form";
import { MdButton } from "~/components/form/MdButton";
import { MdTextField } from "~/components/form/MdTextField";
import { MdDialog } from "~/components/layout/MdDialog";
import { humanFileSize, readAsUint8Array } from "~/lib/string-manipulation";
import { TKEYS } from "~/locales";
import { mediaService } from "~/services/media";
import { OfferResponse } from "~/services/sited_io/commerce/v1/offer_pb";
import { MediaResponse, Part } from "~/services/sited_io/media/v1/media_pb";

const CHUNKSIZE = 1024 * 1024 * 5;

type Props = {
  show: boolean;
  offer: OfferResponse;
  nextOrdering?: bigint | undefined;
  onClose: () => void;
  onUpdate: () => void;
};

export function UploadMediaDialog(props: Props) {
  const [trans] = useTransContext();

  const [form, setForm] = createStore({
    file: undefined as File | undefined,
    name: "",
    ordering: props.nextOrdering || BigInt(1),
  });

  const [errors, setErrors] = createStore({
    name: [] as string[],
    file: [] as string[],
  });

  const [uploading, setUploading] = createSignal(false);
  const [uploadedBytes, setUploadedBytes] = createSignal<number>();

  function resetErrors() {
    setErrors({ name: [], file: [] });
  }

  function handleFileInput(files: FileList | null) {
    resetErrors();
    if (!_.isNil(files) && !_.isEmpty(files)) {
      const file = _.first(files)!;
      if (file.size < import.meta.env.VITE_FILE_MAX_SIZE) {
        setForm("file", file);
        setForm("name", file.name);
      } else {
        setErrors("file", [
          trans(TKEYS.form.errors["item-too-large"], {
            item: trans(TKEYS.media.media),
            maxSize: humanFileSize(import.meta.env.VITE_FILE_MAX_SIZE),
          }),
        ]);
      }
    }
  }

  function handleNameInput(name: string) {
    resetErrors();
    setForm("name", name);
  }

  async function handleUploadMedia(event: SubmitEvent) {
    try {
      event.preventDefault();

      setUploading(true);

      if (_.isNil(form.file)) {
        setErrors("file", ["file required"]);
        setUploading(false);
        return;
      }

      let media: MediaResponse;
      if (form.file.size < CHUNKSIZE) {
        media = await uploadSimple();
      } else {
        media = await uploadMultipart();
      }

      await mediaService.addMediaToOffer({
        mediaId: media.mediaId,
        offerId: props.offer.offerId,
        ordering: form.ordering,
      });

      handleUpdate();
      setUploading(false);
    } catch (err) {
      console.error(err);
      setUploading(false);
      throw err;
    }
  }

  async function uploadSimple() {
    return mediaService.createMedia({
      shopId: props.offer.shopId,
      name: form.name || form.file!.name,
      file: {
        contentType: form.file!.type,
        data: await readAsUint8Array(form.file!, 0, form.file!.size),
      },
      fileName: form.file!.name,
    });
  }

  async function uploadMultipart() {
    const media = await mediaService.createMedia({
      shopId: props.offer.shopId,
      name: form.name || form.file!.name,
      fileName: form.file!.name,
    });

    const initialized = await mediaService.initiateMultipartUpload({
      mediaId: media.mediaId,
      contentType: form.file!.type,
    });

    let totalRead = 0;
    let partNumber = 1;
    const parts: Part[] = [];

    for (let i = 0; i <= form.file!.size; i += CHUNKSIZE) {
      const end = i + CHUNKSIZE;
      const chunk = await readAsUint8Array(form.file!, i, end);
      totalRead += chunk.length;
      const part = await mediaService.putMultipartChunk({
        mediaId: media.mediaId,
        uploadId: initialized.uploadId,
        partNumber,
        chunk,
      });
      partNumber += 1;
      parts.push(part);
      setUploadedBytes(totalRead);
    }

    await mediaService.completeMultipartUpload({
      mediaId: media.mediaId,
      uploadId: initialized.uploadId,
      parts,
    });

    return media;
  }

  function handleClose() {
    props.onClose();
  }

  function handleUpdate() {
    handleClose();
    props.onUpdate();
  }

  return (
    <>
      <MdDialog open={props.show} onClose={handleClose}>
        <div slot="headline">
          <Font type="title" key={TKEYS.media["upload-media"]} />
        </div>

        <div slot="content">
          <Form onSubmit={handleUploadMedia}>
            <Show
              when={!uploading()}
              fallback={
                <ProgressBar total={form.file?.size} current={uploadedBytes} />
              }
            >
              <FileInput onValue={handleFileInput} />
              <Show when={!_.isEmpty(errors.file)}>
                <Font type="body" danger>
                  {errors.file}
                </Font>
              </Show>

              <MdTextField
                value={form.name}
                label={trans(TKEYS.media.labels.name)}
                onValue={handleNameInput}
                error={!_.isEmpty(errors.name)}
                errorText={errors.name}
              />
            </Show>
          </Form>
        </div>

        <div slot="actions">
          <MdButton type="text" onClick={handleClose} disabled={uploading()}>
            <Trans key={TKEYS.form.action.Close} />
          </MdButton>
          <MdButton
            submit
            onClick={handleUploadMedia}
            disabled={
              _.isNil(form.file) || !_.isEmpty(errors.file) || uploading()
            }
          >
            <Trans key={TKEYS.form.action.Create} />
          </MdButton>
        </div>
      </MdDialog>
    </>
  );
}
