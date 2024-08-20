import { PlainMessage } from "@bufbuild/protobuf";
import EditorJS, { OutputBlockData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import { Trans } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { ComponentProps, onMount, splitProps } from "solid-js";

import { TKEYS } from "~/locales";
import {
  Component,
  InlineElement,
  StaticPageResponse,
} from "~/services/sited_io/websites/v1/static_page_pb";

type Props = {
  readonly staticPage: StaticPageResponse | undefined;
  readonly onSave: (components: PlainMessage<Component>[]) => void;
} & ComponentProps<"div">;

export default function StaticPageEditor(props: Props) {
  const [local, others] = splitProps(props, ["staticPage"]);

  let editor: EditorJS | undefined;

  onMount(() => {
    const blocks = local.staticPage?.components.map(getBlockFromComponent);
    editor = new EditorJS({
      holder: "editorjs",
      inlineToolbar: ["link"],
      tools: {
        header: Header,
      },
      data: {
        blocks: blocks || [],
      },
    });
  });

  async function handleSave() {
    if (_.isNil(editor)) {
      console.error("editor was undefined");
      return;
    }

    const data = await editor.save();
    const components: PlainMessage<Component>[] = [];

    for (const block of data.blocks) {
      const component = getComponentFromBlock(block);
      components.push(component);
    }

    props.onSave(components);
  }

  return (
    <>
      <div {...others} id="editorjs"></div>

      <nav class="flex justify-between items-center w-full py-2 bg-gray-200 sticky">
        <div></div>

        <div class="mr-3">
          <button
            class="flex justify-center items-center h-9 py-1 px-4 rounded bg-blue-300 hover:bg-blue-400 text-gray-800"
            onClick={handleSave}
          >
            <Trans key={TKEYS.form.action.Save} />
          </button>
        </div>
      </nav>
    </>
  );
}

function getComponentFromBlock(
  block: OutputBlockData<string, any>
): PlainMessage<Component> {
  switch (block.type) {
    case "header":
      return getComponentFromHeader(block.data.level, block.data.text);
    case "paragraph":
      return getComponentFromParagraph(block.data.text);

    default:
      const err = `Unknown block type ${block.type}`;
      throw new Error(err);
  }
}

function getComponentFromHeader(
  level: number,
  content: string
): PlainMessage<Component> {
  return {
    componentType: {
      inner: {
        case: "header",
        value: {
          level,
          content,
        },
      },
    },
  } as Component;
}

function getComponentFromParagraph(text: string): PlainMessage<Component> {
  const content = getParagraphContentFromHtml(text);
  return {
    componentType: {
      inner: {
        case: "paragraph",
        value: {
          content,
        },
      },
    },
  } as Component;
}

function getParagraphContentFromHtml(text: string): InlineElement[] {
  const elements: InlineElement[] = [];
  const nodeList = new DOMParser().parseFromString(text, "text/html").body
    .childNodes;
  for (const node of nodeList) {
    switch (node.nodeName) {
      case "#text":
        elements.push({
          elementType: {
            case: "text",
            value: {
              text: node.textContent || "",
            },
          },
        } as InlineElement);
        break;

      case "A":
        elements.push({
          elementType: {
            case: "link",
            value: {
              url: (node as HTMLAnchorElement).href,
              text: node.textContent || "",
            },
          },
        } as InlineElement);
        break;

      default:
        const err = `Cannot handle HTML nodeName ${node.nodeName}`;
        throw new Error(err);
    }
  }

  return elements;
}

function getBlockFromComponent(component: Component): OutputBlockData {
  switch (component.componentType?.inner.case) {
    case "header":
      return {
        type: "header",
        data: {
          level: component.componentType.inner.value.level,
          text: component.componentType.inner.value.content,
        },
      };
    case "paragraph":
      return {
        type: "paragraph",
        data: {
          text: component.componentType.inner.value.content
            .map(getParagraphHtmlFromInlineElement)
            .join(""),
        },
      };
    default:
      const err = `Cannot convert componoent ${component.componentType?.inner.case} to block`;
      throw new Error(err);
  }
}

function getParagraphHtmlFromInlineElement(
  inlineElement: InlineElement
): string {
  switch (inlineElement.elementType.case) {
    case "text":
      return inlineElement.elementType.value.text;
    case "link":
      return `<a href=${inlineElement.elementType.value.url}>${inlineElement.elementType.value.text}</a>`;
    default:
      const err = `Cannot convert inlineElement ${inlineElement.elementType.case} to text`;
      throw new Error(err);
  }
}

