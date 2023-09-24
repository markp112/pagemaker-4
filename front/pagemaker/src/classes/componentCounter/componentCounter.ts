class ComponentCounter {
  private static instance: ComponentCounter;
  private counter = 0;

  public static getInstance(): ComponentCounter {
    if (!ComponentCounter.instance) {
      ComponentCounter.instance = new ComponentCounter();
    }
    return ComponentCounter.instance;
  }

  public getCounter(): number {
    return this.counter;
  }
  public setCounter(counter: number) {
    console.log('%c⧭', 'color: #735656', counter);
    console.log('%c⧭', 'color: #cc0088', 'setCounter');
    this.counter = counter;
  }


  public getNextCounter(): number {
    const currentCounter: number = this.counter;
    this.counter++;
    return currentCounter;
  }
}

export { ComponentCounter };
