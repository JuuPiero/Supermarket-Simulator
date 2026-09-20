import { readFileSync } from 'fs-extra';
import { join } from 'path';
/**
 * @zh 如果希望兼容 3.3 之前的版本可以使用下方的代码
 * @en You can add the code below if you want compatibility with versions prior to 3.3
 */
// Editor.Panel.define = Editor.Panel.define || function(options: any) { return options }
module.exports = Editor.Panel.define({
    listeners: {
        show() { console.log('show'); },
        hide() { console.log('hide'); },
    },
    template: readFileSync(join(__dirname, '../../../static/template/grid/index.html'), 'utf-8'),
    style: readFileSync(join(__dirname, '../../../static/style/grid/index.css'), 'utf-8'),
    
    $: {
        app: '#app',
        widthInput: '.width',
        heightInput: '.height',
        btnGen: '.gen',
        grid: '.grid'
    },
    methods: {
        hello() {
            if (this.$.app) {
                this.$.app.innerHTML = 'hello';
                console.log('[cocos-panel-html.default]: hello');
            }
        },
    },
    ready() {
        if (this.$.btnGen) {
            this.$.btnGen.addEventListener("click", () => {
                const width = parseInt((this.$.widthInput as HTMLInputElement).value);
                const height = parseInt((this.$.heightInput as HTMLInputElement).value);

                if (!width || !height) return;
                // clear grid
                if (this.$.grid) {
                    this.$.grid.innerHTML = "";
                    // set số cột
                    this.$.grid.style.gridTemplateColumns = `repeat(${width}, 40px)`;
                    for (let y = 0; y < height; y++) {
                        for (let x = 0; x < width; x++) {
                            const cell = document.createElement("div");
                            cell.classList.add("cell");
                            cell.textContent = `${x},${y}`;
                            cell.addEventListener('click', e => {
                                Editor.Logger.clear()
                                console.log(cell.textContent)
                            })
                            // debug tọa độ (optional)
                            this.$.grid.appendChild(cell);
                        }
                    }

                }

            });
        }

    },
    beforeClose() { },
    close() { },
});
