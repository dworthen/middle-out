import { getMetaData } from './Reflection';

const MiddleOutValidatorSymbol = Symbol("MiddleOutValidator");

export interface ErrorMessageData {
    [key: string]: any,
    displayName: string,
    property: string,
    target: any,
    value: any
};

export interface ValidationError {
    [key: string]: any,
    property: string,
    target: any,
    value: any,
    message: string
};

export interface ValidatorConfig {
    errorMessage?: string | ((obj: ErrorMessageData) => string);
};

export type PropertyValidator<T extends {[key: string]: any}> = ((target: {[key: string]: any}, property: string, config?: T) => boolean);

export type Validator = {
    (): boolean,
    config?: ValidatorConfig & {[key: string]: any}
};

export function registerValidator<T extends {[key:string]: any}>(name: string, validator: PropertyValidator<T>): (config?: T & ValidatorConfig) => (target: {[key: string]: any}, property: string) => void {
    if(name === undefined || name === null || typeof name !== 'string') {
        throw new TypeError(`Invalid argument 'name'. Expecting string but received ${name}.`);
    }

    if(validator === undefined || validator === null || typeof validator !== 'function') {
        throw new TypeError(`Invalid argument 'name'. Expecting function but received ${name}.`);
    }

    return (config) => {
        if(config !== undefined && (config === null || typeof config !== 'object')) {
            throw new TypeError(`Invalid argument 'config'. Expecting non-primitive type but received ${config}.`);
        }

        
        return (target, property) => {
            if(target === undefined || target === null || typeof target !== 'object') {
                throw new TypeError(`Invalid argument 'target'. Expecting non-primative type but received ${target}.`);
            }
            
            if(property === undefined || property === null || typeof property !== 'string') {
                throw new TypeError(`Invalid argument 'property'. Expecting string but received ${property}.`);
            }

            let fn: Validator = () => {
                return validator(target, property, config);
            };
            if (config) {
                fn.config = config;
            }

            target[MiddleOutValidatorSymbol] = target[MiddleOutValidatorSymbol] || {};
            target[MiddleOutValidatorSymbol][property] =
                (target[MiddleOutValidatorSymbol][property] || []).concat([
                    [name, fn]
                ]);
        }
    }
};

export function getValidators(target: {[key: string]: any}): {[key: string]: any};
export function getValidators(target: {[key: string]: any}, property: string): Array<[string, Validator]>;
export function getValidators(target: {[key: string]: any}, property: string, name: string): (Validator) | undefined;
export function getValidators(target: any, property?: string, name?: string): {[key: string]: any} | Array<[string, Validator ]> | (Validator) | undefined {
    if(target === undefined || target === null || typeof target !== 'object') {
        throw new TypeError(`Invalid argument 'target'. Expecting non-primative type but received ${target}.`);
    }

    if(property !== undefined && (property === null || typeof property !== 'string')) {
        throw new TypeError(`Invalid argument 'property'. Expecting string but received ${property}.`);
    }

    if(name !== undefined && typeof name !== 'string') {
        throw new TypeError(`Invalid argument 'name'. Expecting string but received ${name}.`);
    }

    let meta = target[MiddleOutValidatorSymbol] || {};
    
    if(property) {
        meta = meta[property] || [];
        if(name) {
            let [ , value] = meta.filter((v: any[]) => ((v[0] || '') === name))[0] || [undefined, undefined];
            return value;
        }
    }

    return meta;
};

export function validate(target: any): [boolean, {[key: string]: {[key: string]: ValidationError }}] {
    let errors = Object.keys(target[MiddleOutValidatorSymbol] || {}).reduce((acc: {[key: string]: {[key: string]: ValidationError }}, property) => {
        acc[property] = {};
        let validators: Array<[string, Validator]> = getValidators(target, property).reverse();
        for(let [name, fn] of validators) {
            if(!fn()) {
                let { errorMessage } = Object.assign({errorMessage: `Error. ${property} failed ${name} validation`}, fn.config || {});
                let displayName = getMetaData(target, property, 'displayName') || property;
                let error = typeof errorMessage === 'function'
                    ? errorMessage({displayName, property, target, value: target[property]})
                    : errorMessage;
                acc[property][name] = {
                    property,
                    target,
                    message: error,
                    value: target[property]
                };
            }
        }
        if(!Object.keys(acc[property]).length) {
            delete acc[property];
        }
        return acc;
    }, {});
    return [!Object.keys(errors).length, errors];
}

export function errorTemplate(strings: TemplateStringsArray, ...keys: string[]): ((reason: ErrorMessageData) => string) {
    return ((dict: ErrorMessageData) => {
        //var dict = values[values.length - 1] || {};
        let result = [strings[0]];
        keys.forEach(function (key, i) {
            let value = dict[key];
            result.push(value, strings[i + 1]);
        });
        return result.join('');
    });
}

