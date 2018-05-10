import { registerValidator, ValidatorConfig } from '../Validation';
import { checkTargetAndProperty } from '../Utils';

export const Required: (config?: ValidatorConfig | undefined) => (target: {[key:string]: any}, property: string) => void = 
registerValidator("Required", (target, property) => { 
    checkTargetAndProperty(target, property);

    return target[property] !== null && target[property] !== undefined;
 });