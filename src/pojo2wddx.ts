/**
 * pojo2wddx
 **/

function recursiveWorker(obj:any, result:string[]) {
    if (Array.isArray(obj)) {
        result.push(`<array length='${obj.length}'>`);
        obj.forEach(e => recursiveWorker(e, result));
        result.push(`</array>`);
    }
    else if (obj != null && (typeof obj == "object")) {
        result.push(`<struct>`);
        for (let key of Object.getOwnPropertyNames(obj)) {
            result.push(`<var name='${key}'>`);
            recursiveWorker(obj[key], result);
            result.push(`</var>`);
        }
        result.push(`</struct>`);
    }
    else if (typeof obj == "number") {
        result.push(`<number>${obj}</number>`);
    }
    else if (typeof obj == "string") {
        result.push(`<string>${obj}</string>`);
    }
    else if (typeof obj == "boolean") {
        result.push(`<boolean value='${obj}'/>`);
    }
    else {
        throw `unsupported javascript type ${typeof obj} when converting POJO->WDDX`;
    }
}

export default async function pojo2wddx(obj: any) {
    const defaultPrelude = `<wddxPacket version='1.0'><header/><data>`; // maybe we will need to add to this but the packets I've seen are always like this
    const defaultEpilogue = `</data></wddxPacket>`;

    const result : string[] = [];
    recursiveWorker(obj, result);
    return defaultPrelude + result.join("") + defaultEpilogue;
}