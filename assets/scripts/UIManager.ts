import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
import { StaticInstance } from './StaticInstance';
import { StartMenu } from './ui/StartMenu';
import { UIBase } from './ui/UIBase';
import { UIType } from './Enums';
import { LevelSelection } from './ui/LevelSelection';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {

    @property(Prefab)
    startMenuPrefab: Prefab|null = null;

    @property(Prefab)
    levelSelectionPrefab: Prefab|null = null;

    private uiMap = new Map<UIType, UIBase>();
    
    protected onLoad(): void {
        StaticInstance.setUIManager(this);
        this.initStartMenu();
        this.initLevelSelection();
    }

    private initStartMenu(){
        if(this.startMenuPrefab)
        {        
            const node = instantiate(this.startMenuPrefab);
            this.node.addChild(node);
            node.setPosition(0, 0, 0);
            const comp = node.getComponent(StartMenu);
            if (comp) {
                comp.init();
                this.uiMap.set(UIType.StartMenu, comp);
           }
        }
    }

    private initLevelSelection(){
        if(this.levelSelectionPrefab)
        {
            const node = instantiate(this.levelSelectionPrefab);
            this.node.addChild(node);
            node.setPosition(0, 0, 0);
            const comp = node.getComponent(LevelSelection);
            if (comp) {
                comp.init();
                this.uiMap.set(UIType.LevelSelection, comp);
            }
        }
    }

    startGame(){
        console.log("Start Game");
    }

    showUI(showTypes: UIType[]){
        this.uiMap.forEach((ui,type)=>{
            if(showTypes.includes(type)){
                ui.show();
            }else{
                ui.hide();
            }
        })
    }

    toLevelSelection(){
        this.showUI([UIType.LevelSelection]);
    }

}