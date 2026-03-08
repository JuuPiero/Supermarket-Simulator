import { _decorator, Button, CCFloat, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CashButton')
export class CashButton extends Component {

    @property({type: Button})
    protected _button: Button = null;

    @property({type: Label})
    protected _label: Label = null;

    @property({type: CCFloat})
    public value: number;
    
    start() {
        this._button = this.getComponent(Button);
        this._label = this.getComponentInChildren(Label)
        if(this._label) {
            if(this.value >= 1) {
                this._label.string = `$${this.value}`
            }
            else {
                this._label.string = `${this.dollarToCent(this.value)}c`
            }
        }
        if(this._button) {
            this._button.node.on(Button.EventType.CLICK, this.onClick, this);
        }
    }
    dollarToCent(dollar: number): number {
        return Math.round(dollar * 100);
    }
    private onClick() {
        console.log("Button clicked: " + this.value);
    }
    
}


