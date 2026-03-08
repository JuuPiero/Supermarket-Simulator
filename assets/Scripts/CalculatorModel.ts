export class CalculatorModel {

    private value: string = "0";
    private maxLength: number = 12;

    inputDigit(digit: string) {

        if (this.value.length >= this.maxLength) return;

        if (this.value === "0") {
            this.value = digit;
        }
        else {
            this.value += digit;
        }
    }

    inputDecimal() {

        if (this.value.includes(".")) return;

        this.value += ".";
    }

    delete() {

        if (this.value.length > 1) {
            this.value = this.value.slice(0, -1);
        }
        else {
            this.value = "0";
        }
    }

    clear() {
        this.value = "0";
    }

    getValue(): number {
        return parseFloat(this.value);
    }

    getDisplay(): string {
        return this.value;
    }
}