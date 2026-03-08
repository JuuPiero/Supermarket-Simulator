import { _decorator, Component, Node } from 'cc';
import { MonitorRowUI } from './MonitorRowUI';
import { ServiceLocator } from '../ServiceLocator';
import { CheckoutCounter } from '../Checkout/CheckoutCounter';
import { EventBus } from '../EventBus';
import { GameEvent } from '../GameEvent';
const { ccclass, property } = _decorator;

@ccclass('MonitorUI')
export class MonitorUI extends Component {

    @property({type: MonitorRowUI})
    public totalUI: MonitorRowUI = null

    @property({type: MonitorRowUI})
    public receiveUI: MonitorRowUI = null

    @property({type: MonitorRowUI})
    public changeUI: MonitorRowUI = null
    
    @property({type: MonitorRowUI})
    public giveUI: MonitorRowUI = null

    private _checkoutCounter!: CheckoutCounter;
    get checkoutCounter() {
        return this._checkoutCounter ??=
            ServiceLocator.get(CheckoutCounter);
    }

    onLoad() {
        ServiceLocator.register(MonitorUI, this)
        
    }
    protected start(): void {
        
        this.checkoutCounter.total.onValueChange(this.totalChanged)
        this.checkoutCounter.receive.onValueChange(this.receiveChanged)
        this.checkoutCounter.give.onValueChange(this.giveChanged)
        EventBus.on(GameEvent.CHECKED_OUT, this.onCheckedOut)

        this.reset()
    }
    onCheckedOut = () => {
        this.reset()
    }

    reset() {
        this.checkoutCounter.total.value = 0
        this.checkoutCounter.give.value = 0
        this.receiveUI.node.active = false
        this.changeUI.node.active = false
        this.giveUI.node.active = false
    }
   

    onDestroy() {
        EventBus.off(GameEvent.CHECKED_OUT, this.onCheckedOut)
        const checkoutCounter: CheckoutCounter = ServiceLocator.get(CheckoutCounter)
        checkoutCounter.total.offValueChange(this.totalChanged)
        checkoutCounter.receive.offValueChange(this.receiveChanged)
        checkoutCounter.give.offValueChange(this.giveChanged)
    }
    public prepareBill() {
        const checkoutCounter: CheckoutCounter = ServiceLocator.get(CheckoutCounter)
        this.receiveUI.node.active = true
        this.changeUI.node.active = true
        this.giveUI.node.active = true
        this.changeUI.setData("Change", `<color=#ffff00>$${checkoutCounter.getChange()}</color>`)
    }
    totalChanged = (value: number) => {
        // console.log(this.totalUI)
        this.totalUI.setData("Total", `$${value}`)
    }
    giveChanged = (value: number) => {
        if(value == this.checkoutCounter.getChange() && value > 0) {
            console.log(value)
            console.log(this.checkoutCounter.getChange())
            this.giveUI.setData("Give", `<color=#00ff00>$${value}</color>`)
            return
        }
        this.giveUI.setData("Give", `<color=#ff0000>$${value}</color>`)
    }

    receiveChanged = (value: number) => {
        this.receiveUI.setData("Receive", `$${value}`)
    }
   
}


