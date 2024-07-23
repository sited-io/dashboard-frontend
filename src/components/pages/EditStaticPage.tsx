import grapesjs, { Editor } from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import { onMount } from "solid-js";

import "./EditStaitcPage.scss";
import { Page } from "~/layout/Page";
import { useNavigate } from "@solidjs/router";
import { pagesPath } from "~/routes/pages/(pages)";
import { MdIcon } from "../assets/MdIcon";
import { useTransContext } from "@mbarzda/solid-i18next";
import { TKEYS } from "~/locales";

type Props = {};

export function EditStaticPage(props: Props) {
  const navigate = useNavigate();

  const [trans] = useTransContext();

  let editor: Editor;

  onMount(() => {
    editor = grapesjs.init({
      container: "#gjs",
      fromElement: true,
      mediaCondition: "min-width",
      panels: {
        defaults: [
          {
            id: "basic-actions",
            el: ".panel__basic-actions",
            buttons: [
              {
                id: "navigate-back-to-pages",
                label: trans(TKEYS.navigation.back),
                command() {
                  navigate(pagesPath());
                },
              },
              {
                id: "save-page",
                label: trans(TKEYS.form.action.Save),
                command() {
                  handleSavePage();
                },
              },
            ],
          },
          {
            id: "panel-switcher",
            el: ".panel__switcher",
            buttons: [
              {
                id: "show-layers",
                active: true,
                label: "Layers",
                command: "show-layers",
                togglable: false,
              },
              {
                id: "show-style",
                active: true,
                label: "Styles",
                command: "show-styles",
                togglable: false,
              },
              {
                id: "show-traits",
                active: true,
                label: "Traits",
                command: "show-traits",
                togglable: false,
              },
            ] as any,
          },
          {
            id: "panel-devices",
            el: ".panel__devices",
            buttons: [
              {
                id: "device-mobile",
                label: "M",
                command: "set-device-mobile",
                active: true,
                togglable: false,
              },
              {
                id: "device-desktop",
                label: "D",
                command: "set-device-desktop",
                togglable: false,
              },
            ],
          },
          {
            id: "layers",
            el: ".panel__configurations",
            // Make the panel resizable
            resizable: {
              maxDim: 350,
              minDim: 200,
              tc: false, // Top handler
              cl: true, // Left handler
              cr: false, // Right handler
              bc: false, // Bottom handler
              // Being a flex child we need to change `flex-basis` property
              // instead of the `width` (default)
              keyWidth: "flex-basis",
            },
          },
        ],
      },
      layerManager: {
        appendTo: ".layers-container",
      },
      blockManager: {
        appendTo: "#blocks",
        blocks: [
          {
            id: "section", // id is mandatory
            label: "<b>Section</b>", // You can use HTML/SVG inside labels
            attributes: { class: "gjs-block-section" },
            content: `<section>
              <h1>This is a simple title</h1>
              <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
            </section>`,
          },
          {
            id: "text",
            label: "Text",
            content: '<div data-gjs-type="text">Insert your text here</div>',
          },
          {
            id: "image",
            label: "Image",
            // Select the component once it's dropped
            select: true,
            // You can pass components as a JSON instead of a simple HTML string,
            // in this case we also use a defined component type `image`
            content: { type: "image", style: { display: "block" } },
            // This triggers `active` event on dropped components and the `image`
            // reacts by opening the AssetManager
            activate: true,
          },
        ],
      },
      selectorManager: {
        appendTo: ".styles-container",
      },
      styleManager: {
        appendTo: ".styles-container",
        sectors: [
          {
            name: "Dimension",
            open: false,
            // Use built-in properties
            buildProps: ["display", "width", "min-height", "margin", "padding"],
            // Use `properties` to define/override single property
            properties: [
              {
                // Type of the input,
                // options: integer | radio | select | color | slider | file | composite | stack
                type: "integer",
                name: "The width", // Label for the property
                property: "width", // CSS property (if buildProps contains it will be extended)
                units: ["px", "%"], // Units, available only for 'integer' types
                defaults: "auto", // Default value
                min: 0, // Min value, available only for 'integer' types
              },
            ],
          },
          {
            name: "Extra",
            open: false,
            buildProps: [
              "color",
              "background-color",
              "box-shadow",
              "font-size",
              "font-weight",
              "text-align",
            ],
            properties: [],
          },
        ],
      },
      traitManager: {
        appendTo: ".traits-container",
      },
      deviceManager: {
        devices: [
          {
            name: "Mobile",
            width: "360px",
            widthMedia: "",
          },
          {
            name: "Desktop",
            width: "",
            widthMedia: "1024",
          },
        ],
      },
      storageManager: {
        type: "local", // Type of the storage, available: 'local' | 'remote'
        autosave: true, // Store data automatically
        autoload: true, // Autoload stored data on init
        stepsBeforeSave: 1, // If autosave enabled, indicates how many changes are necessary before store method is triggered
        options: {
          local: {
            // Options for the `local` type
            key: "gjsProject", // The key for the local storage
          },
        },
      },
    });

    editor.setDevice("Mobile");

    editor.Panels.addPanel({
      id: "panel-top",
      el: ".panel__top",
    });

    // Define commands
    editor.Commands.add("show-layers", {
      getRowEl(editor: any) {
        return editor.getContainer().closest(".editor-row");
      },
      getLayersEl(row: any) {
        return row.querySelector(".layers-container");
      },

      run(editor, sender) {
        const lmEl = this.getLayersEl(this.getRowEl(editor));
        lmEl.style.display = "";
      },
      stop(editor, sender) {
        const lmEl = this.getLayersEl(this.getRowEl(editor));
        lmEl.style.display = "none";
      },
    });
    editor.Commands.add("show-styles", {
      getRowEl(editor: any) {
        return editor.getContainer().closest(".editor-row");
      },
      getStyleEl(row: any) {
        return row.querySelector(".styles-container");
      },

      run(editor, sender) {
        const smEl = this.getStyleEl(this.getRowEl(editor));
        smEl.style.display = "";
      },
      stop(editor, sender) {
        const smEl = this.getStyleEl(this.getRowEl(editor));
        smEl.style.display = "none";
      },
    });
    editor.Commands.add("show-traits", {
      getTraitsEl(editor: any) {
        const row = editor.getContainer().closest(".editor-row");
        return row.querySelector(".traits-container");
      },
      run(editor, sender) {
        this.getTraitsEl(editor).style.display = "";
      },
      stop(editor, sender) {
        this.getTraitsEl(editor).style.display = "none";
      },
    });
    editor.Commands.add("set-device-desktop", {
      run: (editor) => editor.setDevice("Desktop"),
    });
    editor.Commands.add("set-device-mobile", {
      run: (editor) => editor.setDevice("Mobile"),
    });
  });

  async function handleSavePage() {
    const projectData = editor.getProjectData();
    console.log(projectData);
  }

  return (
    <>
      <div class="panel__top">
        <div class="panel__basic-actions"></div>
        <div class="panel__devices"></div>
        <div class="panel__switcher"></div>
      </div>

      <div id="blocks"></div>

      <div class="editor-row">
        <div class="editor-canvas">
          <div id="gjs">
            <h1>Hello World</h1>
          </div>
        </div>

        <div class="panel__configurations">
          <div class="layers-container"></div>
          <div class="styles-container"></div>
          <div class="traits-container"></div>
        </div>
      </div>
    </>
  );
}
