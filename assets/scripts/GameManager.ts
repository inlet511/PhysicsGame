import { _decorator, Component, Node, Vec3 } from 'cc';
import { StaticInstance } from './StaticInstance';
import { PhysicsUtil } from './utils/PhysicsUtil';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    @property(Number)
    moveSpeed:number = 200;

    protected onLoad(): void {
        StaticInstance.setGameManager(this);
        PhysicsUtil.disablePhysicsSystem();
    }

    startGame() {
        PhysicsUtil.enablePhysicsSystem();
    }

    activateFoodPhysics=()=>{
        PhysicsUtil.setRigidBodyDynamic(this.node.children[0].children[0]);
    }

    update(deltaTime: number) {
        
    }

    onRotateFood(angle:number){
        this.node.children[0].children[0].angle = angle;
    }

    onMoveFood(deltaTime:number, direction:number){
        const lastPos = this.node.children[0].children[0].position;
        const newPos = lastPos.add(new Vec3(1, 0, 0).multiplyScalar(direction * deltaTime * this.moveSpeed));
        this.node.children[0].children[0].setPosition(newPos);
    }
}


