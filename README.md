# Apigle JavaScript/TypeScript Client

Official JavaScript/TypeScript client for [apigle.com](https://apigle.com) API.

## Installation

```sh
npm install apigle
```

## Usage

```ts
import { ApigleClient } from 'apigle';

const client = new ApigleClient('YOUR_API_KEY'); // Can get it from www.apigle.com
const result = await client.searchV1('example');
console.log(result);
```

## Features
- All endpoints from the Python client
- TypeScript & JavaScript support
- File download helper

## License
MIT
