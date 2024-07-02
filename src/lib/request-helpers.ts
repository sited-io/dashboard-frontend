import _ from "lodash";

export function getEnumVariants(e: object): number[] {
  return Object.values(e).filter((v) => _.isNumber(v) && v > 0);
}
