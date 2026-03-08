import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MonitorRowUI')
export class MonitorRowUI extends Component {

    @property({type: Label})
    public key: Label = null;

    @property({type: Label})
    public value: Label = null;

    public setData(key: string, value: string | number): void {
        this.key.string = key
        this.value.string = value.toString()
    }
    public setKey(key: string) {
        this.key.string = key
    }
    public setValue(value: string | number) {
        this.key.string = value.toString()
    }
}


