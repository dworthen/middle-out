const MiddleOutMetaDataSymbol = Symbol("MiddleOutMetaData");

export function registerMetaData<T>(name: string): (config: T) => (target: {[key:string]: any}, property: string) => void {
    if(name === undefined || name === null || typeof name !== 'string') {
        throw new TypeError(`Missing or invalid type for argument 'name'. Expecting string but received ${name}.`);
    }

    return config => {
        if(config === undefined || config === null) {
            throw new TypeError(`Invalid argument 'config'. Expecting type any but received ${config}.`);
        }

        return (target, property) => {
            if(target === undefined || target === null || typeof target !== 'object') {
                throw new TypeError(`Invalid argument 'target'. Expecting object but received ${target}.`);
            }

            if(property === undefined || property === null || typeof property !== 'string') {
                throw new TypeError(`Invalid argument 'property'. Expecting string but received ${property}.`);
            }
            target[MiddleOutMetaDataSymbol] = target[MiddleOutMetaDataSymbol] || {};
            target[MiddleOutMetaDataSymbol][property] = target[MiddleOutMetaDataSymbol][property] || [];
            // target[MiddleOutMetaDataSymbol][property][name] = config;
            target[MiddleOutMetaDataSymbol][property] =
                (target[MiddleOutMetaDataSymbol][property] || []).concat([
                    [name, config]
                ]);
        }
    }
}

export function getAllMetaData(target: {[key:string]: any}): {} {
    if(target === undefined || target === null || typeof target !== 'object') {
        throw new TypeError(`Invalid argument 'target'. Expecting object but received ${target}.`);
    }

    let meta = target[MiddleOutMetaDataSymbol] || {};
    return meta;
}

export function getMetaData(target: {[key:string]: any}, property: string, name?: string): Array<[string, any]> | any {
    if(target === undefined || target === null || typeof target !== 'object') {
        throw new TypeError(`Invalid argument 'target'. Expecting object but received ${target}.`);
    }

    if(property === undefined || property === null || typeof property !== 'string') {
        throw new TypeError(`Invalid argument 'property'. Expecting string|number but received ${property}.`);
    }

    if(name !== undefined && typeof name !== 'string') {
        throw new TypeError(`Invalid argument 'name'. Expecting string but received ${name}.`);
    }

    let meta = target[MiddleOutMetaDataSymbol] || {};
    let m = meta[property] || [];

    if(name) {
        let [ , value] = m.filter((v: any[]) => ((v[0] || '') === name))[0] || [undefined, undefined];
        return value;
    }
    return m;
}