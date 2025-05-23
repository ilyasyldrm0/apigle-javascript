import axios, { AxiosRequestConfig } from 'axios';
import { BASE_URL, ENDPOINTS } from './endpoints';
import { MissingAPIKeyError } from './exceptions';

export class ApigleClient {
  private apiKey?: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey;
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  private checkKey() {
    if (!this.apiKey) {
      throw new MissingAPIKeyError();
    }
  }

  private getHeaders() {
    this.checkKey();
    return { 'x-api-key': this.apiKey! };
  }

  private async get(endpoint: string, params?: Record<string, any>) {
    const url = BASE_URL + endpoint;
    const config: AxiosRequestConfig = {
      headers: this.getHeaders(),
      params,
    };
    try {
      const response = await axios.get(url, config);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        throw new MissingAPIKeyError();
      }
      throw error;
    }
  }

  // /v1/search
  async searchV1(q: string, pageToken?: string) {
    const params: any = { q };
    if (pageToken) params.pageToken = pageToken;
    return this.get(ENDPOINTS.searchV1, params);
  }

  // /v2/download
  async download(video: string, type: string = 'mp4', resolution?: number) {
    const params: any = { video, type };
    if (resolution) params.resolution = resolution;
    return this.get(ENDPOINTS.download, params);
  }

  // /v2/search
  async searchV2(q: string, part: string = 'snippet', regionCode?: string, maxResults?: number, order?: string, pageToken?: string) {
    const params: any = { q, part };
    if (regionCode) params.regionCode = regionCode;
    if (maxResults) params.maxResults = maxResults;
    if (order) params.order = order;
    if (pageToken) params.pageToken = pageToken;
    return this.get(ENDPOINTS.searchV2, params);
  }

  // /v2/videoComments
  async videoComments(videoId: string, part: string = 'snippet', maxResults: number = 100) {
    const params = { videoId, part, maxResults };
    return this.get(ENDPOINTS.videoComments, params);
  }

  // /v2/videoDetails
  async videoDetails(id: string, part: string = 'contentDetails,snippet,statistics') {
    const params = { id, part };
    return this.get(ENDPOINTS.videoDetails, params);
  }

  // /v2/channelDetails
  async channelDetails(id: string, part: string = 'snippet,statistics') {
    const params = { id, part };
    return this.get(ENDPOINTS.channelDetails, params);
  }

  // /v2/channelVideos
  async channelVideos(channelId: string, part: string = 'snippet,id', order?: string, maxResults?: number, pageToken?: string) {
    const params: any = { channelId, part };
    if (order) params.order = order;
    if (maxResults) params.maxResults = maxResults;
    if (pageToken) params.pageToken = pageToken;
    return this.get(ENDPOINTS.channelVideos, params);
  }

  // /v2/playlistDetails
  async playlistDetails(id: string, part: string = 'snippet') {
    const params = { id, part };
    return this.get(ENDPOINTS.playlistDetails, params);
  }

  // /v2/playlistVideos
  async playlistVideos(playlistId: string, part: string = 'snippet', maxResults?: number, pageToken?: string) {
    const params: any = { playlistId, part };
    if (maxResults) params.maxResults = maxResults;
    if (pageToken) params.pageToken = pageToken;
    return this.get(ENDPOINTS.playlistVideos, params);
  }

  // /v2/trending
  async trending(part: string = 'snippet', videoCategoryId: number = 1, regionCode?: string, maxResults?: number, pageToken?: string) {
    const params: any = { part, videoCategoryId };
    if (regionCode) params.regionCode = regionCode;
    if (maxResults) params.maxResults = maxResults;
    if (pageToken) params.pageToken = pageToken;
    return this.get(ENDPOINTS.trending, params);
  }

  // /v2/videoCategories
  async videoCategories(part: string = 'snippet') {
    const params = { part };
    return this.get(ENDPOINTS.videoCategories, params);
  }

  // /v2/i18nRegions
  async i18nRegions() {
    return this.get(ENDPOINTS.i18nRegions);
  }

  /**
   * Node.js ortamında dosya indirmek için yardımcı fonksiyon.
   * Tarayıcıda çalışmaz!
   */
  async downloadFile(
    video: string,
    outputPath: string,
    type: string = 'mp4',
    resolution?: number
  ): Promise<boolean> {
    // Dinamik olarak fs ve axios'u sadece Node ortamında yükle
    try {
      const response = await this.download(video, type, resolution);
      const fileUrl = response.url;
      if (!fileUrl) return false;
      const axios = await import('axios').then(m => m.default || m);
      const fs = await import('fs');
      const fileResponse = await axios.get(fileUrl, { responseType: 'stream' });
      await new Promise((resolve, reject) => {
        const writer = fs.createWriteStream(outputPath);
        fileResponse.data.pipe(writer);
        writer.on('finish', () => resolve(undefined));
        writer.on('error', reject);
      });
      return true;
    } catch (e) {
      console.error('Download error:', e);
      return false;
    }
  }
}
