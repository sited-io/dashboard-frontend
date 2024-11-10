import _ from "lodash";

export function secondsToLocaleDateTime(
  seconds?: number,
  locale?: string,
): string {
  return seconds ? new Date(seconds * 1000).toLocaleString(locale) : "";
}

export function secondsToLocaleDate(seconds?: number, locale?: string): string {
  if (seconds) {
    return new Date(seconds * 1000).toLocaleDateString(locale);
  } else {
    return "";
  }
}

export function toLocaleDate(timestamp: number | undefined, lang: string) {
  if (!_.isNil(timestamp)) {
    return secondsToLocaleDate(timestamp, lang);
  }
  return "";
}
