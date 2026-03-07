import { _decorator, Component, instantiate, Node, Prefab, Vec3 } from 'cc';
import { Item } from './Item';
import { ServiceLocator } from './ServiceLocator';
import { CheckoutCounter } from './Checkout/CheckoutCounter';
const { ccclass, property } = _decorator;

@ccclass('ItemManager')
export class ItemManager extends Component {

    @property({type: Prefab})
    prefabs: Prefab[] = []

    private map = new Map<string, Prefab>()

    protected start(): void {
        ServiceLocator.register(ItemManager, this);
    }

    onLoad(){
        for (const prefab of this.prefabs){
            const item = prefab.data.getComponent(Item)
            this.map.set(item.itemId, prefab)
        }
    }

    getItem(id: string): Prefab {
        return this.map.get(id)
    }

    spawnItem(itemId: string){
        const prefab = this.getItem(itemId)
        const itemNode = instantiate(prefab)
        itemNode.setPosition(ServiceLocator.get(CheckoutCounter).checkoutPositon.position);
    }
}