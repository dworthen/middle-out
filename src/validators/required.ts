/**
 * @module Validators
 */

import { registerValidator, ValidatorConfig } from '../Validation';
import { checkTargetAndProperty } from '../Utils';

export const required:
    (config?: ValidatorConfig | undefined) =>
        (target: { [key: string]: any }, property: string) => void =
    registerValidator("required", (target, property) => {
        checkTargetAndProperty(target, property);

        return target[property] !== null && target[property] !== undefined;
    });