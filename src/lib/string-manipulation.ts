import _ from "lodash";

// import { SLUG_CHARS_REGEX } from "../services";

const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

export function encodeArrayBufferToBase64Url(arrayBuffer: ArrayBuffer): string {
  const bytes = new Uint8Array(arrayBuffer);
  const len = bytes.length;
  let base64 = "";

  for (let i = 0; i < len; i += 3) {
    base64 += chars[bytes[i] >> 2];
    base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
    base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
    base64 += chars[bytes[i + 2] & 63];
  }

  if (len % 3 === 2) {
    base64 = base64.substring(0, base64.length - 1);
  } else if (len % 3 === 1) {
    base64 = base64.substring(0, base64.length - 2);
  }

  return base64;
}

export function base64ToUtf8(base64: string): string {
  const binString = atob(base64);
  const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0)!);
  return new TextDecoder().decode(bytes);
}

export function utf8ToBase64(utf8: string): string {
  const bytes = new TextEncoder().encode(utf8);
  const binString = Array.from(bytes, (x) => String.fromCodePoint(x)).join("");
  return btoa(binString);
}

export function parseJwtPayload(token: string) {
  "use server";
  const jsonPayload = Buffer.from(token.split(".")[1], "base64url").toString();
  return JSON.parse(jsonPayload);
}

export function getInitials(num: number, value?: string | null): string {
  if (_.isNil(value) || _.isEmpty(value)) {
    return "";
  }

  const parts = value.split(" ");
  const numberOfPossibleInitials = _.min([parts.length, num]) || 1;

  let initials = "";

  for (let i = 0; i < numberOfPossibleInitials; i++) {
    initials += parts[i][0].toUpperCase();
  }

  return initials;
}

export async function hashCodeVerifier(codeChallenge: string): Promise<string> {
  const plaintextBuffer = new TextEncoder().encode(codeChallenge);
  const hashBuffer = await crypto.subtle.digest("SHA-256", plaintextBuffer);

  return encodeArrayBufferToBase64Url(hashBuffer);
}

export function addHtmlLinebreaks(text?: string): string {
  if (_.isNil(text)) {
    return "";
  }
  return text.replace("\n", "\\");
}

export async function readAsUint8Array(
  file: File,
  start: number,
  end: number
): Promise<Uint8Array> {
  const fileChunk = file.slice(start, end);

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function () {
      if (_.isArrayBuffer(reader.result)) {
        resolve(new Uint8Array(reader.result));
      } else {
        reject("Expected ArrayBuffer got string or null");
      }
    };

    reader.onerror = function (err) {
      reject(err);
    };

    reader.readAsArrayBuffer(fileChunk);
  });
}

export function centsToDecimal(cents: number, decimalPoint: string): string {
  let maybeFloat = (cents / 100).toString();

  if (!maybeFloat.includes(".")) {
    maybeFloat += ".00";
  }

  if (maybeFloat.split(".")[1].length === 1) {
    maybeFloat += "0";
  }

  return maybeFloat.replace(".", decimalPoint);
}

// export function slugify(value: string): string {
//   let res = _.deburr(value);
//   res = res.replaceAll(" ", "-");
//   res = res.replace(SLUG_CHARS_REGEX, "-");
//   return _.trim(res, " -");
// }

export function isCssColor(value: any): boolean {
  return !_.isNil(value) && !_.isEmpty(value) && CSS.supports("color", value);
}

// Stolen from: https://www.regextester.com/103452
export function isValidHostname(value: string): boolean {
  return /(?=^.{4,253}$)(^((?!-)[a-zA-Z0-9-]{0,62}[a-zA-Z0-9]\.)+[a-zA-Z]{2,63}$)/.test(
    value
  );
}

// Stolen from: https://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable-string
export function humanFileSize(bytes: number, dp = 1) {
  const thresh = 1000;

  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }

  const units = ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );

  return bytes.toFixed(dp) + " " + units[u];
}
