import { endOfEvent } from '../../utils/end-of-event';
import { CarouselError } from './errors/carousel-error';
import { CarouselInitError } from './errors/carousel-init-error';
import { CarouselConfig } from './models/carousel-config.interface';

export class Carousel<T extends HTMLElement> {
  private config: CarouselConfig<T>;
  private dots?: HTMLButtonElement[];
  private items: T[];
  private itemsContainer: HTMLElement;
  private selectedIndex: number;

  constructor(config: CarouselConfig<T>) {
    this.config = config;
    this.itemsContainer = this.getItemsContainer();
    this.items = this.getItems(this.itemsContainer);
    this.initLayout();

    if (
      (config.items.errorOnNoSuchIndex ?? true)
      && typeof config.items.selectedIndex !== 'undefined'
      && !this.items[config.items.selectedIndex]
    ) {
      throw new CarouselInitError(`No item with such index (${config.items.selectedIndex})`);
    }
    this.selectedIndex = config.items.selectedIndex ?? 0;
    this.selectItem(this.selectedIndex);

    this.listenWindowResize();
  }

  public selectItem(selectedIndex: number, originalEvent?: Event): void {
    if (!this.items[selectedIndex]) {
      if (this.config.items.errorOnNoSuchIndex ?? true) {
        throw new CarouselError(`No item with such index (${selectedIndex})`);
      } else {
        return;
      }
    }

    const oldSelectedIndex = this.selectedIndex;
    this.selectedIndex = selectedIndex;

    if (this.dots && this.config.dots?.onItemChange) {
      this.config.dots.onItemChange({
        dotFrom: this.dots[oldSelectedIndex],
        dotTo: this.dots[selectedIndex],
        originalEvent: originalEvent ?? null,
      });
    }

    this.callOnSelectItemCallbacks(originalEvent);
  }

  private initLayout(): void {
    const dotConfig = this.config.dots;
    if (dotConfig) {
      const dotsContainer = document.getElementById(dotConfig.containerId);

      if ((dotConfig.errorOnNotFound ?? true) && !dotsContainer) {
        throw new CarouselInitError(`No dots container with id = "${dotConfig.containerId}"`);
      }

      if (dotsContainer) {
        const dots: HTMLButtonElement[] = [];
        dotsContainer.innerHTML = '';
        for (let i = 0; i < this.items.length; i++) {
          const dotElement = document.createElement('button');

          if (dotConfig.itemClass) {
            dotElement.classList.add(dotConfig.itemClass);
          }

          dotElement.addEventListener('click', (event) => this.selectItem(i, event));
          dotsContainer.appendChild(dotElement);
          dots.push(dotElement);
        }
        this.dots = dots;
      }
    }
  }

  private callOnSelectItemCallbacks(originalEvent?: Event): void {
    if (this.config.items.onSelectItem) {
      for (let i = 0; i < this.items.length; i++) {
        this.config.items.onSelectItem({
          container: this.itemsContainer,
          item: this.items[i],
          originalEvent: originalEvent ?? null,
          relativeIndex: i - this.selectedIndex,
        });
      }
    }
  }

  private getItems(container: HTMLElement): T[] {
    return Array.from(container.children).filter(
      (element): element is T => element instanceof HTMLElement
    );
  }

  private getItemsContainer(): HTMLElement {
    const container = document.getElementById(this.config.items.containerId);
    if (!container) {
      throw new CarouselInitError(`No element with id = "${this.config.items.containerId}"`);
    }
    return container;
  }

  private listenWindowResize(): void {
    endOfEvent(window, 'resize', 500, () => {
      this.callOnSelectItemCallbacks();
    });
  }
}
