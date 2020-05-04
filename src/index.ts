import wddx2pojo from "./wddx2pojo";
import pojo2wddx from "./pojo2wddx";

export {wddx2pojo, pojo2wddx};

/*(async() => console.log(await pojo2wddx(
    [{
        REMOTE_SESSION: true
    }]
    
)))();*/

/*
<wddxPacket version='1.0'>
    <header/>
    <data>
        <array length='1'>
            <struct>
                <var name='REMOTE_SESSION'><boolean value='true'/></var>
            </struct>
        </array>
    </data>
</wddxPacket>
*/

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

