import { _decorator, Component, Input, Node, SystemEvent, Tween, tween, Vec3 } from 'cc';
import { UIBase } from './UIBase';
import {Util} from '../utils/Utils';
import { UIManager } from '../UIManager';
import { StaticInstance } from '../StaticInstance';

const { ccclass, property } = _decorator;

@ccclass('StartMenu')
export class StartMenu extends UIBase {

    @property(Node)
    startButton: Node | null = null;

    @property(Node)
    levelSelection: Node | null = null;

    protected onLoad(): void {
        super.onLoad();        
    }

    show(){
        super.show();        
    }

    public init(){
        this.show();
        
        const node = this.startButton?.children[0];

        // 停止node上的所有动画，防止重复播放
        Tween.stopAllByTarget(node);

        // 重置角度为0
        if(node)        
            node.angle = 0;

        //播放动画        
        tween(node).repeatForever(
            tween()
            .to(1,{angle:10})
            .to(1,{angle:0})
        ).start();

        const {TOUCH_START, TOUCH_END, TOUCH_CANCEL} = SystemEvent.EventType;

        const startButton = this.startButton as Node;


        startButton.on(TOUCH_START, ()=>{
            Util.clickDownTween(startButton);            
        },this);

        startButton.on(TOUCH_END, ()=>{
            Util.clickUpTween(startButton, StaticInstance.uiManager?.startGame,0);
        },this);

        startButton.on(TOUCH_CANCEL, ()=>{
            Util.clickUpTween(startButton);
        },this);
    
        const levelSelection = this.levelSelection as Node;

    
        levelSelection.on(TOUCH_START, ()=>{
            Util.clickDownTween(levelSelection);
        },this);

        levelSelection.on(TOUCH_END, ()=>{
            Util.clickUpTween(levelSelection, StaticInstance.uiManager?.toLevelSelection);
        },this);

        levelSelection.on(TOUCH_CANCEL, ()=>{
            Util.clickUpTween(levelSelection);
        },this);
           
    }
}


