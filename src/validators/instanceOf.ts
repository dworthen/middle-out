/**
 * @module Validators
 */

import { checkTargetAndProperty } from "../Utils";
import { registerValidator, ValidatorConfig } from "../Validation";

export interface instanceOfOptions extends ValidatorConfig {
  constor: any;
}

const _instanceOf = registerValidator<instanceOfOptions>(
  "instanceOf",
  (target, property, config) => {
    checkTargetAndProperty(target, property);

    if (target[property] === undefined || target[property] === null) {
      return true;
    }

    if (
      config === undefined ||
      config === null ||
      config.constor === undefined ||
      config.constor === null
    ) {
      throw new TypeError(
        `Invalid argument 'config'. Expecting {constor: any} but received ${config}.`
      );
    }

    return target[property] instanceof config.constor;
  }
);

export function instanceOf(config?: instanceOfOptions) {
  return _instanceOf(config);
}
