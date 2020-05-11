const assert = require('assert');
const wddxlib = require("../dist/index");

describe("Convert wddx to pojo", () => {
    it("Converts wddx containing an empty struct", async () => {
        const expectedResult = `[{"LINE":2,"SOURCE":"SOME_PATH.CFM","SCOPES":{},"CF_TRACE":["SOME_TRACE_PATH:2"],"EVENT":"BREAKPOINT","THREAD":"ajp-nio-8018-exec-5"}]`;
        const wddx =`
            <wddxPacket version='1.0'>
                <header/>
                <data>
                    <array length='1'>
                        <struct type='java.util.HashMap'>
                            <var name='LINE'>
                                <number>2.0</number>
                            </var>
                            <var name='SOURCE'>
                                <string>SOME_PATH.CFM</string>
                            </var>
                            <var name='SCOPES'>
                                <struct type='java.util.HashMap'>
                                </struct>
                            </var>
                            <var name='CF_TRACE'>
                                <array length='1'>
                                    <string>SOME_TRACE_PATH:2</string>
                                </array>
                            </var>
                            <var name='EVENT'>
                                <string>BREAKPOINT</string>
                            </var>
                            <var name='THREAD'>
                                <string>ajp-nio-8018-exec-5</string>
                            </var>
                        </struct>
                    </array>
                </data>
            </wddxPacket>`;

        const wddxAsPOJO  = await wddxlib.wddx2pojo(wddx);
        const expectedResultAsPOJO = JSON.parse(expectedResult);
        
        assert.deepEqual(wddxAsPOJO, expectedResultAsPOJO);
    });
});