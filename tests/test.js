import { ApigleClient } from './../src/index';

async function runTests() {
  // API anahtarınızı buraya ekleyin
  const client = new ApigleClient("YOUR_API_KEY");

  try {
    console.log("searchV1:", await client.searchV1("test"));
    console.log("searchV2:", await client.searchV2("test"));
    console.log("download:", await client.download("tCDvOQI3pco"));
    // downloadFileNode fonksiyonu Node.js ortamında test edilmeli
    if (typeof process !== 'undefined' && process.versions && process.versions.node) {
      const result = await client.downloadFile("tCDvOQI3pco", "output.mp3");
      console.log('downloadFile:', result);
    }
    console.log("videoComments:", await client.videoComments("tCDvOQI3pco"));
    console.log("videoDetails:", await client.videoDetails("tCDvOQI3pco"));
    console.log("channelDetails:", await client.channelDetails("@timer__"));
    console.log("channelVideos:", await client.channelVideos("@timer__"));
    console.log(
      "playlistDetails:",
      await client.playlistDetails("RDQMhg-hQfuk4vU")
    );
    console.log(
      "playlistVideos:",
      await client.playlistVideos("RDQMhg-hQfuk4vU")
    );
    console.log("trending:", await client.trending());
    console.log("videoCategories:", await client.videoCategories());
    console.log("i18nRegions:", await client.i18nRegions());
  } catch (e) {
    console.error('Test error:', e);
  }
}

runTests();