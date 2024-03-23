import { CarouselError } from './carousel-error';

export class CarouselInitError extends CarouselError {
  constructor(message?: string) {
    super(message);
    this.name = 'CarouselInitError';
  }
}
