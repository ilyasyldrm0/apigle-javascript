"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingAPIKeyError = void 0;
class MissingAPIKeyError extends Error {
    constructor() {
        super('API key is missing. Set it using ApigleClient.setApiKey() or constructor.\nVisit https://apigle.com to get your API key.');
        this.name = 'MissingAPIKeyError';
    }
}
exports.MissingAPIKeyError = MissingAPIKeyError;
