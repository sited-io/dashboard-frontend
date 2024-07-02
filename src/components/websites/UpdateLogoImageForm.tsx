import { Trans } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show, createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { Font } from "~/components/content/Font";
import { Form } from "~/components/form/Form";
import { ImageInput } from "~/components/form/ImageInput";
import { MdButton } from "~/components/form/MdButton";
import { resizeImage } from "~/lib/image";
import { readAsUint8Array } from "~/lib/string-manipulation";
import { TKEYS } from "~/locales";
import { PutLogoImageRequest } from "~/services/sited_io/websites/v1/customization_pb";
import { WebsiteResponse } from "~/services/sited_io/websites/v1/website_pb";
import { customizationService } from "~/services/website";
import commonStyles from "./CommonForm.module.scss";
import { FileInput } from "../form/FileInput";

type Props = {
  website: WebsiteResponse;
  onUpdate: () => void;
};

export function UpdateLogoImageForm(props: Props) {
  const [form, setForm] = createStore({
    websiteId: props.website.websiteId,
    image: undefined as File | undefined,
    imageUrl: undefined as string | undefined,
  });

  const [loading, setLoading] = createSignal(false);

  const [errors, setErrors] = createStore({ image: [] as string[] });

  function resetErrors() {
    setErrors({ image: [] });
  }

  function handleUpdate() {
    resetErrors();
    props.onUpdate();
  }

  async function handleLogoImageInput(files: FileList | null) {
    resetErrors();

    const file = _.first(files);
    if (_.isNil(file)) {
      setErrors("image", ["No image selected"]);
      return;
    }
    try {
      const resized = await resizeImage(URL.createObjectURL(file), 270, 270);
      setForm("image", resized);
      setForm("imageUrl", URL.createObjectURL(resized));
    } catch (err: any) {
      console.error(err);
      setErrors("image", ["Unkown error"]);
    }
  }

  async function handlePutLogoImage() {
    if (_.isNil(form.image)) return;

    setLoading(true);
    const request = new PutLogoImageRequest({
      websiteId: form.websiteId,
      image: {
        contentType: "image/webp",
        data: await readAsUint8Array(form.image, 0, form.image.size),
      },
    });

    try {
      await customizationService.putLogoImage(request);
      handleUpdate();
    } catch (err) {
      // console.error(`${err}`);
    }
    setLoading(false);
  }

  async function handleRemoveLogoImage() {
    try {
      await customizationService.removeLogoImage({
        websiteId: props.website.websiteId,
      });
      handleUpdate();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div class={commonStyles.Fields}>
        <Font
          class={commonStyles.Label}
          type="label"
          key={TKEYS.customization.labels["logo-image"]}
        />

        <Form
          onSubmit={handlePutLogoImage}
          actions={
            <>
              <Show
                when={
                  _.isNil(form.imageUrl) &&
                  !_.isNil(props.website.customization?.logoImageUrl)
                }
              >
                <MdButton
                  type="outlined"
                  danger
                  onClick={handleRemoveLogoImage}
                >
                  <Trans key={TKEYS.form.action.Delete} />
                </MdButton>
              </Show>

              <MdButton
                onClick={handlePutLogoImage}
                disabled={_.isNil(form.image)}
              >
                <Trans key={TKEYS.form.action.Update} />
              </MdButton>
            </>
          }
        >
          <div class={commonStyles.Field}>
            <FileInput accept="image/*" onValue={handleLogoImageInput} />

            <Show
              when={
                !_.isNil(form.imageUrl) ||
                !_.isNil(props.website.customization?.logoImageUrl)
              }
            >
              <img
                class={commonStyles.ImagePreview}
                src={form.imageUrl || props.website.customization?.logoImageUrl}
              />
            </Show>
          </div>
        </Form>
      </div>
    </>
  );
}
