import { DragAndDropObserver } from './';

export interface DraggableElement {
  nativeElement: HTMLElement;
  observer: DragAndDropObserver;
}