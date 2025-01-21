import { _decorator, Component, instantiate, Node, Prefab, RigidBody, RigidBody2D, Sprite, SpriteFrame, Tween, tween, Vec2, Vec3 } from 'cc';
import { StaticInstance } from './StaticInstance';
import { PhysicsUtil } from './utils/PhysicsUtil';
const { ccclass, property } = _decorator;
import GameConfig from './config/GameConfig';

interface IGameContext{
    level:number,
    count:number,
    node:Node|null
}

@ccclass('GameManager')
export class GameManager extends Component {

    @property({
        type:[Prefab],
        displayName:"食物预制体"
    })
    foodPrefabs:Prefab[] = new Array<Prefab>

    @property({
        type:Node,
        displayName:"食物父节点"
    })foods:Node|null = null

    @property(Number)
    moveSpeed:number = 200;

    @property(Node)
    bowl:Node|null = null;

    @property(SpriteFrame)
    openEyeBowl:SpriteFrame|null = null;

    @property(SpriteFrame)
    closeEyeBowl:SpriteFrame|null = null;

    bShouldUpdate:boolean = true;


    get currentFoodType():number{
        return GameConfig[this.context.level][this.context.count]
    }

    // 当前上下文信息
    context : IGameContext = {
        level:0,
        count:0,
        node:null
    }

    time:number = 0;
    checkCD:number = 0.2;
    bFalling:boolean = false;

    protected onLoad(): void {
        StaticInstance.setGameManager(this);
        PhysicsUtil.disablePhysicsSystem();
        console.log(GameConfig)
    }

    startGame(levelID:number) {
        PhysicsUtil.enablePhysicsSystem();
        console.log(`游戏开始， Level:${levelID}, 数据： ${GameConfig[levelID]}`)
        this.showBowl();

        // 先清理所有children
        this.clearFoods();
        
        this.context.level = levelID
        this.context.count = 0
        this.context.node = this.addFood(this.currentFoodType)
        this.bShouldUpdate = true;
    }


    get canAddFood():boolean{
        const total = GameConfig[this.context.level].length
        const current = this.context.count
        if(current>=total)
        {
            return false
        }
        return true
    }

    /**
     * @param index 食物类型索引
     */
    addFood(index:number){
        const pos = new Vec3(0,450,0);
        const food = instantiate(this.foodPrefabs[index])
        this.foods?.addChild(food)
        food.setPosition(pos)
        PhysicsUtil.setRigidBodyStatic(food);

        this.context.count += 1;

        this.updateLevelInfo()
        return food
    }

    updateLevelInfo(){
        const level = this.context.level
        const itemCount = this.context.count
        const totalItem = GameConfig[this.context.level].length
        StaticInstance.uiManager?.setLevelInfo(level,itemCount,totalItem) 
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
        if(!this.context.node)  return;

        // 启用动态
        PhysicsUtil.setRigidBodyDynamic(this.context.node);

        // 设置初始速度
        PhysicsUtil.setRigidBodyV(this.context.node, new Vec2(0, -5));

        this.bFalling = true;
    }

    onRotateFood(angle:number){
        if(!this.context.node)  return;
        this.context.node.angle = angle;
    }

    onMoveFood(deltaTime:number, direction:number){
        if(!this.context.node) return
        const lastPos = this.context.node.position;
        const newPos = lastPos.add(new Vec3(1, 0, 0).multiplyScalar(direction * deltaTime * this.moveSpeed));
        this.context.node.setPosition(newPos);
    }

    get AllBodyStop():boolean {
        for(let i = 0; i< this.foods!.children.length; i++)
        {
            const node = this.foods!.children[i]
            const body = node.getComponent(RigidBody2D) as RigidBody2D
            if(body.linearVelocity.lengthSqr() > 0.001)
            {
                return false
            }
        }
        return true
    }


    checkFall(){
        let hasFall:boolean = false
        for(let i = 0; i<this.foods!.children.length; i++)
        {
            const currentFood = this.foods?.children[i] as Node
            if(currentFood.position.y < -800)
            {
                currentFood.destroy();
                hasFall = true
                break
            }
        }

        if(hasFall)
        {
            this.bFalling = false
            console.log("game lose")
            StaticInstance.uiManager?.showLosePanel();
            this.bShouldUpdate = false;
        }
    }

    checkAllBody(){
        if(this.AllBodyStop)
        {
            if(this.canAddFood)
            {
                this.context.node = this.addFood(this.currentFoodType)
                this.bFalling = false
            }else
            {
                StaticInstance.uiManager?.showWinPanel();
            }
        }
    }

    protected update(dt: number): void {
        if(!this.bShouldUpdate)
            return;

        this.time += dt;
        if(this.bFalling && this.time > this.checkCD)
        {            
            this.time = 0
            this.checkAllBody()
            this.checkFall()
        }
    }


    clearFoods()
    {
        this.foods?.removeAllChildren();
    }

    backToMain = ()=>
    {
        this.context.level = 0
        this.clearFoods();
        this.hideBowl();
    }

    nextLevel= ()=>
    {
        this.context.level += 1
        console.log(this.context.level)
        StaticInstance.uiManager?.startGame(this.context.level)
    }

    retry= ()=>
    {
        StaticInstance.uiManager?.startGame(this.context.level)
    }

}


