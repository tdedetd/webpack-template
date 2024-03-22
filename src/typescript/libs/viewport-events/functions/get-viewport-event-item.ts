import { ViewportEventItem } from '../models/viewport-event-item.interface';
import { ViewportEventsConfigItem } from '../models/viewport-events-config-item.interface';

export function getViewportEventItem(configItem: ViewportEventsConfigItem): ViewportEventItem {
  const { action, classList, selector, delay, onEmptyElement, threshold, repeat } = configItem;
  const newDelay = typeof delay === 'undefined'
    ? (_: Element): number => 0
    : typeof delay === 'number'
      ? (_: Element): number => delay
      : delay;

  return {
    action,
    classList: typeof classList === 'string' ? [classList] : classList,
    delay: newDelay,
    onEmptyElement: onEmptyElement ?? 'error',
    repeat: repeat ?? 'once',
    selector,
    threshold: typeof threshold === 'number' ? threshold : 0.5,
  };
}
