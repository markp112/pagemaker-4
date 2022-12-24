

interface Scroller<T> {
  Items(direction: number): T[];
};

class ScrollInfinite<T>  {
  
  private windowList: T[] = [];
  private currentForwardPosition = 0;
  private currentBackPosition = 0;

  constructor(private pageSize: number, private listItems: T[]) {
    this.windowList = this.listItems.slice(0, pageSize)
    this.currentForwardPosition = this.pageSize;
  }

  scrollForward(): void {
    this.currentForwardPosition++;
    if (this.currentForwardPosition === this.listItems.length - 1) {
      this.currentForwardPosition = this.listItems.length - 1;
    }
    this.currentBackPosition++;
    this.windowList = this.listItems.slice(this.currentBackPosition, this.currentForwardPosition)
  }
  
  scrollBackward(): void {
    this.currentBackPosition > 0 ? this.currentBackPosition-- : 0;
    this.currentForwardPosition > this.pageSize ? this.currentForwardPosition-- : this.pageSize;
    this.windowList = this.listItems.slice(this.currentBackPosition, this.currentForwardPosition)
  }

  get items(): T[] {
    return this.windowList;
    }
}

export type { Scroller };

export { ScrollInfinite };
