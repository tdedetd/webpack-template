export interface ViewportEventItem {
  action: 'add-class' | 'remove-class';
  classList: string[];
  delay: (elem: Element) => number;
  onEmptyElement: 'ignore' | 'error';
  repeat: 'once' | 'scroll-down' | 'always';
  selector: string;
  threshold: number;
}
