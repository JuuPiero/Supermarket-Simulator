import { _decorator, CCFloat, CCString, Component, Node, tween, Vec3 } from 'cc';
import { IClickable } from './IClickable';
import { ServiceLocator } from './ServiceLocator';
import { CheckoutCounter } from './Checkout/CheckoutCounter';
import { TutorialController } from './TutorialController';
const { ccclass, property } = _decorator;

@ccclass('Item')
export class Item extends Component implements IClickable {
    
    @property({type: CCFloat})
    public price: number;

    @property({type: CCString})
    public itemId: string;


    onClick() {
        console.log("scan item", this.name);
        ServiceLocator.get(CheckoutCounter).scanItem(this)
        

        tween(this.node).to(5, { position: new Vec3(this.node.x, this.node.y, this.node.z - 50) })
        .call(() => {
            this.node.active = false;
            this.destroy()     
        }).start()
        // Checkout.scanItem(this)
        // this.node.active = false;
    }

}


