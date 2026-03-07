import { _decorator, animation, CCBoolean, CCFloat, CCInteger, Component, Node, Prefab, Quat, tween, Vec3 } from 'cc';
import { ServiceLocator } from './ServiceLocator';
import { CheckoutCounter } from './Checkout/CheckoutCounter';

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
    
    @property({type : animation.AnimationController})
    protected animator: animation.AnimationController;

    @property({type : CCInteger})
    public currentVisualIndex: number = 0;
    public isMoving: boolean = false;
    
    @property({type : Prefab})
    public items: Prefab[];

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
        
    }
}


