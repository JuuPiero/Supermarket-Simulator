import { _decorator, Component, Node, tween } from 'cc';
import { ServiceLocator } from '../ServiceLocator';
const { ccclass, property } = _decorator;

@ccclass('CheckoutCounter')
export class CheckoutCounter extends Component {

    @property({type: Node})
    public checkoutPositon: Node;
    start() {
        ServiceLocator.register(CheckoutCounter, this);
        
    }

    update(deltaTime: number) {

    }
}


