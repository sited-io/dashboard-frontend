import { Trans } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { createStore } from "solid-js/store";
import { TKEYS } from "~/locales";
import { UpdateCustomizationRequest } from "~/services/sited_io/websites/v1/customization_pb";
import { WebsiteResponse } from "~/services/sited_io/websites/v1/website_pb";
import { customizationService } from "~/services/website";
import { Font } from "../content/Font";
import { ColorInput } from "../form/ColorInput";
import { Form } from "../form/Form";
import { MdButton } from "../form/MdButton";

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
    setRequest("primaryColor", primaryColor);
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
      <Font type="label" key={TKEYS.customization.labels["primary-color"]} />
      <Form onSubmit={handleUpdateCustomization}>
        <ColorInput
          value={request.primaryColor}
          onValue={handlePrimaryColorInput}
        />

        <MdButton submit onClick={handleUpdateCustomization}>
          <Trans key={TKEYS.form.action.Update} />
        </MdButton>
      </Form>
    </>
  );
}
