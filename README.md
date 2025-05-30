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

## Endpoints & Usage Examples

### 1. Video Search (v1)
Search for videos by keyword.
```js
const result = await client.searchV1('lofi music');
console.log(result);
```

### 2. Get Download URL & Metadata (v2)
Returns a download URL and metadata for the video. Does not download the file.
Available options for `resolution`: 360, 720, 1080, 2160
```js
const info = await client.download('QW8-UVmMm_Q', 'mp4', 360);
console.log(info.url);
```

### 3. Get Download Stream URLs & Metadata (v2)
Returns a download stream URLs and metadata for the video. Does not download the file.
```js
const info = await client.downloadstr('QW8-UVmMm_Q');
console.log(info);
```

### 4. Download Video File (Node.js Only)
Downloads the video file to the specified path. Returns `true` if successful.
Available options for `resolution`: 360, 720, 1080, 2160
```js
const success = await client.downloadFile('QW8-UVmMm_Q', 'video.mp4', 'mp4', 360);
console.log('Downloaded:', success);
```

### 5. Advanced Video Search (v2)
Search with more parameters for advanced filtering.
```js
const result = await client.searchV2({
  q: 'ban',
  part: 'snippet',
  regionCode: 'US',
  maxResults: 100,
  order: 'relevance'
});
console.log(result);
```

### 6. Video Comments
List comments for a video.
```js
const result = await client.videoComments('kffacxfA7G4', 'snippet', 100);
console.log(result);
```

### 7. Video Details
Get detailed information about a video.
```js
const result = await client.videoDetails('XGGXlj6grzQ', 'contentDetails,snippet,statistics');
console.log(result);
```

### 8. Channel Details
Get detailed information about a channel.
```js
const result = await client.channelDetails('UCfM3zsQsOnfWNUppiycmBuw', 'snippet,statistics');
console.log(result);
```

### 9. Channel Videos
List videos from a channel.
```js
const result = await client.channelVideos('UCvgfXK4nTYKudb0rFR6noLA', 'snippet,id', 'date', 50);
console.log(result);
```

### 10. Playlist Details
Get details of a playlist.
```js
const result = await client.playlistDetails('PLqpXi64f6ul2Nzd5hHdHS4XuWa7ix8Rm-', 'snippet');
console.log(result);
```

### 11. Playlist Videos
List videos in a playlist.
```js
const result = await client.playlistVideos('RDMM', 'snippet', 50);
console.log(result);
```

### 12. Trending Videos
List trending videos for a category and region.
```js
const result = await client.trending('snippet', 1, 'US', 50);
console.log(result);
```

### 13. Video Categories
List all video categories.
```js
const result = await client.videoCategories('snippet');
console.log(result);
```

### 14. Supported Regions (i18nRegions)
List all supported regions.
```js
const result = await client.i18nRegions();
console.log(result);
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