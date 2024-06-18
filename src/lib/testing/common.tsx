import { expect } from "vitest";

// import ElementInternalsPolyfill from "element-internals-polyfill";

// false && ElementInternalsPolyfill;

export const SEPARATOR =
  "\n--------------------------------------------------------------------------------\n";

export function errorPrint(message: string): string {
  return `${SEPARATOR}\t${message}${SEPARATOR}`;
}

export function expectNoError(err: any) {
  expect(err).toEqual("");
  unreachable!();
}

export function unreachable() {
  expect("UNREACHABLE reached").toBeUndefined();
}

// borrowed from https://github.com/pablo-abc/felte
export function createDOM(): void {
  const main = document.createElement("root");
  main.id = "root";
  document.body.appendChild(main);
}

// borrowed from https://github.com/pablo-abc/felte
export function cleanupDOM(): void {
  removeAllChildNodes(document.body);
}

// borrowed from https://github.com/pablo-abc/felte
export function removeAllChildNodes(parent: Node): void {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

export const noObj = {} as any;
export function getNoObj() {
  return noObj;
}
export function noOp() {}

export async function asyncNoOp() {}
