// @generated by protoc-gen-es v1.10.0 with parameter "target=ts"
// @generated from file sited_io/ordering/v1/ordering.proto (package sited_io.ordering.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { proto3 } from "@bufbuild/protobuf";

/**
 * @generated from enum sited_io.ordering.v1.Direction
 */
export enum Direction {
  /**
   * @generated from enum value: DIRECTION_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: DIRECTION_ASC = 1;
   */
  ASC = 1,

  /**
   * @generated from enum value: DIRECTION_DESC = 2;
   */
  DESC = 2,
}
// Retrieve enum metadata with: proto3.getEnumType(Direction)
proto3.util.setEnumType(Direction, "sited_io.ordering.v1.Direction", [
  { no: 0, name: "DIRECTION_UNSPECIFIED" },
  { no: 1, name: "DIRECTION_ASC" },
  { no: 2, name: "DIRECTION_DESC" },
]);

