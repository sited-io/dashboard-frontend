export type ComponentType =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "txt" // inline
  | "a" // inline
  | "ol"
  | "ul"
  | "li"
  | "img";

export type TextFormat = "none" | "strong" | "em" | "s" | "u";

export class PageContent {
  components: Component[];

  constructor(components: Component[]) {
    this.components = components;
  }
}

export abstract class Component {
  readonly componentType: ComponentType;

  constructor(componentType: ComponentType) {
    this.componentType = componentType;
  }
}

interface InlineComponent {
  getContent(): string;
}

abstract class TextComponent extends Component {
  content: InlineComponent[];

  constructor(componentType: ComponentType, content: InlineComponent[]) {
    super(componentType);
    this.content = content;
  }
}

export class H1 extends TextComponent {
  constructor(content: InlineComponent[]) {
    super("h1", content);
  }
}
export class H2 extends TextComponent {
  constructor(content: InlineComponent[]) {
    super("h2", content);
  }
}
export class H3 extends TextComponent {
  constructor(content: InlineComponent[]) {
    super("h3", content);
  }
}
export class H4 extends TextComponent {
  constructor(content: InlineComponent[]) {
    super("h4", content);
  }
}
export class H5 extends TextComponent {
  constructor(content: InlineComponent[]) {
    super("h5", content);
  }
}
export class H6 extends TextComponent {
  constructor(content: InlineComponent[]) {
    super("h6", content);
  }
}
export class P extends TextComponent {
  constructor(content: InlineComponent[]) {
    super("p", content);
  }
}

export class Txt extends Component implements InlineComponent {
  content: string;
  format: TextFormat;

  constructor(content: string, format: TextFormat) {
    super("txt");
    this.content = content;
    this.format = format;
  }

  getContent() {
    return this.content;
  }
}

export class A extends Component implements InlineComponent {
  displayText: string;
  href: string;

  constructor(displayText: string, href: string) {
    super("a");
    this.displayText = displayText;
    this.href = href;
  }

  getContent(): string {
    return this.displayText;
  }
}

abstract class ListComponent extends Component {
  items: Li[];

  constructor(componentType: "ol" | "ul", items: Li[]) {
    super(componentType);
    this.items = items;
  }
}
export class Ol extends ListComponent {
  constructor(items: Li[]) {
    super("ol", items);
  }
}
export class Ul extends ListComponent {
  constructor(items: Li[]) {
    super("ul", items);
  }
}
export class Li extends Component {
  content: TextComponent;

  constructor(content: TextComponent) {
    super("li");
    this.content = content;
  }
}

export class Img extends Component {
  src: string;

  constructor(src: string) {
    super("img");
    this.src = src;
  }
}
