import { CarouselEvent } from './carousel-event.interface';

export interface SelectItemEvent<T extends HTMLElement> extends CarouselEvent {
  item: T;
  container: HTMLElement;
  relativeIndex: number;
}