// export function toJSON(target: {[key: string] : any}): {} {
//     let propKeys = Object.getOwnPropertyNames(target);
//     let prototypeKeys = Object.getOwnPropertyNames(Object.getPrototypeOf(target));
//     let keys = propKeys.concat(prototypeKeys);

//     let keysToIgnore = ['constructor', 'prototype'];

//     keys = keys.filter(k => {
//         return keysToIgnore.indexOf(k) < 0;
//     });

//     let newObj: {[key: string]: any} = {};

//     for(let key of keys) {
//         let [ , converter] = getMetaData(target, key, "toJSON")[0] || [undefined, key];

//         if(typeof converter === 'function') {
//             let [newKey, newVal] = converter(target, key);
//             newObj[newKey] = newVal;
//         } else {
//             if(prototypeKeys.indexOf(key) < 0) {
//                 let desc = Object.getOwnPropertyDescriptor(target, key) as PropertyDescriptor;
//                 if(desc.get) {
//                     newObj[converter] = desc.get.call(target);
//                 } /* else if(typeof desc.value === 'function') {
//                     newObj[converter] = desc.value.call(target);
//                 }*/ else {
//                     Object.defineProperty(newObj, converter, desc);
//                 }
//             } else if (converter !== key) {
//                 let desc = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(target), key) as PropertyDescriptor;
//                 if(desc.get) {
//                     newObj[converter] = desc.get.call(target);
//                 } /* else if(typeof desc.value === 'function') {
//                     newObj[converter] = desc.value.call(target);
//                 }*/ else {
//                     Object.defineProperty(newObj, converter, desc);
//                 }
//             }
//         }
//     }

//     return newObj;
// }

// export function fromJSON(target: {[key: string]: any}): void {

// }

// export const displayName = registerMetaData<string>("displayName");

// export const fromJS = registerMetaData<string | ((target: any, property: string) => [string, any])>("fromJson");
// export const toJS = registerMetaData<string | ((target: any, property: string) => [string, any])>("toJSON");

// export const size = registerValidator<{min?: number, max?: number}>("Size", (target, property, {min = Number.NEGATIVE_INFINITY, max = Infinity}) => {
//     // let {min, max} = Object.assign({min: Number.NEGATIVE_INFINITY, max: Infinity}, config);
//     let val = target[property];
//     if(val === undefined || val === null) return true;
//     return val >= min && val <= max;
// });

// export const required = registerValidator<{}>("Required", (target, property, config) => {
//     return target[property] !== undefined && target[property] !== null;
// });


// var person: {[key: string]: any} = { age: 10 };

// size()(person, 'age');
// console.log(person[MiddleOutSymbol]['age'][0][1](person, "age", {min: 1000}));

// class Person {

//     @displayName("Age")
//     @toJS((target, property) => {
//         return ["Something", target[property] + 100];
//     })
//     @required()
//     @size({
//         min: 100,
//         errorMessage: errorTemplate`${'displayName'} failed size validation with value ${'value'}!`
//         // errorMessage: ({displayName, property, target}) => {
//         //     return `${displayName} failed Size validation with value ${target[property]}`;
//         // }})
//     })
//     public age: number = 10;

//     constructor() {
//     }

// }

// class P2 extends Person {

//     @toJS("MyName")
//     public name: string = "Derek";

//     constructor() {
//         super();
//     }

//     @toJS("Name2")
//     get Name(): string {
//         return this.name;
//     }

//     @size({min: 100})
//     get Older(): number {
//         return 10000;
//     }

//     @toJS((t, p) => {
//         return ['TESTING', t[p]()]
//     })
//     public test: () => string = () => {
//         return "test";
//     }

//     @toJS("COOOOL")
//     public cool(name: string): string {
//         return `cool ${name}`;
//     }
// }

// let p: {[key: string]: any} = {age: 10};
// size({ min: 100})(p, 'age');
// let p = new P2();
// let os = Object.getOwnPropertySymbols(p);
// console.log(os);
// let is = Object.getOwnPropertySymbols(Object.getPrototypeOf(p));
// let test = Object.getPrototypeOf(p)[is[0]];
// console.log(test);
// console.log(is);
// let cs = Object.getOwnPropertySymbols(Object.getPrototypeOf(p).constructor)
// console.log(cs);

// let p2 = {name: "Derek"};
// displayName("Dwayne")(p2, "name");

// let s2 = Object.getOwnPropertySymbols(p2);
// console.log(s2);

// let [isValid, errors] = validate(p);
// console.log(isValid, errors);

// // let [ , value = '' ] = getMetaData(p, 'age', 'displayName')[0] || [];
// // console.log(value);

// console.log(JSON.stringify(p));
// console.log(JSON.stringify(toJSON(p)));

// let [[, fn, config]] = getValidators(p, "age", "Size");
// console.log(fn(p, "age", config));
