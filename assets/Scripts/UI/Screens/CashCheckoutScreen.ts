import { _decorator, Button, Component, Node } from 'cc';
import { ScreenBase } from '../Navigation/ScreenBase';
import { ServiceLocator } from '../../ServiceLocator';
import { CheckoutCounter } from '../../Checkout/CheckoutCounter';
import { ItemManager } from '../../ItemManager';
import { EventBus } from '../../EventBus';
import { GameEvent } from '../../GameEvent';
const { ccclass, property } = _decorator;

@ccclass('CashCheckoutScreen')
export class CashCheckoutScreen extends ScreenBase {
    @property({type: Button})
    public resetBtn: Button = null;

    @property({type: Button})
    public okBtn: Button = null;

    private _checkoutCounter!: CheckoutCounter;
    get checkoutCounter() {
        return this._checkoutCounter ??= ServiceLocator.get(CheckoutCounter);
    }

    protected onLoad(): void {
        this.resetBtn?.node.on(Button.EventType.CLICK, this.reset, this);
        this.okBtn?.node.on(Button.EventType.CLICK, this.onCheckout, this);
        EventBus.on(GameEvent.CHECKED_OUT, this.exit.bind(this))
    }
    protected onDestroy(): void {
        this.resetBtn.node.off(Button.EventType.CLICK, this.reset, this);
        EventBus.off(GameEvent.CHECKED_OUT, this.exit.bind(this))
    }

    public override enter(param?: object): void {
        super.enter(param);
    }
    public override exit(): void {
        super.exit();
    }
    reset() {
        const moneys = ServiceLocator.get(ItemManager).moneyObjects;
        // const checkoutCounter = ServiceLocator.get(CheckoutCounter)
        for (const element of moneys) {
            element.destroy()
        }
        ServiceLocator.get(ItemManager).moneyObjects.length = 0
        this.checkoutCounter.give.value = 0
    }

    onCheckout = () => {
        EventBus.emit(GameEvent.CHECKED_OUT)
        this.reset()
    }

}


