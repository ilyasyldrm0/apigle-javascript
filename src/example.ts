import { ApigleClient } from '../src';

async function main() {
  const client = new ApigleClient('YOUR_API_KEY');
  try {
    const result = await client.searchV1('example');
    console.log('searchV1 result:', result);
  } catch (e) {
    console.error(e);
  }
}

main();
