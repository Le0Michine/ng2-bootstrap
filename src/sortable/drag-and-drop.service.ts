import { Injectable, Directive, Output, EventEmitter } from '@angular/core';

import { Point, DragEvent, DragAndDropObserver, DraggableElement } from './models';

@Injectable()
export class DragAndDropService {
  private draggableElements: DraggableElement[] = [];
  private draggedElement: DraggableElement;

  public constructor() {
    document.ontouchmove = (event: TouchEvent) => this.drag(event);
  }

  public registerElement(element: DraggableElement): void {
    console.info('registerElement', element);
    this.draggableElements.push(element);
    element.nativeElement.ontouchstart = (event: TouchEvent) => this.startDrag(element, event);
    // element.nativeElement.ontouchmove = (event: TouchEvent) => this.drag(element, event);
    element.nativeElement.ontouchend = (event: TouchEvent) => this.finishDrag(event);
    element.nativeElement.ontouchcancel = (event: TouchEvent) => this.finishDrag(event);
  }

  private startDrag(element: DraggableElement, event: TouchEvent): void {
    console.info('startDrag', element, event);
    if (!this.draggedElement) {
      event.preventDefault();
      this.draggedElement = element;
      element.observer.ondragstart();
    }
  }

  private finishDrag(event: TouchEvent): void {
    console.info('finishDrag', event);
    if (this.draggedElement) {
      event.preventDefault();
      this.draggedElement.observer.ondragend();
      this.draggedElement = undefined;
    }
  }

  private drag(event: TouchEvent): void {
    console.info('drag', this.draggedElement, event);
    if (this.draggedElement) {
      event.preventDefault();
      let point = this.getElementCenter(this.draggedElement.nativeElement);
      // this.fireDragover(point);
      this.fireDragover({ x: event.touches.item(0).clientX, y: event.touches.item(0).clientY });
    }
  }

  private getElementCenter(nativeElement: HTMLElement): Point {
    let rectangle = nativeElement.getBoundingClientRect();
    return { x: rectangle.left + rectangle.width / 2, y: rectangle.top + rectangle.height / 2 };
  }

  private fireDragover(point: Point): void {
    for (let element of this.draggableElements) {
      let rectangle = element.nativeElement.getBoundingClientRect();
      if (
        element !== this.draggedElement
        && point.x >= rectangle.left
        && point.x <= rectangle.right
        && point.y >= rectangle.top
        && point.y <= rectangle.bottom
      ) {
          element.observer.ondragover();
      }
    }
  }
}
