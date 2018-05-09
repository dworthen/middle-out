


export const checkTargetAndProperty: (target: {[key:string]: any}, property: string) => void = 
(target, property) => {
    if(target === undefined || target === null || typeof target !== 'object') {
        throw new TypeError(`Invalid argument 'target'. Expecting object but received ${target}.`);
    }
 
    if(property === undefined || property === null || typeof property !== 'string') {
        throw new TypeError(`Invalid argument property. Expecting string but received ${property}.`);
    }
}