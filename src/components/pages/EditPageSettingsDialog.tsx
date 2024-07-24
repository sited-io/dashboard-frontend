import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { createEffect } from "solid-js";
import { createStore } from "solid-js/store";

import { Font } from "~/components/content/Font";
import { Form } from "~/components/form/Form";
import { MdButton } from "~/components/form/MdButton";
import { MdCheckbox } from "~/components/form/MdCheckbox";
import { MdSelect } from "~/components/form/MdSelect";
import { MdTextField } from "~/components/form/MdTextField";
import { MdDialog } from "~/components/layout/MdDialog";
import { TKEYS } from "~/locales";
import {
  PageResponse,
  PageType,
  UpdatePageRequest,
} from "~/services/sited_io/websites/v1/page_pb";
import { pageService } from "~/services/website";

type Props = {
  readonly show: boolean;
  readonly page: PageResponse | undefined;
  readonly onClose: () => void;
  readonly onUpdate: () => void;
};

export function EditPageSettingsDialog(props: Props) {
  const [trans] = useTransContext();

  const emptyRequest = {} as UpdatePageRequest;

  const [request, setRequest] = createStore(_.clone(emptyRequest));

  const [errors, setErrors] = createStore({
    title: [] as string[],
  });

  createEffect(() => {
    if (!_.isNil(props.page)) {
      setRequest(new UpdatePageRequest(props.page));
    }
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

  async function handleEditSettings() {
    try {
      await pageService.updatePage(_.toPlainObject(request));
      handleUpdate();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <MdDialog open={props.show} onClose={handleClose}>
        <div slot="headline">
          <Font type="title" key={TKEYS.page["edit-page-settings"]} />
        </div>

        <div slot="content">
          <Form onSubmit={handleEditSettings}>
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
              checked={request.isHomePage}
              onValue={handleIsHomePageInput}
            />
          </Form>
        </div>

        <div slot="actions">
          <MdButton onClick={handleClose} type="text">
            <Trans key={TKEYS.form.action.Close} />
          </MdButton>
          <MdButton submit onClick={handleEditSettings}>
            <Trans key={TKEYS.form.action.Save} />
          </MdButton>
        </div>
      </MdDialog>
    </>
  );
}
