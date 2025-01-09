import { _decorator, Component, Input, Node ,EventTouch, UITransform, Vec3, misc, Vec2, math} from 'cc';
import { UIBase } from './UIBase';
import { Util } from '../utils/Utils';
import { StaticInstance } from '../StaticInstance';
const { ccclass, property } = _decorator;

@ccclass('ControlPanel')
export class ControlPanel extends UIBase {

    @property(Node)
    clickDownButton:Node|null = null;

    @property(Node)
    clickLeftButton:Node|null = null;

    @property(Node)
    clickRightButton:Node|null = null;

    @property(Node)
    panelBG:Node|null = null;

    @property(Node)
    panelMid:Node|null = null;

    private moveLeft:boolean = false;
    private moveRight:boolean = false;

    onLoad(){
        super.onLoad();        
    }

    init(){
        const {TOUCH_START, TOUCH_MOVE, TOUCH_END, TOUCH_CANCEL} = Input.EventType;

        // 类型断言
        const panelBG = this.panelBG as Node;
        const clickLeftButton = this.clickLeftButton as Node;
        const clickRightButton = this.clickRightButton as Node;

        // 轮盘        
        panelBG.on(TOUCH_START, (event:EventTouch)=>{
            const eventLocation = event.getLocation();
            const pos3D_Raw = new Vec3(eventLocation.x, eventLocation.y, 0);
            const pos3D_Raw_Local = this.panelBG!.getComponent(UITransform)!.convertToNodeSpaceAR(pos3D_Raw);
            const pos3D_Limited = this.limitMidPos(pos3D_Raw_Local);
            this.panelMid!.setPosition(pos3D_Limited);                
            const angle = misc.radiansToDegrees(Math.atan2(pos3D_Limited.y, pos3D_Limited.x));
            StaticInstance.uiManager!.onRotateFood(angle)
        },this);

        panelBG.on(TOUCH_MOVE, (event:EventTouch)=>{
            const eventLocation = event.getLocation();     
            const pos3D_Raw = new Vec3(eventLocation.x, eventLocation.y, 0);     
            const pos3D_Raw_Local = this.panelBG!.getComponent(UITransform)!.convertToNodeSpaceAR(pos3D_Raw);
            const pos3D_Limited = this.limitMidPos(pos3D_Raw_Local);
            this.panelMid!.setPosition(pos3D_Limited);
            const angle = misc.radiansToDegrees(Math.atan2(pos3D_Limited.y, pos3D_Limited.x));
            StaticInstance.uiManager!.onRotateFood(angle)
        },this);

        panelBG.on(TOUCH_END,()=>this.panelMid!.setPosition(0,0,0),this);
        panelBG.on(TOUCH_CANCEL,()=>this.panelMid!.setPosition(0,0,0),this);

        // 左按钮
        clickLeftButton.on(TOUCH_START, ()=>{ 
            Util.clickDownTween(clickLeftButton,()=>{
                this.moveLeft = true;
            });    
        },this);

        clickLeftButton.on(TOUCH_END, ()=>{ 
            Util.clickUpTween(clickLeftButton,()=>{
                this.moveLeft = false;
            });    
        },this);

        clickLeftButton.on(TOUCH_CANCEL, ()=>{ 
            Util.clickUpTween(clickLeftButton,()=>{
                this.moveLeft = false;
            });    
        },this);


        // 右按钮
        clickRightButton.on(TOUCH_START, ()=>{ 
            Util.clickDownTween(clickRightButton,()=>{
                this.moveRight = true;
            });    
        },this);

        clickRightButton.on(TOUCH_END, ()=>{ 
            Util.clickUpTween(clickRightButton,()=>{
                this.moveRight = false;
            });    
        },this);

        clickRightButton.on(TOUCH_CANCEL, ()=>{ 
            Util.clickUpTween(clickRightButton,()=>{
                this.moveRight = false;
            });    
        },this);


        // 下按钮
        const clickDownButton = this.clickDownButton as Node;
        clickDownButton.on(TOUCH_START, ()=>{ 
            Util.clickDownTween(clickDownButton,()=>{
                // TODO 传出左转
            });    
        },this);

        clickDownButton.on(TOUCH_END, ()=>{ 
            Util.clickUpTween(clickDownButton,()=>{
            });    
        },this);

        clickDownButton.on(TOUCH_CANCEL, ()=>{ 
            Util.clickUpTween(clickDownButton,()=>{
            });    
        },this);
        
    }

    limitMidPos(pos:Vec3): Vec3{
        const r = 130;
        const length = pos.length();
        if(length>r)
        {
            const ratio = r/length;
            pos.multiplyScalar(ratio);
        }
        return pos;
    }

    protected lateUpdate(dt: number): void {
        if(this.moveLeft===true)
        {
            StaticInstance.uiManager?.onMoveFood(dt, -1);
        }
        else if(this.moveRight===true)
        {
            StaticInstance.uiManager?.onMoveFood(dt, 1);
        }
    }


}


