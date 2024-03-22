import { ViewportEventsInitError } from './errors/viewport-events-init-error';
import { getViewportEventItem } from './functions/get-viewport-event-item';
import { ViewportEventItem } from './models/viewport-event-item.interface';
import { ViewportEventsConfig } from './models/viewport-events-config.type';

export class ViewportEvents {
  constructor(config: ViewportEventsConfig) {
    this.observeItems(config);
  }

  private observeItems(config: ViewportEventsConfig): void {
    config.map(item => getViewportEventItem(item)).forEach(item => {
      this.observeItem(item);
    });
  }

  private observeItem(eventItem: ViewportEventItem): void {
    const elements = document.querySelectorAll(eventItem.selector);

    if (elements.length === 0) {
      if (eventItem.onEmptyElement === 'error') {
        throw new ViewportEventsInitError(`Elements for selector '${eventItem.selector}' not found!`);
      } else {
        return;
      }
    }

    const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries
        .filter(({ isIntersecting }) => isIntersecting)
        .forEach(({ target }) => {
          setTimeout(() => {
            if (eventItem.action === 'add-class') {
              target.classList.add(...eventItem.classList);
            } else if (eventItem.action === 'remove-class') {
              target.classList.remove(...eventItem.classList);
            }
          }, eventItem.delay(target));

          if (eventItem.repeat === 'once') {
            observer.unobserve(target);
          }
        });
    }, { threshold: eventItem.threshold });

    elements.forEach(element => {
      observer.observe(element);
    });
  }
}
