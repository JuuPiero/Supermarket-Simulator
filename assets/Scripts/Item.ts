import { _decorator, CCFloat, CCString, Component, Node, tween, Vec3 } from 'cc';
import { IClickable } from './IClickable';
import { ServiceLocator } from './ServiceLocator';
import { CheckoutCounter } from './Checkout/CheckoutCounter';
import { TutorialController } from './TutorialController';
import { SoundManager } from './SoundManager';
const { ccclass, property } = _decorator;

@ccclass('Item')
export class Item extends Component implements IClickable {
    
    @property({type: CCFloat})
    public price: number;

    @property({type: CCString})
    public itemId: string;


    public onClick() {
        console.log("scan item", this.name);
        ServiceLocator.get(CheckoutCounter).scanItem(this)
        SoundManager.instance.playOneShot('Scan')

        tween(this.node).to(5, { position: new Vec3(this.node.x, this.node.y, this.node.z - 50) })
        .call(() => {
            this.node.active = false;
            this.destroy()     
        }).start()
        ServiceLocator.get(TutorialController).hide()
        // Checkout.scanItem(this)
        // this.node.active = false;
    }

}


