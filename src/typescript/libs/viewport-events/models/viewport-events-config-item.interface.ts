export interface ViewportEventsConfigItem {
  action: 'add-class' | 'remove-class';
  classList: string | string[];
  delay?: number | ((elem: Element) => number);
  onEmptyElement?: 'ignore' | 'error';
  repeat?: 'once' | 'scroll-down' | 'always';
  selector: string;
  threshold?: number;
}
