import { _decorator, Component, Node, Sprite, SpriteFrame, Tween, tween, Vec2, Vec3 } from 'cc';
import { StaticInstance } from './StaticInstance';
import { PhysicsUtil } from './utils/PhysicsUtil';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    @property(Number)
    moveSpeed:number = 200;

    @property(Node)
    bowl:Node|null = null;

    @property(SpriteFrame)
    openEyeBowl:SpriteFrame|null = null;

    @property(SpriteFrame)
    closeEyeBowl:SpriteFrame|null = null;

    protected onLoad(): void {
        StaticInstance.setGameManager(this);
        PhysicsUtil.disablePhysicsSystem();
    }

    startGame() {
        PhysicsUtil.enablePhysicsSystem();
        this.showBowl();
    }

    showBowl(){
        this.bowl!.active = true;
        Tween.stopAllByTarget(this.bowl!);
        tween(this.bowl!).repeatForever(
            tween()
            .delay(2)
            .call(()=>{this.bowl!.getComponent(Sprite)!.spriteFrame = this.closeEyeBowl})
            .delay(0.1)
            .call(()=>{this.bowl!.getComponent(Sprite)!.spriteFrame = this.openEyeBowl})
        ).start();
    }

    hideBowl(){
        this.bowl!.active = false;
    }

    activateFoodPhysics=()=>{
        // 启用动态
        PhysicsUtil.setRigidBodyDynamic(this.node.children[0].children[0]);

        // 设置初始速度
        PhysicsUtil.setRigidBodyV(this.node.children[0].children[0], new Vec2(0, -5));
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


