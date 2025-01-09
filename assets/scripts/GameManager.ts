import { _decorator, Component, Node, Vec3 } from 'cc';
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

    onRotateFood(angle:number){
        console.log("GameManager onRotateFood ",angle);
        this.node.children[0].children[0].angle = angle;
    }

    onMoveFood(deltaTime:number, direction:number){
        const lastPos = this.node.children[0].children[0].position;
        const newPos = lastPos.add(new Vec3(1, 0, 0).multiplyScalar(direction * deltaTime * 100));
        console.log(newPos);
        this.node.children[0].children[0].setPosition(newPos);
    }
}


