import { _decorator, CCFloat, Component, Enum, Node, tween } from 'cc';
import { ServiceLocator } from '../ServiceLocator';
import { Item } from '../Item';
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

    @property({type: CCFloat})
    public total: number = 0;
    @property({type: CCFloat})
    public recceive: number = 0;
    @property({type: CCFloat})
    public give: number = 0;

    @property({type: Enum(CheckoutMethod)})
    public checkoutMethod: CheckoutMethod;

    @property({type: Item})
    public itemsInTable: Item[] = []

    start() {
        ServiceLocator.register(CheckoutCounter, this);
    }

    getChange() {
        return this.recceive - this.total;
    }
    public scanItem(item: Item) {
        this.total += item.price
        const index = this.itemsInTable.indexOf(item)
        this.itemsInTable.splice(index, 1)
        if(this.itemsInTable.length == 0) {
            console.log("Scan done")
            // const customer = ServiceLocator.get(QueueManager).getFirstCustomer()
            // customer.checkout()
        }
    }
    public addItemToScan(item: Item) {
        this.itemsInTable.push(item)
    
    }
}


