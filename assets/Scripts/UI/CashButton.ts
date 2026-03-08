import { _decorator, Button, CCFloat, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CashButton')
export class CashButton extends Component {

    @property({type: Button})
    protected _button: Button = null;

    @property({type: CCFloat})
    public value: number;

    start() {
        this._button = this.getComponent(Button);
        this._button.node.on(Button.EventType.CLICK, this.onClick, this);
    }
    private onClick() {
        console.log("Button clicked: " + this.value);
    }
    
}


