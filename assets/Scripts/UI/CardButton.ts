import { _decorator, Button, CCString, Component, Label, Node } from 'cc';
import { CardCheckoutScreen } from './Screens/CardCheckoutScreen';
const { ccclass, property } = _decorator;

@ccclass('CardButton')
export class CardButton extends Component {
    @property({type: Button})
    protected _button: Button = null;

    @property({type: Label})
    protected _label: Label = null;

    @property({type: CCString})
    public value: string;


    public onClick: Function;
   
    start() {
        this._button = this.getComponent(Button);
        this._label = this.getComponentInChildren(Label)
        this._label.string = `${this.value}`
        this._button?.node.on(Button.EventType.CLICK, this.onClick, this);
    }
    protected onDestroy(): void {
        this._button?.node.off(Button.EventType.CLICK, this.onClick, this);
    }

    
}
