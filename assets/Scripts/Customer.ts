import { _decorator, animation, CCFloat, CCInteger, CCString, Component, Enum, Node, Prefab, Quat, tween, Vec3 } from 'cc';
import { ServiceLocator } from './ServiceLocator';
import { CheckoutCounter, CheckoutMethod } from './Checkout/CheckoutCounter';
import { ItemManager } from './ItemManager';
import { TutorialController } from './TutorialController';
import { EventBus } from './EventBus';
import { GameEvent } from './GameEvent';
import { NavigationContainer } from './UI/Navigation/NavigationContainer';

const { ccclass, property } = _decorator;

@ccclass('Customer')
export class Customer extends Component {

    @property({type : Node})
    public visuals: Node[] = [];
    @property({type : Node})
    public bagObject: Node;
    @property({type : Node})
    public moneysObject: Node;
    @property({type : Node})
    public cardObject: Node;
    @property({type : Node})
    public rightHand: Node;

    
    @property({type : animation.AnimationController})
    public animator: animation.AnimationController;

    @property({type : CCInteger})
    public currentVisualIndex: number = 0;
    public isMoving: boolean = false;
    
    @property({type : [CCString]})
    public order: string[] = [];
    @property({type : CCFloat})
    public amountMoney: number = 0;
    @property({type: Enum(CheckoutMethod)})
    public checkoutMethod: CheckoutMethod;

   
    start() {
        this.activeVisual();
    }
   

    private activeVisual() {
        for (let i = 0; i < this.visuals.length; i++)
        {
            if (i === this.currentVisualIndex)
            {
                this.visuals[i].active = true;
            }
            else
            {
                this.visuals[i].active = false;
            }
        }
        // this.bagObject.active = this.hasBag;
    }

    moveTo(target: Vec3, duration: number = 0.5, onMoveCompleted?: Function) {
        
        const start = this.node.worldPosition.clone();
        const dir = new Vec3();
        Vec3.subtract(dir, target, start);
        dir.normalize();
        const rot = new Quat();
        Quat.fromViewUp(rot, dir);

        this.node.setWorldRotation(rot);
        
        this.animator.setValue("isMoving", true);
        
        tween(this.node).to(duration, { worldPosition: target })
            .call(() => {
                onMoveCompleted?.();
                this.lookAt(ServiceLocator.get(CheckoutCounter).node.position)
                this.animator.setValue("isMoving", false);
            })
            .start();
    }

    lookAt(target: Vec3) {

        const dir = new Vec3();
        Vec3.subtract(dir, target, this.node.worldPosition);
        dir.normalize();

        const rot = new Quat();
        Quat.fromViewUp(rot, dir);

        this.node.setWorldRotation(rot);
    }

    public placeItems() : void {
        for (const id of this.order) {
            const item = ServiceLocator.get(ItemManager).spawnItem(id);
        }
        console.log("placedItems")
        ServiceLocator.get(TutorialController).displayTutorial()
    }
    public startCheckout() {
        console.log("customer start checkout")
        this.animator.setValue("isPaying", true);
        switch (this.checkoutMethod) {
            case CheckoutMethod.Card:
                this.cardObject.setParent(this.rightHand)
                this.cardObject.setPosition(Vec3.ZERO);
                break;
            case CheckoutMethod.Cash:
                this.moneysObject.setParent(this.rightHand)
                this.moneysObject.setPosition(Vec3.ZERO);
                break;
            default:
                break;
        }
    }
}


