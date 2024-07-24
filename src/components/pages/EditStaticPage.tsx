import { useTransContext } from "@mbarzda/solid-i18next";
import { useNavigate } from "@solidjs/router";
import grapesjs, { Editor } from "grapesjs";
import { onMount } from "solid-js";
// import grapesjsTailwind from "grapesjs-tailwind";

import { TKEYS } from "~/locales";
import { pagesPath } from "~/routes/pages/(pages)";
import "./EditStaitcPage.scss";

type Props = {};

function customComponents(editor: Editor) {
  editor.DomComponents.addType("section", {
    isComponent: (el: HTMLElement) => el.tagName === "SECTION",
    model: {
      defaults: {
        tagName: "section",
      },
    },
  });
}

export function EditStaticPage(props: Props) {
  const navigate = useNavigate();

  const [trans] = useTransContext();

  let editor: Editor;

  onMount(() => {
    editor = grapesjs.init({
      container: "#gjs",
      fromElement: true,
      height: "none",
      mediaCondition: "min-width",
      plugins: [customComponents],
      panels: {
        defaults: [
          {
            id: "panel-top",
            el: "#panelTop",
          },
          {
            id: "panel-devices",
            el: "#panel_devices",
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
            id: "panel-switcher",
            el: "#panel_switcher",
            buttons: [
              {
                id: "show-layers",
                label: "Layers",
                command: "show-layers",
                togglable: false,
                active: true,
              },
              {
                id: "show-style",
                label: "Styles",
                command: "show-styles",
                togglable: false,
              },
              {
                id: "show-traits",
                label: "Traits",
                command: "show-traits",
                togglable: false,
              },
            ] as any,
          },
          {
            id: "layers",
            el: "#panelConfigurations",
            // Make the panel resizable
            resizable: {
              minDim: 50,
              tc: true, // Top handler
              cl: false, // Left handler
              cr: false, // Right handler
              bc: false, // Bottom handler
              keyWidth: "min-height",
              keyHeight: "min-height",
            },
          },
          {
            id: "panel-bottom",
            el: "#panelBottom",
          },
          {
            id: "panel-actions",
            el: "#panelActions",
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
        ],
      },
      layerManager: {
        appendTo: "#layersContainer",
      },
      blockManager: {
        appendTo: "#blocks",
        blocks: [
          {
            id: "section", // id is mandatory
            label: "<b>Section</b>", // You can use HTML/SVG inside labels
            attributes: { style: "min-height: 20px;" },
            content: {
              type: "section",
              style: { "min-height": "20px" },
            },
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
        appendTo: "#stylesContainer",
      },
      styleManager: {
        appendTo: "#stylesContainer",
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
        appendTo: "#traitsContainer",
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

    // Define commands
    editor.Commands.add("show-layers", {
      getLayersEl(): HTMLElement | null | undefined {
        return document.getElementById("layersContainer");
      },
      run(editor, sender) {
        const lmEl = this.getLayersEl();
        if (lmEl?.style) {
          lmEl.style.display = "";
        }
      },
      stop(editor, sender) {
        const lmEl = this.getLayersEl();
        if (lmEl?.style) {
          lmEl.style.display = "none";
        }
      },
    });

    editor.Commands.add("show-styles", {
      getStyleEl(): HTMLElement | null | undefined {
        return document.getElementById("stylesContainer");
      },
      run(editor, sender) {
        const smEl = this.getStyleEl();
        if (smEl?.style) {
          smEl.style.display = "";
        }
      },
      stop(editor, sender) {
        const smEl = this.getStyleEl();
        if (smEl?.style) {
          smEl.style.display = "none";
        }
      },
    });

    editor.Commands.add("show-traits", {
      getTraitsEl(): HTMLElement | null | undefined {
        return document.getElementById("traitsContainer");
      },
      run(editor, sender) {
        const el = this.getTraitsEl();
        if (el?.style) {
          el.style.display = "";
        }
      },
      stop(editor, sender) {
        const el = this.getTraitsEl();
        if (el?.style) {
          el.style.display = "none";
        }
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
      <div class="h-screen flex flex-col">
        <div
          id="panelTop"
          class="static p-0 w-full flex initial justify-between"
        >
          {/* <div id="panel_basicActions" class="static"></div> */}
          <div id="panel_devices" class="static"></div>
          <div id="panel_switcher" class="static"></div>
        </div>

        <div id="blocks" class="static"></div>

        <div id="gjs" class="flex-auto">
          <section style={{ padding: "0 8px" }}>
            <h1 style={{ "text-align": "center" }}>Title</h1>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
              aliquam.
            </p>

            <h2>Subtitle</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum,
              laboriosam. Fugiat neque rerum officia maiores, tempora asperiores
              voluptate incidunt nobis.
            </p>
          </section>
        </div>

        <div id="panelConfigurations" class="relative w-full min-h-52">
          <div id="layersContainer" style={{ display: "none" }}></div>
          <div id="stylesContainer" style={{ display: "none" }}></div>
          <div id="traitsContainer" style={{ display: "none" }}></div>
        </div>

        <div id="panelBottom" class="static w-full">
          <div id="panelActions" class="static w-full"></div>
        </div>
      </div>
    </>
  );
}
