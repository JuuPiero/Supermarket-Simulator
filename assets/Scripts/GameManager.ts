import { _decorator, Component, Node, sys } from 'cc';
import { EventBus } from './EventBus';
import { GameEvent } from './GameEvent';
import { ServiceLocator } from './ServiceLocator';
import { NavigationContainer } from './UI/Navigation/NavigationContainer';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    protected onLoad(): void {
        ServiceLocator.register(GameManager, this)
        EventBus.on(GameEvent.LEVEL_COMPLETED, this.onLevelCompleted)
    }
    protected onDestroy(): void {
        EventBus.off(GameEvent.LEVEL_COMPLETED, this.onLevelCompleted)
    }

    onLevelCompleted = () => {
        ServiceLocator.get(NavigationContainer).stack.navigate("EndCard")
        this.installGame()
    }

    installGame = () => {
        sys.openURL("https://play.google.com/store/apps/details?id=com.ig.supermarket.manager.simulator");
    }
}


