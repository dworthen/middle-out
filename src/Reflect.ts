const MiddleOutMetaDataSymbol = Symbol("MiddleOutMetaData");

export function registerMetaData<T>(name: string): (config: T) => (target: any, property: string) => void {
    return config => {
        return (target, property) => {
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

export function getAllMetaData(target: any): {} {
    let meta = target[MiddleOutMetaDataSymbol] || {};
    return meta;
}

export function getMetaData(target: any, property: string, name?: string): Array<[string, any]> {
    let meta = target[MiddleOutMetaDataSymbol] || {};
    let m = meta[property] || [];
    return name
        ? m.filter((v: Array<any>) => ((v[0] || '') === name))
        // ? {[property]: { [name]: m[property][name] }}
        : m;
}