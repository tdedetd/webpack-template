export function debounce<EventName extends keyof HTMLElementEventMap>(
  target: HTMLElement,
  eventName: EventName,
  delay: number,
  callback: (event: HTMLElementEventMap[EventName]) => void
): void;

export function debounce<EventName extends keyof WindowEventMap>(
  target: Window,
  eventName: EventName,
  delay: number,
  callback: (event: WindowEventMap[EventName]) => void
): void;

export function debounce(
  target: EventTarget,
  eventName: string,
  delay: number,
  callback: (event: Event) => void
): void {
  let timeoutId: number | null = null;
  target.addEventListener(eventName, (event) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      callback(event);
    }, delay, '');
  });
}
