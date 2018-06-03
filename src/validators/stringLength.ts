/**
 * @module Validators
 */

import { registerValidator, ValidatorConfig } from "../Validation";
import { checkTargetAndProperty } from "../Utils";

export interface stringLengthOptions extends ValidatorConfig {
  min?: number;
  max?: number;
}

const _stringLength = registerValidator<stringLengthOptions>(
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

export function stringLength(config?: stringLengthOptions) {
  return _stringLength(config);
}
