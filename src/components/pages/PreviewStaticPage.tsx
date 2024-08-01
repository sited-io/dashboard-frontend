import _ from "lodash";
import { createSignal, onMount, Show } from "solid-js";
import { PageResponse } from "~/services/sited_io/websites/v1/page_pb";

type Props = {
  page: PageResponse;
  class?: string;
};

export function PreviewStaticPage(props: Props) {
  const [html, setHtml] = createSignal("");
  const [css, setCss] = createSignal("");

  onMount(async () => {
    const html = localStorage?.getItem("static_content_html");
    if (html) {
      setHtml(html);
    }
    const css = localStorage?.getItem("static_content_css");
    if (css) {
      setCss(css);
    }
  });

  return (
    <div class={props.class}>
      <Show when={!_.isNil(css()) && !_.isEmpty(css())}>
        <style>{css()}</style>
      </Show>
      <Show when={!_.isNil(html()) && !_.isEmpty(html())}>
        <div innerHTML={html()}></div>
      </Show>
    </div>
  );
}
