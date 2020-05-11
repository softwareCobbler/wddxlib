import wddx2pojo from "./wddx2pojo";


(async () => {
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
    const result = await wddx2pojo(wddx);
    console.error(result);
})();