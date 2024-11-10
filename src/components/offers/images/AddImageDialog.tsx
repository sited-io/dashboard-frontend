import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { Font } from "~/components/content/Font";
import { FileInput } from "~/components/form/FileInput";
import { Form } from "~/components/form/Form";
import { MdButton } from "~/components/form/MdButton";
import { resizeImage } from "~/lib/image";
import { readAsUint8Array } from "~/lib/string-manipulation";
import { TKEYS } from "~/locales";
import { offerService } from "~/services/commerce";
import { OfferResponse } from "~/services/sited_io/commerce/v1/offer_pb";
import { MdDialog } from "../../layout/MdDialog";

type Props = {
  show: boolean;
  offer: OfferResponse;
  onClose: () => void;
  onUpdate: () => void;
};

export function AddImageDialog(props: Props) {
  const [trans] = useTransContext();

  const emptyForm = {
    image: undefined as File | undefined,
    imageUrl: undefined as string | undefined,
    ordering: props.offer.images.length + 1,
  };

  const [form, setForm] = createStore(_.clone(emptyForm));
  const [, setErrors] = createStore({
    image: [] as string[],
  });

  const [, setUploading] = createSignal(false);

  function resetErrors() {
    setErrors({ image: [] });
  }

  async function handleImageInput(files: FileList | null) {
    resetErrors();
    const file = _.first(files);
    if (!_.isNil(file)) {
      try {
        const file = _.first(files)!;
        const resized = await resizeImage(URL.createObjectURL(file), 800, 800);
        setForm("image", resized);
        setForm("imageUrl", URL.createObjectURL(resized));
      } catch {
        setErrors("image", [
          trans(TKEYS.form.errors["wrong-type"], {
            types: "jpg, png, webp",
          }),
        ]);
      }
    } else {
      setForm("image", undefined);
      setForm("imageUrl", undefined);
    }
  }

  async function handleAddImage(event: SubmitEvent) {
    event.preventDefault();

    if (_.isNil(form.image)) {
      return;
    }

    setUploading(true);

    try {
      await offerService.addImageToOffer({
        offerId: props.offer.offerId,
        image: {
          contentType: "image/webp",
          data: await readAsUint8Array(form.image, 0, form.image?.size),
        },
        ordering: BigInt(form.ordering),
      });
      handleUpdate();
    } catch (err) {
      console.error(err);
    }

    setUploading(false);
  }

  function handleUpdate() {
    handleClose();
    props.onUpdate();
  }

  function handleClose() {
    setForm(_.clone(emptyForm));
    props.onClose();
  }

  return (
    <>
      <MdDialog open={props.show} onClose={handleClose}>
        <div slot="headline">
          <Font type="title" key={TKEYS.images["add-image"]} />
        </div>

        <div slot="content">
          <Form onSubmit={handleAddImage}>
            <FileInput accept="image/*" onValue={handleImageInput} />
          </Form>
        </div>

        <div slot="actions">
          <MdButton type="text" onClick={handleClose}>
            <Trans key={TKEYS.form.action.Close} />
          </MdButton>
          <MdButton submit onClick={handleAddImage}>
            <Trans key={TKEYS.form.action.Update} />
          </MdButton>
        </div>
      </MdDialog>
    </>
  );
}
