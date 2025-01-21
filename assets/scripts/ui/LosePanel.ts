import { _decorator, Component, Input, Node, SystemEvent } from 'cc';
import { UIBase } from './UIBase';
import { Util } from '../utils/Utils';
import { StaticInstance } from '../StaticInstance';
const { ccclass, property } = _decorator;

@ccclass('LosePanel')
export class LosePanel extends UIBase {

    @property(Node)
    backToMainBtn:Node|null = null

    @property(Node)
    retryBtn:Node|null = null


    public init(){
        this.show();        

        const {TOUCH_START, TOUCH_END, TOUCH_CANCEL} = SystemEvent.EventType;

        const backToMainBtn = this.backToMainBtn as Node;


        backToMainBtn.on(TOUCH_START, ()=>{
            Util.clickDownTween(backToMainBtn);            
        },this);

        backToMainBtn.on(TOUCH_END, (event:Event)=>{
            Util.clickUpTween(backToMainBtn, StaticInstance.uiManager?.backToMainClicked);
            event.stopPropagation();
        },this);

        backToMainBtn.on(TOUCH_CANCEL, ()=>{
            Util.clickUpTween(backToMainBtn);
        },this);
    
        const retryBtn = this.retryBtn as Node;

    
        retryBtn.on(TOUCH_START, ()=>{
            Util.clickDownTween(retryBtn);
        },this);

        retryBtn.on(TOUCH_END, ()=>{
            Util.clickUpTween(retryBtn, StaticInstance.uiManager?.retryClicked);
        },this);

        retryBtn.on(TOUCH_CANCEL, ()=>{
            Util.clickUpTween(retryBtn);
        },this);
               
    }

}


