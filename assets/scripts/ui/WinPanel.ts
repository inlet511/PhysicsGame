import { _decorator, Component, EventTouch, Input, Node, SystemEvent } from 'cc';
import { UIBase } from './UIBase';
import { Util } from '../utils/Utils';
import { StaticInstance } from '../StaticInstance';
const { ccclass, property } = _decorator;

@ccclass('WinPanel')
export class WinPanel extends UIBase {

    @property(Node)
    nextLevelBtn:Node|null = null

    @property(Node)
    backToMainBtn:Node|null = null


    public init(){
        this.show();        

        const {TOUCH_START, TOUCH_END, TOUCH_CANCEL} = SystemEvent.EventType;

        const backToMainBtn = this.backToMainBtn as Node;


        backToMainBtn.on(TOUCH_START, ()=>{
            Util.clickDownTween(backToMainBtn);            
        },this);

        backToMainBtn.on(TOUCH_END, ()=>{
            Util.clickUpTween(backToMainBtn, StaticInstance.uiManager?.backToMainClicked);
        },this);

        backToMainBtn.on(TOUCH_CANCEL, ()=>{
            Util.clickUpTween(backToMainBtn);
        },this);
    
        const nextLevelBtn = this.nextLevelBtn as Node;

    
        nextLevelBtn.on(TOUCH_START, ()=>{
            Util.clickDownTween(nextLevelBtn);
        },this);

        nextLevelBtn.on(TOUCH_END, (event:SystemEvent.EventType)=>{
            console.log("Next Level Touch End!!!!");
            Util.clickUpTween(nextLevelBtn, StaticInstance.uiManager?.nextLevelClicked);            
        },this);

        nextLevelBtn.on(TOUCH_CANCEL, ()=>{
            Util.clickUpTween(nextLevelBtn);
        },this);
               
    }
}


