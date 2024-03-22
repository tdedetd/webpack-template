import { ViewportEventsError } from './viewport-events-error';

export class ViewportEventsInitError extends ViewportEventsError {
  constructor(message?: string) {
    super(message);
    this.name = 'ViewportEventsInitError';
  }
}
