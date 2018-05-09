import { registerValidator } from '../Validation';
import { checkTargetAndProperty } from '../Utils';

export const Required = registerValidator("Required", (target, property) => { 
    checkTargetAndProperty(target, property);

    return target[property] !== null && target[property] !== undefined;
 });