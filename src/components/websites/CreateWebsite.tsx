import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { createStore } from "solid-js/store";

import { Section } from "~/components/layout/Section";
import { SectionTitle } from "~/components/layout/SectionTitle";
import { TKEYS } from "~/locales";
import { CreateWebsiteRequest } from "~/services/sited_io/websites/v1/website_pb";
import { websiteService } from "~/services/website";
import { Form } from "../form/Form";
import { MdButton } from "../form/MdButton";
import { MdTextField } from "../form/MdTextField";
import { useWebsiteContext } from "~/contexts/WebsiteContext";

export function CreateWebsite() {
  const [trans] = useTransContext();

  const { refetchWebsites, setSelectedWebsite } = useWebsiteContext();

  const emptyRequest = {
    name: "",
  } as CreateWebsiteRequest;

  const [request, setRequest] = createStore(_.clone(emptyRequest));

  const [, setErrors] = createStore({
    name: [] as string[],
  });

  function resetErrors() {
    setErrors({ name: [] });
  }

  function handleNameInput(name: string) {
    resetErrors();
    setRequest("name", name);
  }

  async function handleCreateWebsite() {
    try {
      const createdWebsite = await websiteService.createWebsite(request);
      refetchWebsites();
      setSelectedWebsite(createdWebsite);
    } catch (err: any) {
      console.error(err);
      setErrors("name", err?.rawMessage);
    }
  }

  return (
    <>
      <Section centered>
        <SectionTitle title={trans(TKEYS.websites["no-website-information"])} />

        <Form onSubmit={handleCreateWebsite} style={{ "max-width": "300px" }}>
          <MdTextField
            style={{ width: "100%" }}
            type="text"
            required
            value={request.name}
            label={trans(TKEYS.websites.labels.name)}
            onValue={handleNameInput}
            // error={!_.isEmpty(errors.name)}
            // errorText={errors.name}
          />

          <MdButton onClick={handleCreateWebsite}>
            <Trans key={TKEYS.form.action.Create} />
          </MdButton>
        </Form>
      </Section>
    </>
  );
}
