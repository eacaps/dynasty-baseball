export function wait(ms:number):Promise<void> {
    return new Promise<void>((resolve,error) => {
        setTimeout(() => {
            resolve();
        },ms)
    });
}

export function deepCopy<T>(object:T):T {
    return JSON.parse(JSON.stringify(object))
}