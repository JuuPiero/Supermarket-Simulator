import { _decorator, CCFloat, Component, Node } from 'cc';
import { IClickable } from './IClickable';
const { ccclass, property } = _decorator;

@ccclass('Item')
export class Item extends Component implements IClickable {
    
    @property({type: CCFloat})
    public price: number;


    onClick() {

        console.log("scan item", this.name);
        // gọi checkout
        // Checkout.scanItem(this)
        this.node.active = false;
    }

}


