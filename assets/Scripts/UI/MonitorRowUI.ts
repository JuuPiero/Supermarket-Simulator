import { _decorator, Component, Label, Node, RichText } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MonitorRowUI')
export class MonitorRowUI extends Component {

    @property({type: Label})
    public key: Label = null;

    @property({type: Label})
    public value: Label = null;

    @property({type: RichText})
    public valueColor: RichText = null;


    public setData(key: string, value: string | number): void {
        this.key.string = key
        if(this.value) {
            this.value.string = value.toString()
        }
        if(this.valueColor) {
            this.valueColor.string = value.toString()
        }
    }
    public setKey(key: string) {
        this.key.string = key
    }
    public setValue(value: string | number) {
        if(this.value) {
            this.value.string = value.toString()
        }
        if(this.valueColor) {
            this.valueColor.string = value.toString()
        }
    }
}


