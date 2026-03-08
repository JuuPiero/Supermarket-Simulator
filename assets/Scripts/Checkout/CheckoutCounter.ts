import { _decorator, CCFloat, Component, Enum, Node, tween } from 'cc';
import { ServiceLocator } from '../ServiceLocator';
import { Item } from '../Item';
import { QueueManager } from '../QueueManager';
import { NavigationContainer } from '../UI/Navigation/NavigationContainer';
import { Observable } from '../Observable';
import { EventBus } from '../EventBus';
import { GameEvent } from '../GameEvent';
const { ccclass, property } = _decorator;
export enum CheckoutMethod {
    Cash,
    Card
}
@ccclass('CheckoutCounter')
export class CheckoutCounter extends Component {

    @property({type: Node})
    public checkoutPositon: Node;

    // @property({type: CCFloat})
    public total = new Observable<number>(0);
    // @property({type: CCFloat})
    public receive = new Observable<number>(0);
    @property({type: CCFloat})
    public give: number = 0;

    @property({type: Enum(CheckoutMethod)})
    public checkoutMethod: CheckoutMethod;

    @property({type: Item})
    public itemsInTable: Item[] = []

    onLoad() {
        ServiceLocator.register(CheckoutCounter, this);
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
            EventBus.emit(GameEvent.SCANNED)
            ServiceLocator.get(NavigationContainer).stack.navigate('CashCheckout')
            // const customer = ServiceLocator.get(QueueManager).getFirstCustomer()
            // customer.checkout()
        }
    }
    public addItemToScan(item: Item) {
        this.itemsInTable.push(item)
    }
    public reset() {
        this.give = 0
    }
}


