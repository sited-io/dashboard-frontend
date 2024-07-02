import { Trans } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { createStore } from "solid-js/store";

import { Font } from "~/components/content/Font";
import { ColorInput } from "~/components/form/ColorInput";
import { Form } from "~/components/form/Form";
import { MdButton } from "~/components/form/MdButton";
import { TKEYS } from "~/locales";
import { UpdateCustomizationRequest } from "~/services/sited_io/websites/v1/customization_pb";
import { WebsiteResponse } from "~/services/sited_io/websites/v1/website_pb";
import { customizationService } from "~/services/website";
import commonStyles from "./CommonForm.module.scss";
import { MdTextField } from "../form/MdTextField";
import { isCssColor } from "~/lib/string-manipulation";

type Props = {
  website: WebsiteResponse;
  onUpdate: () => void;
};

export function UpdateCustomizationForm(props: Props) {
  const emptyRequest = {
    websiteId: props.website.websiteId,
    primaryColor: props.website.customization?.primaryColor || "",
  } as UpdateCustomizationRequest;

  const [request, setRequest] = createStore(_.clone(emptyRequest));

  const [errors, setErrors] = createStore({ primaryColor: [] as string[] });

  function resetErrors() {
    setErrors({ primaryColor: [] });
  }

  function handleUpdate() {
    resetErrors();
    setRequest(_.clone(emptyRequest));
    props.onUpdate();
  }

  function handlePrimaryColorInput(primaryColor: string) {
    resetErrors();

    if (!isCssColor(primaryColor)) {
      setErrors("primaryColor", "not valid CSS color");
    } else {
      setRequest("primaryColor", primaryColor);
    }
  }

  async function handleUpdateCustomization(event: SubmitEvent) {
    event.preventDefault();
    try {
      await customizationService.updateCustomization(request);
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
          key={TKEYS.customization.labels["primary-color"]}
        />

        <Form
          onSubmit={handleUpdateCustomization}
          actions={
            <MdButton submit onClick={handleUpdateCustomization}>
              <Trans key={TKEYS.form.action.Update} />
            </MdButton>
          }
        >
          <ColorInput
            value={() => request.primaryColor}
            onValue={handlePrimaryColorInput}
          />
          <MdTextField
            type="text"
            value={request.primaryColor}
            onValue={handlePrimaryColorInput}
            error={!_.isEmpty(errors.primaryColor)}
            errorText={errors.primaryColor}
          />
        </Form>
      </div>
    </>
  );
}
