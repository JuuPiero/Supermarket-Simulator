import { _decorator, Component, Node } from 'cc';
import { ServiceLocator } from '../../ServiceLocator';
import { StackNavigator } from './StackNavigator';
const { ccclass, property } = _decorator;

@ccclass('NavigationContainer')
export class NavigationContainer extends Component {
    @property({type : StackNavigator})
    public stack: StackNavigator = null;

    // public tab: tabNavigator = null;


    protected start(): void {
        ServiceLocator.register(NavigationContainer, this);
        this.stack = this.getComponentInChildren(StackNavigator);
    }
}


