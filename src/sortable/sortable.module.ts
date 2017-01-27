import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SortableComponent } from './sortable.component';
import { DraggableItemService } from './draggable-item.service';
import { DragAndDropService } from './drag-and-drop.service';
import { DragAndDropDirective } from './drag-and-drop.directive';

@NgModule({
    declarations: [SortableComponent, DragAndDropDirective],
    imports: [CommonModule],
    exports: [SortableComponent, DragAndDropDirective]
})
export class SortableModule {
    public static forRoot(): ModuleWithProviders {
        return {ngModule: SortableModule, providers: [DraggableItemService, DragAndDropService]};
    }
}
