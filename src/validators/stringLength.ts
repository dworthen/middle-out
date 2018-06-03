/**
 * @module Validators
 */

import { registerValidator, ValidatorConfig } from "../Validation";
import { checkTargetAndProperty } from "../Utils";

export const stringLength: (
  config?: { min?: number; max?: number } & ValidatorConfig | undefined
) => (
  target: { [key: string]: any },
  property: string
) => void = registerValidator<{ min?: number; max?: number }>(
  "StringLength",
  (target, property, config = { min: 0, max: Infinity }) => {
    checkTargetAndProperty(target, property);

    if (target[property] === undefined || target[property] === null) {
      return true;
    }

    if (typeof target[property] !== "string") {
      throw new TypeError(
        `StringLength expecting to work with type string but received ${typeof target[
          property
        ]}.`
      );
    }

    let { min, max } = Object.assign({ min: 0, max: Infinity }, config);

    if (typeof min !== "number") {
      throw new TypeError(
        `Invalid argument 'config.min'. Expecting number but recieved ${min}`
      );
    }

    if (typeof max !== "number") {
      throw new TypeError(
        `Invalid argument 'config.max'. Expecting number but recieved ${max}`
      );
    }

    return target[property].length >= min && target[property].length <= max;
  }
);
