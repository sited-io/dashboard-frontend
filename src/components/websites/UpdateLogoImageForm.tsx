import { Trans } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { createEffect, createSignal } from "solid-js";
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

type Props = {
  website: WebsiteResponse;
  onUpdate: () => void;
};

export function UpdateLogoImageForm(props: Props) {
  const [form, setForm] = createStore({
    websiteId: undefined as string | undefined,
    image: undefined as File | undefined,
    imageUrl: undefined as string | undefined,
  });

  const [loading, setLoading] = createSignal(false);

  const [errors, setErrors] = createStore({ image: [] as string[] });

  createEffect(() => {
    if (_.isEmpty(form.websiteId)) {
      setForm("websiteId", props.website.websiteId);
    }
  });

  createEffect(() => {
    if (_.isNil(form.image)) {
      if (!_.isNil(props.website.customization?.logoImageUrl)) {
        setForm("imageUrl", props.website.customization?.logoImageUrl);
      }
    }
  });

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
    if (!_.isNil(file)) {
      const resized = await resizeImage(URL.createObjectURL(file), 270, 270);
      setForm("image", resized);
      setForm("imageUrl", URL.createObjectURL(resized));
    } else {
      setErrors("image", ["No image selected"]);
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
      <Font type="label" key={TKEYS.customization.labels["logo-image"]} />
      <Form onSubmit={handlePutLogoImage}>
        <ImageInput
          imageUrl={form.imageUrl}
          loading={loading}
          onValue={handleLogoImageInput}
        />

        <div>
          <MdButton onClick={handlePutLogoImage}>
            <Trans key={TKEYS.form.action.Update} />
          </MdButton>

          <MdButton type="outlined" danger onClick={handleRemoveLogoImage}>
            <Trans key={TKEYS.form.action.Delete} />
          </MdButton>
        </div>
      </Form>
    </>
  );
}
