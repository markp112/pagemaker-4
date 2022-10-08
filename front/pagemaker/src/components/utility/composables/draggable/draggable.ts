import { useToolbarStore } from '@/stores/toolbars.store';

export function drag() {

  const store = useToolbarStore(); 

  function onDragStart(e: DragEvent): void {
    if (e.target)
      (e.target as HTMLDivElement).style.border = 'dashed 0.5px red';
    if (e.dataTransfer) {
      if (e.target) {
        e.dataTransfer.setData('text/plain', (e.target as HTMLDivElement).id);
        store.setIsDragging(true);
      }
    }
  }

  function onDragLeave(e: DragEvent): void {
    if (e.currentTarget)
      (e.currentTarget as HTMLDivElement).style.border = 'none';
  }

  return {
    onDragLeave,
    onDragStart,
  }
}