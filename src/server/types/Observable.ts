export type Observer<T> = {
  next: (state: T) => void;
};

export class Observable<T extends object> {
  constructor(value: T) {
    this.value = value;
  }
  value: T;
  get(): T {
    return this.value;
  }
  observers: Observer<T>[] = [];
  subscribe = (observer: Observer<T>) => {
    this.observers.push(observer);
  };
  unsubscribe = (observer: Observer<T>) =>
    this.observers.splice(
      this.observers.findIndex((o) => o === observer),
      1
    );
  set = (valueOrFunc: Partial<T> | ((prev: T) => Partial<T>)) => {
    let partialValue: Partial<T>;
    if (valueOrFunc instanceof Function) {
      partialValue = valueOrFunc(this.value);
      console.log(partialValue);
    } else {
      partialValue = valueOrFunc;
    }
    this.value = {
      ...this.value,
      ...partialValue,
    };
    this.observers.forEach((observer) => observer.next(partialValue as T));
  };
  toTRPC = () => (observer: Observer<T>) => {
    this.subscribe(observer);
    observer.next(this.value);
    return () => {
      this.unsubscribe(observer);
    };
  };
}
