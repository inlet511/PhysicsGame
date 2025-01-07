import { _decorator, Component, Node } from 'cc';
import { UIBase } from './UIBase';
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
    }

    init()
    {
        
    }
}


