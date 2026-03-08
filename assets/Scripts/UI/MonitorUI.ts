import { _decorator, Component, Node } from 'cc';
import { MonitorRowUI } from './MonitorRowUI';
import { ServiceLocator } from '../ServiceLocator';
import { CheckoutCounter } from '../Checkout/CheckoutCounter';
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

    onLoad() {
        ServiceLocator.register(MonitorUI, this)
        this.receiveUI.node.active = false
    }
    protected start(): void {
        const checkoutCounter: CheckoutCounter = ServiceLocator.get(CheckoutCounter)
        checkoutCounter.total.onValueChange((value) => {
            this.totalUI.setData("Receive", `$${value}`)
        })
        // checkoutCounter.receive.onValueChange(this.receiveChanged)
    }
    // onDestroy() {
    //     const checkoutCounter: CheckoutCounter = ServiceLocator.get(CheckoutCounter)
    //     checkoutCounter.total.offValueChange(this.totalChanged)
    //     checkoutCounter.receive.offValueChange(this.receiveChanged)
    // }
    // totalChanged(value: number) {
    //     console.log(this.totalUI)
    //     // this.totalUI.setData("Receive", `$${value}`)
    // }

    // receiveChanged(value: number) {
    //     this.receiveUI.setData("Receive", `$${value}`)
    // }
   
}


