import { _decorator, Component, Node, Camera, Vec3, UITransform } from 'cc';
import { ServiceLocator } from './ServiceLocator';
const { ccclass, property } = _decorator;

@ccclass('TutorialController')
export class TutorialController extends Component {

    @property(Node)
    public arrow: Node = null!;

    @property(Node)
    public target: Node = null!;

    @property(Camera)
    public camera: Camera = null!;

    private _screenPos: Vec3 = new Vec3();
    private _worldPos: Vec3 = new Vec3();

    protected start(): void {
        ServiceLocator.register(TutorialController, this)
    }

    update() {

        if (!this.target || !this.arrow) return;

        // lấy world position của target
        this.target.getWorldPosition(this._worldPos);

        // offset để mũi tên ở trên object
        this._worldPos.y += 1.5;

        // convert world -> screen
        this.camera.worldToScreen(this._worldPos, this._screenPos);

        // convert screen -> UI position
        const canvas = this.arrow.parent!.getComponent(UITransform)!;
        const uiPos = canvas.convertToNodeSpaceAR(this._screenPos);

        this.arrow.setPosition(uiPos.x, uiPos.y, 0);

        // xoay mũi tên (tuỳ chọn)
        this.rotateArrow();
    }

    private rotateArrow() {

        const dir = new Vec3();
        this.target.getWorldPosition(dir);
        dir.subtract(this.arrow.worldPosition);

        const angle = Math.atan2(dir.y, dir.x) * 180 / Math.PI;

        this.arrow.setRotationFromEuler(0, 0, angle);
    }

    public setTarget(node: Node) {
        this.target = node;
    }

    public hideArrow() {
        this.arrow.active = false;
    }

    public showArrow() {
        this.arrow.active = true;
    }
}