import grapesjs, { Editor } from "grapesjs";
import _ from "lodash";
import { createSignal, onMount, Show } from "solid-js";
import { PageResponse } from "~/services/sited_io/websites/v1/page_pb";

type Props = {
  page: PageResponse;
  class?: string;
};

export function PreviewStaticPage(props: Props) {
  const [editor, setEditor] = createSignal<Editor>();

  onMount(async () => {
    const storedProjectData = localStorage.getItem("gjsProject");
    if (!_.isNil(storedProjectData)) {
      const projectData = JSON.parse(storedProjectData);
      const e = grapesjs.init({ headless: true });
      e.loadProjectData(projectData);
      setEditor(e);
    }
  });

  return (
    <div class={props.class}>
      <Show when={!_.isNil(editor())}>
        <style>{editor()!.getCss()}</style>
        <script>{editor()!.getJs()}</script>
        <div innerHTML={editor()!.getHtml()}></div>
      </Show>
    </div>
  );
}
