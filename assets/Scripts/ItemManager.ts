import { _decorator, Component, instantiate, Node, Prefab, tween, Vec3 } from 'cc';
import { Item } from './Item';
import { ServiceLocator } from './ServiceLocator';
import { CheckoutCounter } from './Checkout/CheckoutCounter';
import { TutorialController } from './TutorialController';
const { ccclass, property } = _decorator;

@ccclass('ItemManager')
export class ItemManager extends Component {

    @property({ type: Prefab })
    prefabs: Prefab[] = []

    private map = new Map<string, Prefab>()
    private spawnIndex: number = 0;
    protected start(): void {
        ServiceLocator.register(ItemManager, this);
        for (const prefab of this.prefabs) {
            const item = prefab.data.getComponent(Item)
            this.map.set(item.itemId, prefab)
        }
    }


    getItem(id: string): Prefab {
        return this.map.get(id)
    }

    spawnItem(itemId: string): Item {

        const prefab = this.getItem(itemId)
        const itemNode = instantiate(prefab)
        const checkout = ServiceLocator.get(CheckoutCounter)
        const item = itemNode.getComponent(Item)
        checkout.addItemToScan(item)
        
        itemNode.setParent(checkout.node)
        const basePos = checkout.checkoutPositon.position.clone()
        const offset = 0.1 * this.spawnIndex
        const targetPos = new Vec3(
            basePos.x + offset,
            basePos.y,
            basePos.z
        )

        const startPos = new Vec3(
            basePos.x + 1,
            basePos.y,
            basePos.z
        )

        itemNode.setPosition(startPos)

        tween(itemNode)
            .to(0.3, { position: targetPos })
            .call(() => {
                // ServiceLocator.get(TutorialController).setTarget(itemNode)
            })
            .start()

        this.spawnIndex++
        return item
    }
}