# Apigle JavaScript/TypeScript Client

Official JavaScript/TypeScript client for [apigle.com](https://apigle.com) API.

## Installation

```sh
npm install apigle
```

## Quick Start

### 1. Default Client Usage

```js
import client from 'apigle';

client.setApiKey('YOUR_API_KEY'); // Obtain from www.apigle.com

const result = await client.searchV1('example');
console.log(result);
```

### 2. Using the Class

```js
import { ApigleClient } from 'apigle';

const myClient = new ApigleClient('YOUR_API_KEY');
const result = await myClient.searchV1('example');
console.log(result);
```

## Endpoints

```js
// Search
const search = await client.searchV1('openai');

// Video info
const video = await client.videoV1('VIDEO_ID');

// Channel info
const channel = await client.channelV1('CHANNEL_ID');

// Playlist info
const playlist = await client.playlistV1('PLAYLIST_ID');

// Playlist items
const playlistItems = await client.playlistItemsV1('PLAYLIST_ID');
```

## File Download (Node.js Only)

```js
await client.downloadFile('VIDEO_ID', 'output.mp3');
```
> Note: This function only works in Node.js environment.

## Features

- All apigle.com endpoints
- TypeScript & JavaScript support
- Easy API key management
- File download function for Node.js

## API Key

You can get your API key for free from [apigle.com](https://apigle.com).

## Python Version

Official Python client: [apigle-python](https://github.com/ilyasyldrm0/apigle-python)

## License

MIT