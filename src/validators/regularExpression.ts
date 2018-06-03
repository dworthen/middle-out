/**
 * @module Validators
 */

import { checkTargetAndProperty } from "../Utils";
import { registerValidator, ValidatorConfig } from "../Validation";

export const regularExpression: (
  config?:
    | {
        regex: RegExp;
      } & ValidatorConfig
    | undefined
) => (
  target: { [key: string]: any },
  property: string,
  config?: { dataType: string } & ValidatorConfig | undefined
) => void = registerValidator<{
  regex: RegExp;
}>("regularExpression", (target, property, config) => {
  checkTargetAndProperty(target, property);

  let value = target[property];

  if (value === undefined || value === null) {
    return true;
  }

  if (typeof value !== "string") {
    throw new TypeError(
      `regularExpression expecting to work with type string but received ${typeof value}.`
    );
  }

  let { regex } = config || { regex: undefined };

  if (!(regex instanceof RegExp)) {
    throw new TypeError(
      `Invalid argument config.regex. Expecting string but received ${typeof regex}`
    );
  }

  return regex.test(value);
});
