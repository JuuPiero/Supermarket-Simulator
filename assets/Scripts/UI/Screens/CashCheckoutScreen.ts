import { _decorator, Button, Component, Node } from 'cc';
import { ScreenBase } from '../Navigation/ScreenBase';
import { ServiceLocator } from '../../ServiceLocator';
import { CheckoutCounter } from '../../Checkout/CheckoutCounter';
import { MonitorUI } from '../MonitorUI';
const { ccclass, property } = _decorator;

@ccclass('CashCheckoutScreen')
export class CashCheckoutScreen extends ScreenBase {
    @property({type: Button})
    public resetBtn: Button = null;

    @property({type: Button})
    public okBtn: Button = null;

    public override enter(param?: object): void {
        super.enter(param);
        const monitorUI: MonitorUI = ServiceLocator.get(MonitorUI)
        // const checkoutCouter: CheckoutCounter = ServiceLocator.get(CheckoutCounter)
        monitorUI.totalUI.node.active = true
        monitorUI.receiveUI.node.active = false
    }
    public override exit(): void {
        super.exit();
    }

}


