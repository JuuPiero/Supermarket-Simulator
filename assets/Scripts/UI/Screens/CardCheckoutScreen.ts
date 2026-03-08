import { _decorator, Button, Component, Label, Node } from 'cc';
import { ScreenBase } from '../Navigation/ScreenBase';
import { CalculatorModel } from '../../CalculatorModel';
import { CardButton } from '../CardButton';

const { ccclass, property } = _decorator;

@ccclass('CardCheckoutScreen')
export class CardCheckoutScreen extends ScreenBase {

    @property(Label)
    displayLabel: Label = null!;

    @property(Button)
    deleteBtn: Button = null!;
    
    @property(Button)
    decimalBtn: Button = null!;

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


