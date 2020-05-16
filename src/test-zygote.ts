//
// serves as a template to paste in failing WDDX, debug against parsing failures, and eventually write a test that can be installed into /test
//

import wddx2pojo from "./wddx2pojo"

const wddx = ``;

const expected = ``;

(async () => {
    console.log(JSON.parse(expected));
    const result = wddx2pojo(wddx);
    console.log(JSON.stringify(await result));
})();