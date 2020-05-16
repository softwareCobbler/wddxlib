/**
 * wddx2pojo
 **/
import * as xml2js from "xml2js";

function children(xml2jsElement) {
    return xml2jsElement["$$"];
}

async function parseWDDXString(wddxString) {
    const parser = new xml2js.Parser({explicitChildren:true, preserveChildrenOrder:true});
    const wddxPacket = await parser.parseStringPromise(wddxString);
    return wddxPacket.wddxPacket;
}

function wddxStringLiteral(wddx) {
    return wddx["_"].toString();
}

function wddxNumericLiteral(wddx) {
    return parseFloat(wddx["_"]);
}

function wddxBooleanLiteral(wddx) {
    return wddx["$"].value.toLowerCase === "true";
}

function recursiveWorker(wddx) {
    const elementType = wddx["#name"];
    if (elementType == "array") {
        if (wddx["$"].length == 0) {
            return [];
        }
        else {
            return arrayWorker(children(wddx));
        }
    }
    else if (elementType == "struct") {
        return structWorker(children(wddx));
    }
    else if (elementType == "string") {
        return wddxStringLiteral(wddx);
    }
    else if (elementType == "number") {
        return wddxNumericLiteral(wddx);
    }
    else if (elementType == "boolean") {
        return wddxBooleanLiteral(wddx);
    }
    else {
        throw `unhandled wddx type "${elementType}"`;
    }
}

function arrayWorker(wddxList) {
    const result : any[] = [];

    for (let wddx of wddxList) {
        result.push(recursiveWorker(wddx));
    }

    return result;
}

function wddxStructKey(wddxStructKVPair) {
    return wddxStructKVPair["$"].name;
}

function structWorker(wddxStruct) {
    const result = {};

    if (wddxStruct == undefined) { // empty struct, e.g., "<struct></struct>"
        return result;
    }
    
    for (let wddxStructKVPair of wddxStruct) {
        const key = wddxStructKey(wddxStructKVPair);
        result[key] = recursiveWorker(children(wddxStructKVPair)[0]);
    }

    return result;
}

export default async function wddx2pojo(wddxString : string) {
    const packetContent = await parseWDDXString(wddxString);
    const data = packetContent.data[0];
    return recursiveWorker(children(data)[0]);
}