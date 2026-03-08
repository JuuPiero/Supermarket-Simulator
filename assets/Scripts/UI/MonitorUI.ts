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

    }
    protected start(): void {
        const checkoutCounter: CheckoutCounter = ServiceLocator.get(CheckoutCounter)
        checkoutCounter.receive.onValueChange((value) => {
            this.receiveUI.setData("Receive", `$${value}`)
        })
        checkoutCounter.total.onValueChange((value) => {
            this.totalUI.setData("Total", `$${value}`)
        })
    }

    receiveChange(value: number) {

    }
}


