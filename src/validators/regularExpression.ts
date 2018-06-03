/**
 * @module Validators
 */

import { checkTargetAndProperty } from "../Utils";
import { registerValidator, ValidatorConfig } from "../Validation";

export interface regularExpressionOptions extends ValidatorConfig {
  regex: RegExp;
}

const _regulareExpression = registerValidator<regularExpressionOptions>(
  "regularExpression",
  (target, property, config) => {
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
  }
);

export function regularExpression(config?: regularExpressionOptions) {
  return _regulareExpression(config);
}
