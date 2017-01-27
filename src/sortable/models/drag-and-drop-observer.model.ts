export interface DragAndDropObserver {
  ondragstart(): void;
  ondragend(): void;
  ondragover(): void;
}
