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
        return arrayWorker(children(wddx));
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
    
    for (let wddxStructKVPair of wddxStruct) {
        const key = wddxStructKey(wddxStructKVPair);
        result[key] = recursiveWorker(children(wddxStructKVPair)[0]);
    }

    return result;
}

export async function wddxToJSON(wddxString) {
    const packetContent = await parseWDDXString(wddxString);
    const data = packetContent.data[0];
    return recursiveWorker(children(data)[0]);
}

/*(async() => {
    const wddxStr = `
    <wddxPacket version='1.0'>
        <header/>
        <data>
            <array length='1'>
                <struct>
                    <var name='Y'><number>4.0</number></var>
                    <var name='COMMAND'><string>SET_BREAKPOINT</string></var>
                    <var name='FILE'><string>C:\ColdFusion2018\cfusion\wwwroot\index.cfm</string></var>
                    <var name='SEQ'><number>1.0</number></var>
                </struct>
            </array>
        </data>
    </wddxPacket>`;

    console.log(await wddxToJSON(wddxStr));
})();*/