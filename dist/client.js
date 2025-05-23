"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApigleClient = void 0;
const axios_1 = __importDefault(require("axios"));
const endpoints_1 = require("./endpoints");
const exceptions_1 = require("./exceptions");
class ApigleClient {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    setApiKey(apiKey) {
        this.apiKey = apiKey;
    }
    checkKey() {
        if (!this.apiKey) {
            throw new exceptions_1.MissingAPIKeyError();
        }
    }
    getHeaders() {
        this.checkKey();
        return { 'x-api-key': this.apiKey };
    }
    async get(endpoint, params) {
        const url = endpoints_1.BASE_URL + endpoint;
        const config = {
            headers: this.getHeaders(),
            params,
        };
        try {
            const response = await axios_1.default.get(url, config);
            return response.data;
        }
        catch (error) {
            if (error.response && error.response.status === 403) {
                throw new exceptions_1.MissingAPIKeyError();
            }
            throw error;
        }
    }
    // /v1/search
    async searchV1(q, pageToken) {
        const params = { q };
        if (pageToken)
            params.pageToken = pageToken;
        return this.get(endpoints_1.ENDPOINTS.searchV1, params);
    }
    // /v2/download
    async download(video, type = 'mp4', resolution) {
        const params = { video, type };
        if (resolution)
            params.resolution = resolution;
        return this.get(endpoints_1.ENDPOINTS.download, params);
    }
    // /v2/search
    async searchV2(q, part = 'snippet', regionCode, maxResults, order, pageToken) {
        const params = { q, part };
        if (regionCode)
            params.regionCode = regionCode;
        if (maxResults)
            params.maxResults = maxResults;
        if (order)
            params.order = order;
        if (pageToken)
            params.pageToken = pageToken;
        return this.get(endpoints_1.ENDPOINTS.searchV2, params);
    }
    // /v2/videoComments
    async videoComments(videoId, part = 'snippet', maxResults = 100) {
        const params = { videoId, part, maxResults };
        return this.get(endpoints_1.ENDPOINTS.videoComments, params);
    }
    // /v2/videoDetails
    async videoDetails(id, part = 'contentDetails,snippet,statistics') {
        const params = { id, part };
        return this.get(endpoints_1.ENDPOINTS.videoDetails, params);
    }
    // /v2/channelDetails
    async channelDetails(id, part = 'snippet,statistics') {
        const params = { id, part };
        return this.get(endpoints_1.ENDPOINTS.channelDetails, params);
    }
    // /v2/channelVideos
    async channelVideos(channelId, part = 'snippet,id', order, maxResults, pageToken) {
        const params = { channelId, part };
        if (order)
            params.order = order;
        if (maxResults)
            params.maxResults = maxResults;
        if (pageToken)
            params.pageToken = pageToken;
        return this.get(endpoints_1.ENDPOINTS.channelVideos, params);
    }
    // /v2/playlistDetails
    async playlistDetails(id, part = 'snippet') {
        const params = { id, part };
        return this.get(endpoints_1.ENDPOINTS.playlistDetails, params);
    }
    // /v2/playlistVideos
    async playlistVideos(playlistId, part = 'snippet', maxResults, pageToken) {
        const params = { playlistId, part };
        if (maxResults)
            params.maxResults = maxResults;
        if (pageToken)
            params.pageToken = pageToken;
        return this.get(endpoints_1.ENDPOINTS.playlistVideos, params);
    }
    // /v2/trending
    async trending(part = 'snippet', videoCategoryId = 1, regionCode, maxResults, pageToken) {
        const params = { part, videoCategoryId };
        if (regionCode)
            params.regionCode = regionCode;
        if (maxResults)
            params.maxResults = maxResults;
        if (pageToken)
            params.pageToken = pageToken;
        return this.get(endpoints_1.ENDPOINTS.trending, params);
    }
    // /v2/videoCategories
    async videoCategories(part = 'snippet') {
        const params = { part };
        return this.get(endpoints_1.ENDPOINTS.videoCategories, params);
    }
    // /v2/i18nRegions
    async i18nRegions() {
        return this.get(endpoints_1.ENDPOINTS.i18nRegions);
    }
    /**
     * Node.js ortamında dosya indirmek için yardımcı fonksiyon.
     * Tarayıcıda çalışmaz!
     */
    async downloadFile(video, outputPath, type = 'mp4', resolution) {
        // Dinamik olarak fs ve axios'u sadece Node ortamında yükle
        try {
            const response = await this.download(video, type, resolution);
            const fileUrl = response.url;
            if (!fileUrl)
                return false;
            const axios = await Promise.resolve().then(() => __importStar(require('axios'))).then(m => m.default || m);
            const fs = await Promise.resolve().then(() => __importStar(require('fs')));
            const fileResponse = await axios.get(fileUrl, { responseType: 'stream' });
            await new Promise((resolve, reject) => {
                const writer = fs.createWriteStream(outputPath);
                fileResponse.data.pipe(writer);
                writer.on('finish', () => resolve(undefined));
                writer.on('error', reject);
            });
            return true;
        }
        catch (e) {
            console.error('Download error:', e);
            return false;
        }
    }
}
exports.ApigleClient = ApigleClient;
