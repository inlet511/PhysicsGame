import { _decorator, Component, Node } from 'cc';
import { StaticInstance } from './StaticInstance';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    protected onLoad(): void {
        StaticInstance.setGameManager(this);
    }
    start() {

    }

    update(deltaTime: number) {
        
    }
}


