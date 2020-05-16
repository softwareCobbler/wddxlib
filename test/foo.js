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

    it("Converts a nested array element of length 0", async () => {
        const wddx = `<wddxPacket version='1.0'>
            <header/>
            <data>
                <array length='1'>
                    <struct type='java.util.HashMap'>
                        <var name='LINE'><number>24.0</number></var>
                        <var name='SOURCE'><string>some\\path\\index.cfm</string></var>
                        <var name='SCOPES'>
                            <struct type='java.util.HashMap'>
                                <var name='REQUEST'>
                                    <struct type='java.util.HashMap'>
                                        <var name='cfdumpinited'><string>true</string></var>
                                    </struct>
                                </var>
                                <var name='VARIABLES'>
                                    <struct type='java.util.HashMap'>
                                        <var name='X'>
                                            <struct type='java.util.HashMap'>
                                                <var name='PATH'>
                                                    <string>some\\path\\Fake.cfc</string></var>
                                                    <var name='EXTENDS'><string>WEB-INF.cftags.component</string></var>
                                                    <var name='PROPERTIES'><array length='0'></array>
                                                </var>
                                                <var name='NAME'><string>Fake</string></var>
                                            </struct>
                                        </var>
                                        <var name='Y'>
                                            <array length='2'>
                                                <string>1</string>
                                                <struct type='java.util.HashMap'>
                                                    <var name='PATH'><string>some\\path\\Fake.cfc</string></var>
                                                    <var name='EXTENDS'><string>WEB-INF.cftags.component</string></var>
                                                    <var name='PROPERTIES'><array length='0'></array></var>
                                                    <var name='NAME'><string>Fake</string></var>
                                                </struct>
                                            </array>
                                        </var>
                                        <var name='I'><string>0</string></var>
                                    </struct>
                                </var>
                            </struct>
                        </var>
                        <var name='CF_TRACE'>
                            <array length='1'>
                                <string>some\\path\\index.cfm:24</string>
                            </array>
                        </var>
                        <var name='EVENT'><string>BREAKPOINT</string></var>
                        <var name='THREAD'><string>ajp-nio-8018-exec-4</string></var>
                    </struct>
                </array>
            </data>
        </wddxPacket>`;

        const expected = `[{
            "LINE":24,
            "SOURCE":"some\\\\path\\\\index.cfm",
            "SCOPES": {
                "REQUEST": {"cfdumpinited":"true"},
                "VARIABLES": {
                    "X": {
                        "PATH": "some\\\\path\\\\Fake.cfc",
                        "EXTENDS": "WEB-INF.cftags.component",
                        "PROPERTIES": [],
                        "NAME":"Fake"
                    },
                    "Y": [
                        "1",
                        {
                            "PATH": "some\\\\path\\\\Fake.cfc",
                            "EXTENDS":"WEB-INF.cftags.component",
                            "PROPERTIES":[],
                            "NAME":
                            "Fake"
                        }
                    ],
                    "I":"0"
                }
            },
            "CF_TRACE": ["some\\\\path\\\\index.cfm:24"],
            "EVENT":"BREAKPOINT",
            "THREAD":"ajp-nio-8018-exec-4"
        }]`;

        const wddxAsPOJO  = await wddxlib.wddx2pojo(wddx);
        const expectedResultAsPOJO = JSON.parse(expected);
        
        assert.deepEqual(wddxAsPOJO, expectedResultAsPOJO);
    });
});