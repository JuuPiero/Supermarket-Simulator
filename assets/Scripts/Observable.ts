type Listener<T> = (value: T) => void;

export class Observable<T> {

    private _value: T;
    private listeners: Listener<T>[] = [];

    constructor(value: T) {
        this._value = value;
    }

    set value(v: T) {
        this._value = v;
        this.listeners.forEach(l => l(v));
    }

    get value(): T {
        return this._value;
    }

    onValueChange(listener: Listener<T>) {
        this.listeners.push(listener);
    }
}