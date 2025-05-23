"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
async function main() {
    const client = new src_1.ApigleClient('YOUR_API_KEY');
    try {
        const result = await client.searchV1('example');
        console.log('searchV1 result:', result);
    }
    catch (e) {
        console.error(e);
    }
}
main();
