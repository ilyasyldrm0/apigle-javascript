export declare class ApigleClient {
    private apiKey?;
    constructor(apiKey?: string);
    setApiKey(apiKey: string): void;
    private checkKey;
    private getHeaders;
    private get;
    searchV1(q: string, pageToken?: string): Promise<any>;
    download(video: string, type?: string, resolution?: number): Promise<any>;
    searchV2(q: string, part?: string, regionCode?: string, maxResults?: number, order?: string, pageToken?: string): Promise<any>;
    videoComments(videoId: string, part?: string, maxResults?: number): Promise<any>;
    videoDetails(id: string, part?: string): Promise<any>;
    channelDetails(id: string, part?: string): Promise<any>;
    channelVideos(channelId: string, part?: string, order?: string, maxResults?: number, pageToken?: string): Promise<any>;
    playlistDetails(id: string, part?: string): Promise<any>;
    playlistVideos(playlistId: string, part?: string, maxResults?: number, pageToken?: string): Promise<any>;
    trending(part?: string, videoCategoryId?: number, regionCode?: string, maxResults?: number, pageToken?: string): Promise<any>;
    videoCategories(part?: string): Promise<any>;
    i18nRegions(): Promise<any>;
    /**
     * Node.js ortamında dosya indirmek için yardımcı fonksiyon.
     * Tarayıcıda çalışmaz!
     */
    downloadFile(video: string, outputPath: string, type?: string, resolution?: number): Promise<boolean>;
}
