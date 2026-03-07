import { _decorator, Component, Node } from 'cc';
import { Customer } from './Customer';
const { ccclass, property } = _decorator;

@ccclass('QueueManager')
export class QueueManager extends Component {

    @property({ type: Node })
    public queuePositions: Node[] = [];

    @property({ type: Customer })
    public customers: Customer[] = [];

    start() {
        this.updateQueue();
    }

    updateQueue() {
        for (let i = 0; i < this.customers.length; i++) {
            const customer = this.customers[i];
            const slot = this.queuePositions[i];

            customer.moveTo(slot.worldPosition, 1, () => {

                console.log("Customer reached slot", i);

                if (i === 0) {
                    this.startCheckout(customer);
                }
            });
        }
    }

    startCheckout(customer: Customer) {
        console.log("Customer start checkout");
        customer.placeItems()
    }
    
}


