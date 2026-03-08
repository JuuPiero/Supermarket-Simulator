import { _decorator, Component, Node } from 'cc';
import { Customer } from './Customer';
import { ServiceLocator } from './ServiceLocator';
import { CheckoutCounter } from './Checkout/CheckoutCounter';
import { EventBus } from './EventBus';
import { GameEvent } from './GameEvent';
const { ccclass, property } = _decorator;

@ccclass('QueueManager')
export class QueueManager extends Component {

    @property({ type: Node })
    public queuePositions: Node[] = [];

    @property({ type: Node })
    public outPoint: Node = null;

    @property({ type: Customer })
    public customers: Customer[] = [];
    onLoad() {
        ServiceLocator.register(QueueManager, this)
    }

    start() {
        this.updateQueue();
        EventBus.on(GameEvent.CHECKED_OUT, this.onCheckedOut)
    }
    protected onDestroy(): void {
        EventBus.off(GameEvent.CHECKED_OUT, this.onCheckedOut)
    }

    public updateQueue() {
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

    
    public startCheckout(customer: Customer) {
        console.log("Customer start checkout");
        ServiceLocator.get(CheckoutCounter).setCustomer(customer)
        customer.placeItems()
        // customer.animator.setValue("isPaying", true)
        // customer.checkout()
    }
    public popCustomer() {
        const customer = this.customers[0]
        this.customers.splice(0, 1);
        customer.moveTo(this.outPoint.position.clone(), 2, () => {
            customer.destroy()
        })
    }

    onCheckedOut = () => {
        this.popCustomer()
        this.updateQueue()
    }
    
}


