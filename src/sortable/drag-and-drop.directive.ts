import { Directive, Output, EventEmitter, ElementRef } from '@angular/core';

import { Point, DragEvent, DragAndDropObserver, DraggableElement } from './models';
import { DragAndDropService } from './drag-and-drop.service';

@Directive({
  selector: '[draggable=true]'
})
export class DragAndDropDirective implements DragAndDropObserver {
  @Output() public dragstart: EventEmitter<any> = new EventEmitter<any>();
  @Output() public dragover: EventEmitter<any> = new EventEmitter<any>();
  @Output() public dragend: EventEmitter<any> = new EventEmitter<any>();

  public constructor(el: ElementRef, dragAndDropService: DragAndDropService) {
    dragAndDropService.registerElement({ nativeElement: el.nativeElement, observer: this });
  }

  public ondragstart(): void {
    this.dragstart.emit();
  }

  public ondragover(): void {
    this.dragover.emit();
  }

  public ondragend(): void {
    this.dragend.emit();
  }
}
