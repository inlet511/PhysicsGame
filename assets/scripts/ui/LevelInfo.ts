import { _decorator, Component, Label, Node } from 'cc';
import { UIBase } from './UIBase';
const { ccclass, property } = _decorator;

@ccclass('LevelInfo')
export class LevelInfo extends UIBase {

    @property(Label)
    LevelLabel:Label|null = null;

    @property(Label)
    ItemLabel:Label|null = null;

    setLevelLabel(level:number){
        this.LevelLabel!.string = `第 ${level} 关`;
    }

    setItemLabel(item:number, total:number){
        this.ItemLabel!.string = `${item} / ${total}`;
    }

    
}


