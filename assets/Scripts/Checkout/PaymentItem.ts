import { _decorator, Component, Enum, Node, tween, Vec3 } from 'cc';
import { ServiceLocator } from '../ServiceLocator';
import { IClickable } from '../IClickable';
import { CheckoutCounter, CheckoutMethod } from './CheckoutCounter';
import { NavigationContainer } from '../UI/Navigation/NavigationContainer';
const { ccclass, property } = _decorator;

@ccclass('PaymentItem')
export class PaymentItem extends Component implements IClickable {
    @property({type: Enum(CheckoutMethod)})
    public checkoutMethod: CheckoutMethod;
    
    public onClick() {
        console.log("payment item", this.name);
        this.node.active = false
        const checkoutCounter = ServiceLocator.get(CheckoutCounter)
        checkoutCounter.startCheckout()
        // checkoutCounter.receive.value = checkoutCounter.currentCustomer.amountMoney
        switch (this.checkoutMethod) {
            case CheckoutMethod.Card:
                break;
            case CheckoutMethod.Cash:
                ServiceLocator.get(NavigationContainer).stack.navigate('CashCheckout')
                break;
            default:
                break;
        }


        // tween(this.node).to(5, { position: new Vec3(this.node.x, this.node.y, this.node.z - 50) })
        // .call(() => {
        //     this.node.active = false;
        //     this.destroy()     
        // }).start()

        // ServiceLocator.get(TutorialController).hide()
        // Checkout.scanItem(this)
        // this.node.active = false;
    }
}


