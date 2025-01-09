import { _decorator, Component, Label, Node } from 'cc';
import { UIBase } from './UIBase';
import { Util } from '../utils/Utils';
import { StaticInstance } from '../StaticInstance';
const { ccclass, property } = _decorator;

@ccclass('LevelSelection')
export class LevelSelection extends UIBase {

    @property(Node)
    backButton: Node|null = null;

    @property(Node)
    levelsRoot: Node|null = null;

    protected onLoad(): void {
        super.onLoad();
    }

    show(){
        super.show();
        if(this.levelsRoot!==null){
            this.levelsRoot.children.forEach((node,index)=>{
                const unloclLabel = node.children[1];
                const labelComp = unloclLabel.getComponent(Label);
                const level = index+1;
                if(labelComp)
                {
                    labelComp.string = level<3 ? "已解锁":"未解锁";
                }
            });
        }
    }

    init()
    {
        const {TOUCH_START, TOUCH_END, TOUCH_CANCEL} = Node.EventType;

        const backButton = this.backButton as Node;

        backButton.on(TOUCH_START, ()=>{
            Util.clickDownTween(this.backButton);            
        },this);

        backButton.on(TOUCH_END, ()=>{
            Util.clickUpTween(this.backButton, StaticInstance.uiManager?.toStartMenu);
        },this);

        backButton.on(TOUCH_CANCEL, ()=>{
            Util.clickUpTween(this.backButton);
        },this);
        

        const levelsRoot = this.levelsRoot as Node;

        levelsRoot.children.forEach((node,index)=>{
            const button = node.children[0];
            button.on(TOUCH_START, ()=>{
                Util.clickDownTween(button);            
            },this);

            button.on(TOUCH_END, ()=>{
                Util.clickUpTween(button, StaticInstance.uiManager?.gotoLevel,index+1);
            },this);

            button.on(TOUCH_CANCEL, ()=>{
                Util.clickUpTween(button);
            },this);
        });
        
    }
}


