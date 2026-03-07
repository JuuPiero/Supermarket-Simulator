import { _decorator, CCFloat, CCString, Component, Node } from 'cc';
import { IClickable } from './IClickable';
import { ServiceLocator } from './ServiceLocator';
import { CheckoutCounter } from './Checkout/CheckoutCounter';
const { ccclass, property } = _decorator;

@ccclass('Item')
export class Item extends Component implements IClickable {
    
    @property({type: CCFloat})
    public price: number;

    @property({type: CCString})
    public itemId: string;


    onClick() {
        console.log("scan item", this.name);
        ServiceLocator.get(CheckoutCounter).scanItem(this);
        // gọi checkout
        // Checkout.scanItem(this)
        this.node.active = false;
    }

}


