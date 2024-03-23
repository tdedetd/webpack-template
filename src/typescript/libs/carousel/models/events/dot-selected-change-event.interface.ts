import { CarouselEvent } from './carousel-event.interface';

export interface DotSelectedChangeChangeEvent extends CarouselEvent {
  dotFrom?: HTMLButtonElement;
  dotTo: HTMLButtonElement;
}
