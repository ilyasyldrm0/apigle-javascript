export class MissingAPIKeyError extends Error {
  constructor() {
    super(
      'API key is missing. Set it using ApigleClient.setApiKey() or constructor.\nVisit https://apigle.com to get your API key.'
    );
    this.name = 'MissingAPIKeyError';
  }
}
