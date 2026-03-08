import { _decorator, Button, Component, Label, Node } from 'cc';
import { ScreenBase } from '../Navigation/ScreenBase';
import { CalculatorModel } from '../../CalculatorModel';
import { CardButton } from '../CardButton';
import { EventBus } from '../../EventBus';
import { GameEvent } from '../../GameEvent';
import { ServiceLocator } from '../../ServiceLocator';
import { CheckoutCounter } from '../../Checkout/CheckoutCounter';

const { ccclass, property } = _decorator;

@ccclass('CardCheckoutScreen')
export class CardCheckoutScreen extends ScreenBase {

    @property(Label)
    displayLabel: Label = null!;

    @property(Button)
    deleteBtn: Button = null!;
    
    @property(Button)
    decimalBtn: Button = null!;

    @property(Button)
    okBtn: Button = null!;

    private calculator: CalculatorModel = new CalculatorModel();

    start() {
        this.updateDisplay();
        const buttons = this.getComponentsInChildren(CardButton)
        for (const element of buttons) {
            element.onClick = () => {
                this.onDigitClick(element.value)
            }
        }
    }
    protected onLoad(): void {
        this.okBtn?.node.on(Button.EventType.CLICK, this.onStartChechout, this);
        EventBus.on(GameEvent.CHECKOUT_SUCCESS, this.onCheckSuccess)
    }
    protected onDestroy(): void {
        this.okBtn?.node.off(Button.EventType.CLICK, this.onStartChechout, this);
        EventBus.off(GameEvent.CHECKOUT_SUCCESS, this.onCheckSuccess)
    }

    onStartChechout = () => {
        ServiceLocator.get(CheckoutCounter).give.value = this.calculator.getValue()
        EventBus.emit(GameEvent.START_CHECKOUT)
        this.onClearClick()
        
    }
    onCheckSuccess = () => {
        this.exit()
    }

    onDigitClick(digit: string) {
        this.calculator.inputDigit(digit);
        this.updateDisplay();
    }

    onDecimalClick() {

        this.calculator.inputDecimal();
        this.updateDisplay();
    }

    onDeleteClick() {

        this.calculator.delete();
        this.updateDisplay();
    }

    onClearClick() {

        this.calculator.clear();
        this.updateDisplay();
    }

    private updateDisplay() {
        this.displayLabel.string = '$' + this.calculator.getDisplay();
    }
}


