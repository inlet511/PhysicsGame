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
        const lvl2Str = ["一","二","三","四","五","六"]        

        this.LevelLabel!.string = `第 ${lvl2Str[level]} 关`;
    }

    setItemLabel(item:number, total:number){
        this.ItemLabel!.string = `${item} / ${total}`;
    }

    
}


