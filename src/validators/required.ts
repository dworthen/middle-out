/**
 * @module Validators
 */

import { registerValidator, ValidatorConfig } from "../Validation";
import { checkTargetAndProperty } from "../Utils";

const _required = registerValidator("required", (target, property) => {
  checkTargetAndProperty(target, property);

  return target[property] !== null && target[property] !== undefined;
});

export function required(config?: ValidatorConfig) {
  return _required(config);
}
