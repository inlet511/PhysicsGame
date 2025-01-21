import { _decorator, Component, instantiate, Node, Prefab, Vec3 } from 'cc';
import { StaticInstance } from './StaticInstance';
import { StartMenu } from './ui/StartMenu';
import { UIBase } from './ui/UIBase';
import { UIType } from './Enums';
import { LevelSelection } from './ui/LevelSelection';
import { ControlPanel } from './ui/ControlPanel';
import { LevelInfo } from './ui/LevelInfo';
import { WinPanel } from './ui/WinPanel';
import { LosePanel } from './ui/LosePanel';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {

    @property(Prefab)
    startMenuPrefab: Prefab|null = null;

    @property(Prefab)
    levelSelectionPrefab: Prefab|null = null;

    @property(Prefab)
    ControlPanelPrefab: Prefab|null = null;

    @property(Prefab)
    LevelInfoPrefab:Prefab|null = null;

    @property(Prefab)
    WinPanelPrefab:Prefab|null = null;

    @property(Prefab)
    LosePanelPrefab:Prefab|null = null;

    private uiMap = new Map<UIType, UIBase>();
    
    protected onLoad(): void {
        StaticInstance.setUIManager(this);
        this.initStartMenu();
        this.initLevelSelection();
        this.initControlPanel();
        this.initLevelInfo();
        this.initWinPanel();
        this.initLosePanel();
    }

    constructor(){ 
        super();
    }

    private initStartMenu(){   
        const node = instantiate(this.startMenuPrefab!);
        this.node.addChild(node);
        node.setPosition(0, 0, 0);
        const comp = node.getComponent(StartMenu)!;
        comp.init();
        this.uiMap.set(UIType.StartMenu, comp);        
    }

    private initLevelSelection(){
        const node = instantiate(this.levelSelectionPrefab!);
        this.node.addChild(node);
        node.setPosition(0, 0, 0);
        const comp = node.getComponent(LevelSelection)!;           
        comp.init();
        this.uiMap.set(UIType.LevelSelection, comp); 
    }

    private initControlPanel(){
        const node = instantiate(this.ControlPanelPrefab!);
        this.node.addChild(node);
        const comp = node.getComponent(ControlPanel)!;
        comp.init();
        this.uiMap.set(UIType.ControlPanel, comp);
    }

    private initLevelInfo(){
        const node = instantiate(this.LevelInfoPrefab!);
        this.node.addChild(node);
        const comp = node.getComponent(LevelInfo)!;

        this.uiMap.set(UIType.LevelInfo, comp);
    }

    private initWinPanel(){
        const node = instantiate(this.WinPanelPrefab!);
        this.node.addChild(node);
        const comp = node.getComponent(WinPanel)!;
        this.uiMap.set(UIType.WinPanel, comp);
    }

    private initLosePanel(){
        const node = instantiate(this.LosePanelPrefab!);
        this.node.addChild(node);
        const comp = node.getComponent(LosePanel)!;
        this.uiMap.set(UIType.LosePanel, comp);
    }

    startGame=(levelID:number)=>{
        console.log(`Start Game, levelID: ${levelID}`);
        this.showUI([UIType.ControlPanel,UIType.LevelInfo]);
        StaticInstance.gameManager!.startGame(levelID);
    }

    activateFoodPhysics(){
        StaticInstance.gameManager!.activateFoodPhysics();
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

    showWinPanel(){
        const winPanel = this.uiMap.get(UIType.WinPanel) as WinPanel
        winPanel.init();
        this.showUI([UIType.WinPanel]);
    }

    showLosePanel(){
        const losePanel = this.uiMap.get(UIType.LosePanel) as LosePanel
        losePanel.init();
        this.showUI([UIType.LosePanel]);
    }

    toLevelSelection=()=>{
        this.showUI([UIType.LevelSelection]);
    }

    toStartMenu=()=>{
        this.showUI([UIType.StartMenu]);
    }

    gotoLevel=(levelID:number)=>{
        console.log(`Goto Level ${levelID}`);
        StaticInstance.uiManager!.startGame(levelID);
    }

    onRotateFood(angle:number){
        StaticInstance.gameManager!.onRotateFood(angle);
    }

    onMoveFood(deltaTime:number, direction:number){
        StaticInstance.gameManager!.onMoveFood(deltaTime, direction);
    }

    setLevelInfo(level:number, nowItem:number, allItem:number){
        const levelInfo = this.uiMap.get(UIType.LevelInfo) as LevelInfo
        levelInfo.setItemLabel(nowItem,allItem);
        levelInfo.setLevelLabel(level)
    }

    backToMainClicked = ()=>
    {
        this.showUI([UIType.StartMenu]);
        StaticInstance.gameManager?.backToMain();
    }

    nextLevelClicked = ()=>
    {
        console.log("next Level Clicked");
        StaticInstance.gameManager?.nextLevel();
    }

    retryClicked = ()=>
    {
        StaticInstance.gameManager?.retry();
    }

}