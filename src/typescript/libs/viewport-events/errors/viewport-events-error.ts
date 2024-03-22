export class ViewportEventsError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'ViewportEventsError';
  }
}
