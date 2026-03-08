import { _decorator, CCFloat, Component, Enum, Node, tween } from 'cc';
import { ServiceLocator } from '../ServiceLocator';
import { Item } from '../Item';
import { Observable } from '../Observable';
import { Customer } from '../Customer';
import { EventBus } from '../EventBus';
import { GameEvent } from '../GameEvent';
import { MonitorUI } from '../UI/MonitorUI';
import { QueueManager } from '../QueueManager';
const { ccclass, property } = _decorator;
export enum CheckoutMethod {
    Cash,
    Card
}
@ccclass('CheckoutCounter')
export class CheckoutCounter extends Component {

    @property({type: Node})
    public checkoutPositon: Node;

    public total = new Observable<number>(0);
    public receive = new Observable<number>(0);
    public give = new Observable<number>(0);

    @property({type: Enum(CheckoutMethod)})
    public checkoutMethod: CheckoutMethod;

    @property({type: Item})
    public itemsInTable: Item[] = []

    public currentCustomer: Customer;


    onLoad() {
        ServiceLocator.register(CheckoutCounter, this);
    }
    protected start(): void {
        EventBus.on(GameEvent.CHECKED_OUT, this.onCheckedOut)
    }
    protected onDestroy(): void {
        EventBus.off(GameEvent.CHECKED_OUT, this.onCheckedOut)
    }
    public setCustomer(customer: Customer) {
        this.currentCustomer = customer
        this.checkoutMethod = customer.checkoutMethod
    }

    getChange() {
        return this.receive.value - this.total.value;
    }
    public scanItem(item: Item) {
        this.total.value += item.price
        const index = this.itemsInTable.indexOf(item)
        this.itemsInTable.splice(index, 1)
        if(this.itemsInTable.length == 0) {
            console.log("Scan done")
            this.currentCustomer.startCheckout()
            // EventBus.emit(GameEvent.SCAN_DONE)
        }
    }
    public addItemToScan(item: Item) {
        this.itemsInTable.push(item)
    }
    public reset() {
        this.give.value = 0
        this.total.value = 0
        this.receive.value = 0
    }
    public startCheckout() {
        console.log("counter startCheckout")
        this.currentCustomer.animator.setValue('isPaying', false)
        this.receive.value = this.currentCustomer.amountMoney
        ServiceLocator.get(MonitorUI).prepareBill();
    }
    onCheckedOut = () => {
        if(this.give.value == this.getChange()) {
            console.log("Checkout success")
            this.reset()
        }
        else {
            console.log("Checkout fail")
            
        }
    }
}


