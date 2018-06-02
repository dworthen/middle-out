/**
 * @module Validators
 */

import { checkTargetAndProperty } from '../Utils';
import { registerValidator, ValidatorConfig } from '../Validation';

export const typeOf:
    (config?: { dataType: string } & ValidatorConfig | undefined) =>
        (target: { [key: string]: any }, property: string, config?: { dataType: string } & ValidatorConfig | undefined) =>
            void =
    registerValidator<{ dataType: string }>("typeOf", (target, property, config) => {
        checkTargetAndProperty(target, property);
        
        if (target[property] === undefined || target[property] === null) {
            return true;
        }

        if (config === undefined || config === null || config.dataType === undefined || config.dataType === null || typeof config.dataType !== 'string') {
            throw new TypeError(`Invalid argument 'config'. Expecting {dataType: string} but received ${config}.`);
        }


        return typeof target[property] === config.dataType;
    });


