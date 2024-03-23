import { DotSelectedChangeChangeEvent } from './events/dot-selected-change-event.interface';
import { SelectItemEvent } from './events/select-item-event.interface';

export interface CarouselConfig<T extends HTMLElement> {
  dots?: {
    containerId: string;
    errorOnNotFound?: boolean;
    itemClass?: string;
    onItemChange?: (event: DotSelectedChangeChangeEvent) => void;
  },
  items: {
    containerId: string;
    errorOnNoSuchIndex?: boolean;
    onSelectItem?: (event: SelectItemEvent<T>) => void;
    selectedIndex?: number;
  },
}
