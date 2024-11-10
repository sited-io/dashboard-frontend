import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { createStore } from "solid-js/store";

import { TKEYS } from "~/locales";
import {
  CreatePageRequest,
  PageType,
} from "~/services/sited_io/websites/v1/page_pb";
import { WebsiteResponse } from "~/services/sited_io/websites/v1/website_pb";
import { pageService } from "~/services/website";
import { Font } from "../content/Font";
import { Form } from "../form/Form";
import { MdButton } from "../form/MdButton";
import { MdCheckbox } from "../form/MdCheckbox";
import { MdSelect } from "../form/MdSelect";
import { MdTextField } from "../form/MdTextField";
import { MdDialog } from "../layout/MdDialog";

type Props = {
  readonly show: boolean;
  readonly website: WebsiteResponse;
  readonly onClose: () => void;
  readonly onUpdate: () => void;
};

export function CreatePageDialog(props: Props) {
  const [trans] = useTransContext();

  const emptyRequest = {
    websiteId: props.website.websiteId,
    pageType: PageType.STATIC,
    title: "",
    isHomePage: false,
  } as CreatePageRequest;

  const [request, setRequest] = createStore(_.clone(emptyRequest));

  const [errors, setErrors] = createStore({
    title: [] as string[],
  });

  function pageTypeOptions() {
    return Object.values(PageType)
      .filter((p) => _.isNumber(p) && p > 0)
      .map((p) => ({
        key: p,
        name: trans(TKEYS.page["page-type"][p]),
      }));
  }

  function resetErrors() {
    setErrors({ title: [] });
  }

  function handleTitleInput(title: string) {
    resetErrors();
    setRequest("title", title);
  }

  function handlePageTypeSelect(pageType: string) {
    resetErrors();
    setRequest("pageType", _.toInteger(pageType));
  }

  function handleIsHomePageInput(checked: boolean) {
    resetErrors();
    setRequest("isHomePage", checked);
  }

  function handleClose() {
    setRequest(_.clone(emptyRequest));
    props.onClose();
  }

  function handleUpdate() {
    handleClose();
    props.onUpdate();
  }

  async function handleCreatePage() {
    try {
      await pageService.createPage(request);
      handleUpdate();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <MdDialog open={props.show} onClose={handleClose}>
        <div slot="headline">
          <Font type="title" key={TKEYS.page["create-page"]} />
        </div>

        <div slot="content">
          <Form onSubmit={handleCreatePage}>
            <MdTextField
              type="text"
              value={request.title}
              required
              label={trans(TKEYS.page.labels.title)}
              onValue={handleTitleInput}
              error={!_.isEmpty(errors.title)}
              errorText={errors.title}
            />

            <MdSelect
              type="outlined"
              label={trans(TKEYS.page.labels["page-type"])}
              options={pageTypeOptions}
              selected={() => request.pageType}
              onChange={handlePageTypeSelect}
            />

            <MdCheckbox
              label={trans(TKEYS.page.labels["is-home-page"])}
              onValue={handleIsHomePageInput}
            />
          </Form>
        </div>

        <div slot="actions">
          <MdButton onClick={handleClose} type="text">
            <Trans key={TKEYS.form.action.Close} />
          </MdButton>
          <MdButton submit onClick={handleCreatePage}>
            <Trans key={TKEYS.form.action.Create} />
          </MdButton>
        </div>
      </MdDialog>{" "}
    </>
  );
}
