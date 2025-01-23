import { _decorator, Component, Node, SystemEvent } from 'cc';
import { Util } from './utils/Utils';
import { StaticInstance } from './StaticInstance';
const { ccclass, property } = _decorator;

@ccclass('test')
export class test extends Component {

    @property(Node)
    nextLevelBtn:Node|null = null

    start() {
        const {TOUCH_START, TOUCH_END, TOUCH_CANCEL} = SystemEvent.EventType;

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

    update(deltaTime: number) {
        
    }
}


